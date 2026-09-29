#!/usr/bin/env python3
"""Check that a local folder is exactly the source Vercel deployed to staging.

Staging (intermedia-site-upgrade, deployment dpl_EJSRAWN6VAYySHcaPibcsYkDMmVw,
Sep 23) was uploaded with the Vercel CLI, so GitHub has no copy. Vercel records
the SHA-1 of every uploaded file; staging-manifest.json holds those hashes.

Usage:
  python3 docs/cutover/verify-source.py /path/to/local/intermedia-site

Exit 0 when every listed file matches. Any MISMATCH or MISSING means the folder
changed after the Sep 23 upload (or is the wrong folder): find out why before
pushing it as the production source.
"""
import hashlib
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SKIP_DIRS = {".git", "node_modules", ".next", ".vercel", "out", "docs"}


def sha1(path):
    h = hashlib.sha1()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    root = os.path.abspath(sys.argv[1])
    manifest = json.load(open(os.path.join(HERE, "staging-manifest.json")))
    files = manifest["files"]

    ok, mismatched, missing = 0, [], []
    for rel, want in files.items():
        path = os.path.join(root, rel)
        if not os.path.isfile(path):
            missing.append(rel)
        elif sha1(path) != want:
            mismatched.append(rel)
        else:
            ok += 1

    extra = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            rel = os.path.relpath(os.path.join(dirpath, name), root)
            if rel.startswith(".env") or rel in files or rel in manifest["unverifiable"]:
                continue
            if rel.count(os.sep) >= 3 or rel in (".gitignore", "next-env.d.ts"):
                continue  # deeper files were not listed by Vercel; .gitignore is never uploaded
            extra.append(rel)

    for rel in mismatched:
        print(f"MISMATCH  {rel}")
    for rel in missing:
        print(f"MISSING   {rel}")
    for rel in sorted(extra):
        print(f"NEW       {rel}  (not in the Sep 23 upload)")
    print(f"\n{ok}/{len(files)} files match the deployed staging source.")
    print("Not checkable by hash (build and compare these pages instead):")
    for rel in manifest["unverifiable"]:
        state = "present" if os.path.isfile(os.path.join(root, rel)) else "ABSENT"
        print(f"  {rel}: {state}")

    if mismatched or missing:
        print("\nRESULT: DIFFERENT from staging. Do not push as production source until explained.")
        return 1
    print("\nRESULT: MATCHES staging for every hashed file.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
