# Cutover tooling: www.im.agency from Webflow to Vercel

Tools for moving `www.im.agency` from Webflow to the Next.js site on Vercel without breaking search rankings, email, analytics, or lead capture. The step-by-step runbook, owners, and client asks are kept in a private document, not in this public repository. Ask Henry for the link.

| File | What it does |
|---|---|
| `verify-source.py` | Confirms a local folder is byte-for-byte the source that staging runs (Vercel CLI upload of Sep 23, deployment `dpl_EJSRAWN6VAYySHcaPibcsYkDMmVw`). Run it before pushing that folder to Git. |
| `staging-manifest.json` | SHA-1 of every file Vercel listed for that deployment (163 files). Used by `verify-source.py`. |
| `cutover-check.sh` | Go/no-go gate. Exits non-zero if any MUST check fails. |
| `mail_dns_guard.py` | Confirms mail DNS (MX, SPF, DKIM including Salesforce `sf2`, DMARC, Postmark `pm-bounces`, Microsoft 365 records) for `im.agency`, `intermedia.agency`, and `intermedia-advertising.com` is unchanged, plus `ftp`, `sftp`, and `analytics.im.agency`. Queries the authoritative nameservers directly. Run after every DNS save. |

## 1. Confirm the source, then push it

```bash
python3 docs/cutover/verify-source.py ~/path/to/local/intermedia-site
```

`RESULT: MATCHES staging` means that folder is what staging serves. Ten files sit too deep for the Vercel API to list (the route pages for converged-tv, creative, ctv, established-brands, insights, insights/[slug], measurement, new-to-tv, partnerships, plus `components/ui/dialog.tsx`). The script reports them as present or absent; confirm them by building and comparing those pages with staging.

This is done: commit `f419527` of `solfinnai/intermedia-site-upgrade` matches 162 of 163 files (the other is the gitignored `next-env.d.ts`). Do not push the upgrade source to `main` of this repository: that deploys the older `intermedia-site` Vercel project and runs `vendor-assets.yml`.

## 2. Launch changes

The site source now lives in the private repository `solfinnai/intermedia-site-upgrade`, and the launch changes are a draft pull request there (branch `claude/intermedia-migration-audit-e6vl2o`). That project is git-connected, so merging to `main` deploys to production at once. Merge only in the launch window.

What the launch build does:
- Self canonical and Open Graph tags on `https://www.im.agency` for every page. The 404 page has no canonical.
- The same `robots.txt` on every host (`Allow: /` plus the sitemap line). Hosts other than `www.im.agency` are kept out of search by `X-Robots-Tag: noindex, nofollow`, which crawlers can only see because robots.txt lets them in.
- GA4 `G-FTJBL1NS13` as the standard gtag.js snippet in `<head>`, so Search Console's Google Analytics verification keeps working. Only `www.im.agency` sends hits.
- 301s: `/about-us` to `/about`, `/old-home` to `/`, `/digital-marketing` to `/converged-tv`. `/style-guide` returns 404.
- The HubSpot form when `NEXT_PUBLIC_HUBSPOT_FORM_ID` is set at build time.
- Next.js 16.3.7.

## 3. Run the gate

```bash
docs/cutover/cutover-check.sh staging                  # https://intermedia-site-upgrade.vercel.app
docs/cutover/cutover-check.sh rehearsal                # https://new.im.agency
RESOLVE_IP=<Vercel A value> docs/cutover/cutover-check.sh prod   # real hostnames pinned to Vercel before DNS moves
docs/cutover/cutover-check.sh prod                     # after DNS moves
CHECK_ALIASES=1 docs/cutover/cutover-check.sh prod     # after the alias domains are redirected
```

Each run writes a timestamped log to `./cutover-reports/`. Any `FAIL` means no-go.

Options:
- `HUBSPOT_FORM_ID=<guid>` makes the gate fail if `/contact` renders the email-draft fallback instead of the HubSpot form.
- `VERCEL_BYPASS=<secret>` (Deployment Protection > Protection Bypass for Automation) lets the gate test a protected preview or staged deployment. Use it with `TARGET=<deployment URL>`.
- Run pinned or post-flip checks with `env -u HTTPS_PROXY -u https_proxy`, so a corporate proxy cannot bypass the pinning or answer from a stale route.

On production, the check fails if `www.im.agency` sends an `X-Robots-Tag` header. A typo in the production host name would otherwise remove the site from Google.

The gate cannot see double-counted analytics. After launch, open the site with DevTools and confirm there is exactly one request to `googletagmanager.com/gtag/js?id=G-FTJBL1NS13`. Also confirm GA4 Realtime shows the visit. On any host other than `www.im.agency`, the library loads but sends nothing unless the URL has `?ga_test=1`, which sends debug hits for GA4 DebugView.

## 4. Guard email on every DNS change

```bash
python3 -m venv ~/.venvs/cutover && ~/.venvs/cutover/bin/pip install -q dnspython   # once
~/.venvs/cutover/bin/python docs/cutover/mail_dns_guard.py
```

| Exit | Meaning | Action |
|---|---|---|
| 0 | `MAIL DNS IDENTICAL TO BASELINE` | Continue |
| 1 | A real difference in authoritative answers | Stop. Restore the last edited record from the zone export. |
| 2 | `INCONCLUSIVE`: a nameserver could not be reached from this network | Not a mail change. Rerun from another network, for example a phone hotspot. |
