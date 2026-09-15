from pathlib import Path
import base64
import gzip
import hashlib

fixes = {
    "part-05": {930: ord("J"), 7162: ord("7")},
    "part-12": {4358: ord("d"), 5633: ord("v")},
}
chunks = []
for path in sorted(Path("lock-b64").glob("part-*")):
    data = bytearray(path.read_bytes())
    for index, value in fixes.get(path.name, {}).items():
        data[index] = value
    chunks.append(bytes(data))
lockfile = gzip.decompress(base64.b64decode(b"".join(chunks)))
expected = "69710e4bb8d9885bdb81b97e7ed09b837105adfec1063374c5ff224fef31f0ba"
if len(lockfile) != 344363:
    raise SystemExit(f"unexpected size {len(lockfile)}")
digest = hashlib.sha256(lockfile).hexdigest()
if digest != expected:
    raise SystemExit(f"unexpected sha256 {digest}")
Path("package-lock.json").write_bytes(lockfile)
print("wrote package-lock.json", len(lockfile), digest)
