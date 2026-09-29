# Cutover tooling: www.im.agency from Webflow to Vercel

Tools for moving `www.im.agency` from Webflow to the Next.js site on Vercel without breaking search rankings, email, analytics, or lead capture. The step-by-step runbook, owners, and client asks are kept in a private document, not in this public repository. Ask Henry for the link.

| File | What it does |
|---|---|
| `verify-source.py` | Confirms a local folder is byte-for-byte the source that staging runs (Vercel CLI upload of Sep 23, deployment `dpl_EJSRAWN6VAYySHcaPibcsYkDMmVw`). Run it before pushing that folder to Git. |
| `staging-manifest.json` | SHA-1 of every file Vercel listed for that deployment (163 files). Used by `verify-source.py`. |
| `patches/p0-launch.patch` | Launch SEO and analytics fixes for the staging codebase: host-aware `robots.txt`, `sitemap.xml`, per-page canonical and Open Graph tags, GA4 `G-FTJBL1NS13`, 301s for legacy Webflow paths, security headers, and `X-Robots-Tag: noindex` on every host except `www.im.agency`. |
| `patches/hubspot-port.patch` | Ports the `cursor/hubspot-contact-form-5bd2` HubSpot embed onto the staging codebase. Apply after `p0-launch.patch`. Needs `NEXT_PUBLIC_HUBSPOT_FORM_ID`. The repo's `.gitignore` excludes `.env*`, so commit `.env.example` with `git add -f .env.example`. |
| `cutover-check.sh` | Go/no-go gate. Exits non-zero if any MUST check fails. |
| `mail_dns_guard.py` | Confirms mail DNS (MX, SPF, DKIM, DMARC, Microsoft 365 records) for `im.agency`, `intermedia.agency`, and `intermedia-advertising.com` is unchanged. Queries the authoritative nameservers directly. Run after every DNS save. |

## 1. Confirm the source, then push it

```bash
python3 docs/cutover/verify-source.py ~/path/to/local/intermedia-site
```

`RESULT: MATCHES staging` means that folder is what staging serves. Ten files sit too deep for the Vercel API to list (the route pages for converged-tv, creative, ctv, established-brands, insights, insights/[slug], measurement, new-to-tv, partnerships, plus `components/ui/dialog.tsx`). The script reports them as present or absent; confirm them by building and comparing those pages with staging.

Push the folder to a new branch of a private repository. Do not push it to `main` here. A push to `main` deploys the older `intermedia-site` Vercel project and runs `vendor-assets.yml`.

## 2. Apply the patches

From the root of the pushed staging source:

```bash
git apply --check /path/to/docs/cutover/patches/p0-launch.patch && git apply /path/to/docs/cutover/patches/p0-launch.patch
git apply --check /path/to/docs/cutover/patches/hubspot-port.patch && git apply /path/to/docs/cutover/patches/hubspot-port.patch   # optional, needs the form GUID
```

Both patches were checked with `git apply` against the recovered staging files, and the result was type-checked, linted, and built with Next.js 16.3.5. The HubSpot unit tests pass (5 of 5). Then do these by hand in files the Vercel API could not return:

1. Wrap the existing `metadata` export with `withSeo("<path>", { ... })` in these pages: converged-tv, creative, ctv, measurement, new-to-tv, partnerships, established-brands, and insights. In `insights/[slug]`, wrap the return value of `generateMetadata` instead. `grep -rL "withSeo(" src/app --include=page.tsx` should then list only `src/app/results/page.tsx`.
2. Add `method="post"` to the staging `<form>` in `src/components/contact-form.tsx`, so a submit before JavaScript loads cannot put names and emails in the URL.

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

The gate cannot see double-counted analytics. After launch, open the site with DevTools and confirm there is exactly one request to `googletagmanager.com/gtag/js?id=G-FTJBL1NS13`. Also confirm GA4 Realtime shows the visit. On any host other than `www.im.agency`, GA4 stays silent unless the URL has `?ga_test=1`, which sends debug hits for GA4 DebugView.

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
