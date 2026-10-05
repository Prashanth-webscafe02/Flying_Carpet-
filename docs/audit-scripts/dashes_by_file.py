# Per-file hyphen/dash counts for given files, before (a git revision) and after (working copy).
# Reuses the rules in hyphens.py / hyphens2.py (names vs prose; .tsx visible text only).
# Usage, from the repo root:  python docs/audit-scripts/dashes_by_file.py [--rev HEAD] FILE [FILE ...]
import os, re, sys, runpy, subprocess, contextlib, io

here = os.path.dirname(os.path.abspath(__file__))
args = sys.argv[1:]
rev = "HEAD"
if args[:1] == ["--rev"]:
    rev, args = args[1], args[2:]

sys.argv = [sys.argv[0], "."]
with contextlib.redirect_stdout(io.StringIO()):
    h2 = runpy.run_path(os.path.join(here, "hyphens2.py"), run_name="lib")
classify, STR, DASH = h2["classify"], h2["STR"], h2["DASH"]
tsx_hits, strip_comments = h2["tsx_hits"], h2["strip_comments"]

def pairs(path, src):
    if path.endswith(".tsx"):
        return list(tsx_hits(strip_comments(src)))
    src = re.sub(r"^\s*//.*$", "", src, flags=re.M)
    out = []
    for m in STR.finditer(src):
        k = classify(src, m)
        if k != "skip":
            out.append((k, m.group(0)[1:-1]))
    return out

def count(path, src):
    c = {"name": [0, 0], "prose": [0, 0]}
    if src is None:
        return None
    for kind, s in pairs(path, src):
        n = len(DASH.findall(s))
        if n:
            c[kind][0] += 1
            c[kind][1] += n
    return c

def fmt(c):
    return "missing" if c is None else f"names {c['name'][0]}/{c['name'][1]}, prose {c['prose'][0]}/{c['prose'][1]}"

print(f"strings/dashes per file   ({rev} -> working copy)")
for f in args:
    try:
        before = subprocess.run(["git", "show", f"{rev}:{f}"], capture_output=True, text=True, encoding="utf8", check=True).stdout
    except subprocess.CalledProcessError:
        before = None
    after = open(f, encoding="utf8").read() if os.path.exists(f) else None
    print(f"  {f}: {fmt(count(f, before))}  ->  {fmt(count(f, after))}")
