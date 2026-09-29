#!/usr/bin/env bash
# InterMedia cutover acceptance gate.
#
# Runs every MUST/SHOULD check from docs/cutover/MIGRATION-PLAN.md against one host
# and exits non-zero if any MUST check fails. Works with the bash 3.2 that ships on
# macOS (no associative arrays, no grep -P).
#
# Usage:
#   docs/cutover/cutover-check.sh staging   # https://intermedia-site-upgrade.vercel.app
#   docs/cutover/cutover-check.sh rehearsal # https://next.im.agency (dress rehearsal host)
#   docs/cutover/cutover-check.sh prod      # https://www.im.agency (after DNS)
#   TARGET=https://some-preview.vercel.app docs/cutover/cutover-check.sh staging
#
# Optional environment:
#   GA_ID=G-FTJBL1NS13     GA4 measurement ID that must appear in page HTML
#   SKIP_GA=1              downgrade the GA check to a warning (preview hosts)
#   CHECK_ALIASES=1        also test intermedia.agency / intermedia-advertising.com 301s
#   RESOLVE_IP=<vercel ip> prod mode before DNS moves: pin www.im.agency and im.agency
#                          to this IP (needs the pre-issued Vercel certificate)
#   EXTRA_PAGES="/insights /results"   more pages that must return 200
#   REPORT_DIR=./cutover-reports       where the timestamped log is written

set -u

MODE="${1:-staging}"
CANONICAL_HOST="https://www.im.agency"
GA_ID="${GA_ID:-G-FTJBL1NS13}"
REPORT_DIR="${REPORT_DIR:-./cutover-reports}"

case "$MODE" in
  staging)   TARGET="${TARGET:-https://intermedia-site-upgrade.vercel.app}" ;;
  rehearsal) TARGET="${TARGET:-https://next.im.agency}" ;;
  prod)      TARGET="${TARGET:-$CANONICAL_HOST}" ;;
  *) echo "Unknown mode '$MODE'. Use staging, rehearsal, or prod." >&2; exit 2 ;;
esac
TARGET="${TARGET%/}"

# Pages that must answer 200 with real content on the new site.
CORE_PAGES="/ /about /converged-tv /measurement /contact"
ALL_PAGES="$CORE_PAGES ${EXTRA_PAGES:-}"

# Legacy paths that must permanently redirect. Format: source|expected final path
LEGACY_REDIRECTS="/about-us|/about
/about-us/|/about
/old-home|/
/style-guide|/
/digital-marketing|/converged-tv
/digital-marketing/|/converged-tv"

RES=""
if [ -n "${RESOLVE_IP:-}" ]; then
  for hp in www.im.agency:443 im.agency:443 www.im.agency:80 im.agency:80; do
    RES="$RES --resolve $hp:$RESOLVE_IP"
  done
fi

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36 InterMediaCutoverCheck/1.0"
TMP="$(mktemp -d 2>/dev/null || mktemp -d -t cutover)"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$REPORT_DIR"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
LOG="$REPORT_DIR/cutover-$MODE-$STAMP.log"

FAILS=0
WARNS=0
PASSES=0

log()  { printf '%s\n' "$*" | tee -a "$LOG"; }
pass() { PASSES=$((PASSES + 1)); log "PASS  $*"; }
warn() { WARNS=$((WARNS + 1));   log "WARN  $*"; }
fail() { FAILS=$((FAILS + 1));   log "FAIL  $*"; }

# fetch URL -> writes $TMP/h (headers) and $TMP/b (body); echoes "code|location|content_type"
fetch() {
  # shellcheck disable=SC2086
  curl -sS $RES -A "$UA" --max-time 25 -o "$TMP/b" -D "$TMP/h" \
    -w '%{http_code}|%{redirect_url}|%{content_type}' "$1" 2>"$TMP/err" || echo "000||"
}

# follow URL -> echoes "code|num_redirects|effective_url"
follow() {
  # shellcheck disable=SC2086
  curl -sS $RES -A "$UA" --max-time 30 -L --max-redirs 10 -o "$TMP/fb" \
    -w '%{http_code}|%{num_redirects}|%{url_effective}' "$1" 2>"$TMP/err" || echo "000|0|"
}

header() { grep -i "^$1:" "$TMP/h" | tail -n 1 | cut -d: -f2- | tr -d '\r' | sed -E 's/^ +//'; }

# Path portion of an absolute or relative URL, without query string.
path_of() { printf '%s' "$1" | sed -E 's#^https?://[^/]+##; s#\?.*$##; s#^$#/#'; }

canonical_in() {
  grep -oiE '<link[^>]*rel=["'"'"']?canonical["'"'"']?[^>]*>' "$1" | head -n 1 |
    sed -nE 's/.*href=["'"'"']([^"'"'"']+)["'"'"'].*/\1/p'
}

log "InterMedia cutover check"
log "mode=$MODE target=$TARGET canonical=$CANONICAL_HOST time=$STAMP"
[ -n "$RES" ] && log "pinned: www.im.agency and im.agency -> $RESOLVE_IP (pre-DNS pre-flight)"
log "------------------------------------------------------------------"

# 1. Core pages: 200, no noindex, self canonical on the production host, GA present.
log "[1] Core pages"
for p in $ALL_PAGES; do
  r="$(fetch "$TARGET$p")"; code="${r%%|*}"
  if [ "$code" != "200" ]; then fail "$p returned $code (expected 200)"; continue; fi
  if grep -qi "isn.t on the plan" "$TMP/b"; then fail "$p renders the not-found template"; continue; fi
  pass "$p 200"

  if grep -qiE '<meta[^>]*name=["'"'"']?robots["'"'"']?[^>]*noindex' "$TMP/b"; then
    fail "$p has <meta name=robots content=noindex>"
  fi
  xrt="$(header x-robots-tag)"
  if printf '%s' "$xrt" | grep -qi noindex; then
    if [ "$MODE" = "prod" ]; then fail "$p sends X-Robots-Tag: $xrt on production"
    else pass "$p sends X-Robots-Tag noindex on non-production host (expected)"; fi
  elif [ "$MODE" != "prod" ]; then
    warn "$p has no X-Robots-Tag noindex on a non-production host (duplicate-content risk)"
  fi

  want="$CANONICAL_HOST$p"; [ "$p" = "/" ] && want="$CANONICAL_HOST/"
  got="$(canonical_in "$TMP/b")"
  if [ -z "$got" ]; then fail "$p has no rel=canonical"
  elif [ "${got%/}" = "${want%/}" ]; then pass "$p canonical $got"
  else fail "$p canonical is $got (expected $want)"; fi

  # Presence only. Next.js repeats inline script text in its RSC payload, so a raw
  # count cannot detect double tagging; confirm one gtag/js request in the browser.
  if grep -q "$GA_ID" "$TMP/b"; then pass "$p contains $GA_ID"
  elif [ "${SKIP_GA:-0}" = "1" ]; then warn "$p missing $GA_ID (SKIP_GA=1)"
  else fail "$p missing GA4 id $GA_ID"; fi
done

# 2. Legacy redirects: permanent, single hop where possible, land on the right page.
log "[2] Legacy redirects"
printf '%s\n' "$LEGACY_REDIRECTS" | while IFS='|' read -r src dest; do
  [ -z "$src" ] && continue
  r="$(fetch "$TARGET$src")"; code="${r%%|*}"; rest="${r#*|}"; loc="${rest%%|*}"
  case "$code" in
    301|308) ;;
    302|307) echo "FAIL  $src uses temporary $code (must be 301 or 308)" | tee -a "$LOG"; echo F >> "$TMP/fails"; continue ;;
    *) echo "FAIL  $src returned $code (expected 301/308 to $dest)" | tee -a "$LOG"; echo F >> "$TMP/fails"; continue ;;
  esac
  f="$(follow "$TARGET$src")"; fcode="${f%%|*}"; frest="${f#*|}"; hops="${frest%%|*}"; eff="${frest#*|}"
  fpath="$(path_of "$eff")"
  if [ "$fcode" = "200" ] && [ "${fpath%/}" = "${dest%/}" ]; then
    if [ "$hops" -le 1 ]; then echo "PASS  $src -> $dest ($code, 1 hop)" | tee -a "$LOG"; echo P >> "$TMP/passes"
    else echo "WARN  $src -> $dest in $hops hops (prefer 1)" | tee -a "$LOG"; echo W >> "$TMP/warns"; fi
  else
    echo "FAIL  $src ends at $eff with $fcode (expected $dest 200)" | tee -a "$LOG"; echo F >> "$TMP/fails"
  fi
done
[ -f "$TMP/fails" ]  && FAILS=$((FAILS + $(wc -l < "$TMP/fails")))   && rm -f "$TMP/fails"
[ -f "$TMP/warns" ]  && WARNS=$((WARNS + $(wc -l < "$TMP/warns")))   && rm -f "$TMP/warns"
[ -f "$TMP/passes" ] && PASSES=$((PASSES + $(wc -l < "$TMP/passes"))) && rm -f "$TMP/passes"

# 3. robots.txt
log "[3] robots.txt"
r="$(fetch "$TARGET/robots.txt")"; code="${r%%|*}"; ctype="${r##*|}"
if [ "$code" != "200" ]; then fail "robots.txt returned $code"
elif ! printf '%s' "$ctype" | grep -qi '^text/plain'; then fail "robots.txt content-type is '$ctype' (expected text/plain)"
elif grep -qi '<html' "$TMP/b"; then fail "robots.txt body is HTML"
else
  pass "robots.txt 200 text/plain"
  grep -qi '^user-agent:' "$TMP/b" && pass "robots.txt has User-agent" || fail "robots.txt has no User-agent line"
  if [ "$MODE" = "prod" ]; then
    grep -qiE '^disallow:[[:space:]]*/[[:space:]]*$' "$TMP/b" && fail "production robots.txt blocks the whole site"
    grep -qi "^sitemap:[[:space:]]*$CANONICAL_HOST/sitemap.xml" "$TMP/b" \
      && pass "robots.txt points to $CANONICAL_HOST/sitemap.xml" || fail "robots.txt missing Sitemap: $CANONICAL_HOST/sitemap.xml"
  else
    grep -qiE '^disallow:[[:space:]]*/[[:space:]]*$' "$TMP/b" \
      && pass "non-production robots.txt disallows crawling (expected)" \
      || warn "non-production robots.txt allows crawling"
  fi
fi

# 4. sitemap.xml: urlset, production host only, every URL answers 200 without redirect.
log "[4] sitemap.xml"
r="$(fetch "$TARGET/sitemap.xml")"; code="${r%%|*}"; ctype="${r##*|}"
if [ "$code" != "200" ]; then fail "sitemap.xml returned $code"
elif ! grep -q '<urlset' "$TMP/b"; then fail "sitemap.xml has no <urlset> (content-type '$ctype')"
else
  pass "sitemap.xml 200 with <urlset> ($ctype)"
  cp "$TMP/b" "$TMP/sitemap.xml"
  locs="$(grep -oE '<loc>[^<]+</loc>' "$TMP/sitemap.xml" | sed -E 's#</?loc>##g')"
  count="$(printf '%s\n' "$locs" | grep -c . || true)"
  [ "$count" -ge 5 ] && pass "sitemap lists $count URLs" || fail "sitemap lists only $count URLs"
  for loc in $locs; do
    case "$loc" in
      "$CANONICAL_HOST"/*|"$CANONICAL_HOST") ;;
      *) fail "sitemap URL on wrong host: $loc"; continue ;;
    esac
    lp="$(path_of "$loc")"
    case " /about-us /about-us/ /old-home /style-guide /digital-marketing " in
      *" $lp "*) fail "sitemap lists redirecting URL $loc"; continue ;;
    esac
    r="$(fetch "$TARGET$lp")"; code="${r%%|*}"
    [ "$code" = "200" ] && pass "sitemap URL $lp 200" || fail "sitemap URL $lp returned $code"
  done
fi

# 5. Unknown paths must be real 404s (never 200 soft-404s).
log "[5] Not-found handling"
r="$(fetch "$TARGET/this-path-should-not-exist-$STAMP")"; code="${r%%|*}"
[ "$code" = "404" ] && pass "unknown path returns 404" || fail "unknown path returns $code (expected 404)"

# 6. Security headers (warnings, not blockers, except HSTS on production).
log "[6] Security headers"
fetch "$TARGET/" >/dev/null
for h in x-content-type-options referrer-policy permissions-policy; do
  v="$(header $h)"; [ -n "$v" ] && pass "$h: $v" || warn "missing $h"
done
v="$(header x-frame-options)"; c="$(header content-security-policy)$(header content-security-policy-report-only)"
if [ -n "$v" ] || printf '%s' "$c" | grep -qi frame-ancestors; then pass "clickjacking protection present"; else warn "no X-Frame-Options or frame-ancestors"; fi
v="$(header strict-transport-security)"
if [ -n "$v" ]; then pass "strict-transport-security: $v"
elif [ "$MODE" = "prod" ]; then fail "no HSTS on production"; else warn "no HSTS"; fi
if grep -qi '^x-wf-region:' "$TMP/h" || grep -q 'website-files.com' "$TMP/b"; then
  log "NOTE  $TARGET is serving the WEBFLOW site (x-wf-region or Webflow CDN seen)."
  [ "$MODE" = "prod" ] && fail "production host still serves Webflow (DNS not switched, or rolled back)"
fi

# 7. Host and protocol redirects (production only).
if [ "$MODE" = "prod" ]; then
  log "[7] Host and protocol redirects"
  for src in "http://www.im.agency/" "https://im.agency/" "http://im.agency/"; do
    f="$(follow "$src")"; fcode="${f%%|*}"; frest="${f#*|}"; hops="${frest%%|*}"; eff="${frest#*|}"
    if [ "$fcode" = "200" ] && [ "${eff%/}" = "$CANONICAL_HOST" ]; then
      [ "$hops" -le 2 ] && pass "$src -> $eff ($hops hops)" || warn "$src -> $eff in $hops hops"
    else fail "$src ends at $eff with $fcode"; fi
  done
  f="$(follow "https://im.agency/about-us?utm_source=check")"; frest="${f#*|}"; eff="${frest#*|}"
  case "$eff" in
    "$CANONICAL_HOST/about?utm_source=check"|"$CANONICAL_HOST/about/?utm_source=check") pass "apex keeps path and query: $eff" ;;
    *) fail "https://im.agency/about-us?utm_source=check ends at $eff (path or query lost)" ;;
  esac

  if command -v openssl >/dev/null 2>&1; then
    for host in www.im.agency im.agency; do
      addr="${RESOLVE_IP:-$host}"
      exp="$(echo | openssl s_client -servername "$host" -connect "$addr:443" 2>/dev/null | openssl x509 -noout -enddate -issuer 2>/dev/null | tr '\n' ' ')"
      [ -n "$exp" ] && pass "TLS $host: $exp" || fail "TLS handshake failed for $host"
    done
  fi
fi

# 8. Alias domains (optional, production).
if [ "${CHECK_ALIASES:-0}" = "1" ]; then
  log "[8] Alias domains (GET, not HEAD)"
  for src in https://intermedia.agency/about-us https://www.intermedia.agency/ https://intermedia-advertising.com/ https://www.intermedia-advertising.com/; do
    r="$(fetch "$src")"; code="${r%%|*}"; rest="${r#*|}"; loc="${rest%%|*}"
    case "$loc" in
      "$CANONICAL_HOST"*) [ "$code" = "301" ] || [ "$code" = "308" ] && pass "$src -> $loc ($code, one hop to canonical host)" || warn "$src -> $loc with $code" ;;
      http://*) fail "$src redirects to insecure $loc" ;;
      *) warn "$src answers $code -> ${loc:-no redirect} (not flattened to $CANONICAL_HOST yet)" ;;
    esac
  done
fi

# 9. Email DNS guard: the cutover must never touch mail records.
log "[9] Email DNS guard"
dnsq() {
  if command -v dig >/dev/null 2>&1; then dig +short "$2" "$1"
  elif command -v python3 >/dev/null 2>&1 && python3 -c 'import dns.resolver' 2>/dev/null; then
    python3 -c 'import sys,dns.resolver
for r in dns.resolver.resolve(sys.argv[1], sys.argv[2]): print(r.to_text())' "$1" "$2" 2>/dev/null
  else echo "__nodns__"; fi
}
mx="$(dnsq im.agency MX)"
if [ "$mx" = "__nodns__" ]; then warn "no dig or python dnspython; skipped mail checks"
else
  printf '%s' "$mx" | grep -q 'im-agency.mail.protection.outlook.com' && pass "MX im.agency -> Microsoft 365" || fail "MX for im.agency changed: $mx"
  dnsq im.agency TXT | grep -q 'v=spf1 include:spf.protection.outlook.com' && pass "SPF intact" || fail "SPF record missing or changed"
  dnsq _dmarc.im.agency TXT | grep -q 'v=DMARC1' && pass "DMARC intact" || fail "DMARC record missing"
  dnsq selector1._domainkey.im.agency TXT | grep -q 'v=DKIM1' && pass "DKIM selector1 intact" || fail "DKIM selector1 missing"
  mx2="$(dnsq intermedia.agency MX)"
  printf '%s' "$mx2" | grep -q 'intermedia-agency.mail.protection.outlook.com' && pass "MX intermedia.agency intact" || fail "MX for intermedia.agency changed: $mx2"
fi

log "------------------------------------------------------------------"
log "RESULT mode=$MODE pass=$PASSES warn=$WARNS fail=$FAILS"
if [ "$FAILS" -gt 0 ]; then
  log "NO-GO: $FAILS MUST check(s) failed. Log: $LOG"
  exit 1
fi
log "GO: all MUST checks passed ($WARNS warning(s)). Log: $LOG"
exit 0
