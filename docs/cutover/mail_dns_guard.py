#!/usr/bin/env python3
"""Mail DNS guard for the im.agency cutover. Read-only.
Compares mail-related records (plus a few non-web records the cutover must not touch)
against the baseline captured Tue Sep 29 2026 ~02:50 UTC, extended ~20:15 UTC.
Queries each zone's authoritative nameservers AND two public resolvers.
Exit 0 = identical, exit 1 = any difference (STOP and roll back the last edit).
Requires: pip install dnspython
"""
import sys, socket
import dns.resolver

BASELINE = {
  # im.agency (Cloudflare: arvind/marge.ns.cloudflare.com)
  ("im.agency", "MX"): {"0 im-agency.mail.protection.outlook.com."},
  ("im.agency", "TXT"): {
    '"v=spf1 include:spf.protection.outlook.com include:_spf.salesforce.com -all"',
    '"v=verifydomain MS=5258684"',
    '"adobe-idp-site-verification=4f9abf298183cfb8cc39bfe1ecc4c834ee98e8d6dcec10248a3943e2d2a277ed"',
  },
  ("_dmarc.im.agency", "TXT"): {'"v=DMARC1;p=reject;fo=1;rua=mailto:rua+im.agency@dmarc.barracudanetworks.com;ruf=mailto:ruf+im.agency@dmarc.barracudanetworks.com"'},
  ("selector1._domainkey.im.agency", "CNAME"): {"selector1-im-agency._domainkey.imgcteam.onmicrosoft.com."},
  ("selector2._domainkey.im.agency", "CNAME"): {"selector2-im-agency._domainkey.imgcteam.onmicrosoft.com."},
  ("sf1._domainkey.im.agency", "CNAME"): {"sf1.usm6gl.custdkim.salesforce.com."},
  ("sf2._domainkey.im.agency", "CNAME"): {"sf2.vnfws6.custdkim.salesforce.com."},
  ("pm-bounces.im.agency", "CNAME"): {"pm.mtasv.net."},  # Postmark return path
  ("autodiscover.im.agency", "CNAME"): {"autodiscover.outlook.com."},
  ("enterpriseregistration.im.agency", "CNAME"): {"enterpriseregistration.windows.net."},
  ("enterpriseenrollment.im.agency", "CNAME"): {"enterpriseenrollment.manage.microsoft.com."},
  ("lyncdiscover.im.agency", "CNAME"): {"webdir.online.lync.com."},
  ("sip.im.agency", "CNAME"): {"sipdir.online.lync.com."},
  ("_sipfederationtls._tcp.im.agency", "SRV"): {"100 1 5061 sipfed.online.lync.com."},
  ("_sip._tls.im.agency", "SRV"): {"100 1 443 sipdir.online.lync.com."},
  ("mail.im.agency", "A"): {"12.231.175.133"},
  ("email.im.agency", "CNAME"): {"email.secureserver.net."},
  # Not mail, but also outside the cutover: file transfer, a separate Vercel app, and the domain-connect helper.
  ("ftp.im.agency", "A"): {"173.255.108.40"},
  ("sftp.im.agency", "A"): {"173.255.108.41"},
  ("analytics.im.agency", "CNAME"): {"d7c4e89492e4b0fd.vercel-dns-017.com."},
  ("_domainconnect.im.agency", "CNAME"): {"_domainconnect.gd.domaincontrol.com."},
  # intermedia.agency (GoDaddy: ns21/ns22.domaincontrol.com)
  ("intermedia.agency", "MX"): {"0 intermedia-agency.mail.protection.outlook.com."},
  ("intermedia.agency", "TXT"): {'"v=spf1 include:secureserver.net -all"', '"NETORGFT10574608.onmicrosoft.com"'},
  ("autodiscover.intermedia.agency", "CNAME"): {"autodiscover.outlook.com."},
  ("lyncdiscover.intermedia.agency", "CNAME"): {"webdir.online.lync.com."},
  ("sip.intermedia.agency", "CNAME"): {"sipdir.online.lync.com."},
  ("_sipfederationtls._tcp.intermedia.agency", "SRV"): {"100 1 5061 sipfed.online.lync.com."},
  ("_sip._tls.intermedia.agency", "SRV"): {"100 1 443 sipdir.online.lync.com."},
  ("mail.intermedia.agency", "CNAME"): {"pop.secureserver.net."},
  ("email.intermedia.agency", "CNAME"): {"email.secureserver.net."},
  # intermedia-advertising.com (Cloudflare, same NS pair)
  ("intermedia-advertising.com", "MX"): {"0 intermediaadvertising-com02e.mail.protection.outlook.com."},
  ("intermedia-advertising.com", "TXT"): {
    '"v=spf1 include:spf.protection.outlook.com -all"',
    '"v=verifydomain MS=4196892"',
    '"adobe-idp-site-verification=4f9abf298183cfb8cc39bfe1ecc4c834ee98e8d6dcec10248a3943e2d2a277ed"',
    '"google-site-verification=pCxX3aXsBvDFx9v4P_afxswU45yi67-ci8hg5sHBmpI"',
  },
  ("autodiscover.intermedia-advertising.com", "CNAME"): {"autodiscover.outlook.com."},
  ("enterpriseregistration.intermedia-advertising.com", "CNAME"): {"enterpriseregistration.windows.net."},
  ("enterpriseenrollment.intermedia-advertising.com", "CNAME"): {"enterpriseenrollment.manage.microsoft.com."},
  ("lyncdiscover.intermedia-advertising.com", "CNAME"): {"webdir.online.lync.com."},
  ("sip.intermedia-advertising.com", "CNAME"): {"sipdir.online.lync.com."},
  ("_sipfederationtls._tcp.intermedia-advertising.com", "SRV"): {"100 1 5061 sipfed.online.lync.com."},
  ("_sip._tls.intermedia-advertising.com", "SRV"): {"100 1 443 sipdir.online.lync.com."},
  ("msoid.intermedia.agency", "CNAME"): {"clientconfig.microsoftonline-p.net."},
}
# TXT sets at an apex may legitimately GROW (e.g. a new google-site-verification TXT).
ALLOW_ADDITIONS = {("im.agency", "TXT"), ("intermedia.agency", "TXT"), ("intermedia-advertising.com", "TXT")}
AUTH_NS = {
  "im.agency": ["arvind.ns.cloudflare.com", "marge.ns.cloudflare.com"],
  "intermedia-advertising.com": ["arvind.ns.cloudflare.com", "marge.ns.cloudflare.com"],
  "intermedia.agency": ["ns21.domaincontrol.com", "ns22.domaincontrol.com"],
}

def zone_of(name):
    for z in AUTH_NS:
        if name == z or name.endswith("." + z):
            return z

def resolver(ips):
    r = dns.resolver.Resolver(configure=False)
    r.nameservers = ips
    r.lifetime = 10
    return r

def ask(r, name, rtype):
    try:
        return {x.to_text() for x in r.resolve(name, rtype, raise_on_no_answer=False) if x.rdtype == dns.rdatatype.from_text(rtype)}
    except dns.resolver.NXDOMAIN:
        return {"NXDOMAIN"}
    except Exception as e:
        return {"ERROR " + type(e).__name__}

def main():
    bad = 0
    unreachable = set()
    public = {"cloudflare 1.1.1.1": resolver(["1.1.1.1"]), "google 8.8.8.8": resolver(["8.8.8.8"])}
    for (name, rtype), want in BASELINE.items():
        views = {}
        for ns in AUTH_NS[zone_of(name)]:
            try:
                views["auth " + ns] = resolver([socket.gethostbyname(ns)])
            except OSError:
                unreachable.add("auth " + ns)   # cannot even resolve the nameserver: network problem
        views.update(public)
        for label, r in views.items():
            got = ask(r, name, rtype)
            if any(g.startswith("ERROR") for g in got):
                unreachable.add(label)   # network problem, not a DNS change
                continue
            ok = want <= got if (name, rtype) in ALLOW_ADDITIONS else got == want
            if not ok:
                bad += 1
                print(f"FAIL {name} {rtype} via {label}\n  expected {sorted(want)}\n  got      {sorted(got)}")
    auth_down = [u for u in unreachable if u.startswith("auth ")]
    if bad:
        print(f"{bad} DIFFERENCES: STOP, do not continue, restore from export")
        sys.exit(1)
    if auth_down:
        print("INCONCLUSIVE: could not reach " + ", ".join(sorted(unreachable)) + ". Rerun from another network. This is NOT a mail change.")
        sys.exit(2)
    if unreachable:
        print("MAIL DNS IDENTICAL TO BASELINE (authoritative); public resolver(s) unreachable from this network: " + ", ".join(sorted(unreachable)))
        sys.exit(0)
    print("MAIL DNS IDENTICAL TO BASELINE")
    sys.exit(0)

if __name__ == "__main__":
    main()
