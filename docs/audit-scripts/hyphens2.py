# hyphens2.py: extends hyphens.py.
#  * DASH now also matches a spaced hyphen (" - ").
#  * Also scans every src/**/*.tsx: JSX text between tags, and visible string literals
#    (attribute values like title=, alt=, placeholder=, text=, label=, template literals such as
#    `${d.city} — Flying Carpet`). className values and Tailwind class lists are skipped.
import re, sys, glob, os, collections, runpy, contextlib, io

ROOT = sys.argv[1]
with contextlib.redirect_stdout(io.StringIO()):          # hyphens.py prints its own report; silence it
    base = runpy.run_path(os.path.join(os.path.dirname(__file__), "hyphens.py"), run_name="lib")
classify, STR = base["classify"], base["STR"]            # reuse name/prose/skip rules
DATA_FILES = base["FILES"]

DASH = re.compile(r"(?<=[A-Za-z0-9])-(?=[A-Za-z0-9])|[–—]|(?<= )-(?= )")
CLASSY = re.compile(r"^[a-z0-9:!\[\]/.%#_()&>*,=-]+$")
CLASS_WORDS = {"flex", "grid", "hidden", "block", "inline", "absolute", "relative", "fixed", "sticky", "group",
               "sheen", "glass", "glass-strong", "glass-solid", "glass-orange", "uppercase", "italic", "truncate",
               "underline", "outline-none", "transition", "shrink-0", "grow", "contents", "isolate", "peer", "sr-only"}
CODEISH = re.compile(r"calc\(|gradient\(|rgb\(|prefers-|max-width|min-width|orientation:|#ifdef|precision "
                     r"|^[a-z]{2}-[A-Z]{2}$|\$$|^`|&\]")

def looks_like_classes(s):
    toks = s.split()
    return bool(toks) and not re.search(r"[A-Z]", s) and all(
        t in CLASS_WORDS or (CLASSY.match(t) and re.search(r"[-:/\[]", t)) for t in toks)

def strip_comments(src):
    src = re.sub(r"\{/\*.*?\*/\}", "", src, flags=re.S)
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    return re.sub(r"(^|[^:])//[^\n]*", r"\1", src)

def tsx_hits(src):
    # 1. JSX text: runs between '>' and '<' or '{' that contain a letter
    for m in re.finditer(r">([^<>{}]*[A-Za-z][^<>{}]*)(?=[<{])", src):
        t = m.group(1).strip()
        if t and not re.search(r"[;=()`$]|=>|&&", t) and not CODEISH.search(t):
            yield "prose", t
    # 2. string literals that are not class lists, imports, ids or URLs
    for m in STR.finditer(src):
        s = m.group(0)[1:-1]
        before = src[max(0, m.start() - 40):m.start()]
        if re.search(r"(className|class|import|from|href|src|key|id|type|name|autoComplete|rel|target"
                     r"|viewBox|d|fill|stroke)\s*=?\s*\{?\s*$", before) or re.search(r"\bfrom\s*$|\bimport\s*$", before):
            continue
        if looks_like_classes(s) or re.fullmatch(r"[a-z0-9-]+|https?:.*|/.*|#.*", s):
            continue
        if "${" in s:                                     # template literal: drop the expressions
            s = re.sub(r"\$\{[^}]*\}", " ", s)
            if looks_like_classes(s): continue
        if not re.search(r"[A-Za-z]{2}", s) or CODEISH.search(s): continue
        kind = classify(src, m)
        if kind != "skip": yield kind, s

def count(pairs):
    c = collections.Counter()
    for kind, s in pairs:
        n = len(DASH.findall(s))
        if n: c[(kind, "strings")] += 1; c[(kind, "dashes")] += n
    return c

data_pairs = []
for f in DATA_FILES:
    src = re.sub(r"^\s*//.*$", "", open(f, encoding="utf8").read(), flags=re.M)
    for m in STR.finditer(src):
        k = classify(src, m)
        if k != "skip": data_pairs.append((k, m.group(0)[1:-1]))

tsx_pairs, examples = [], collections.defaultdict(list)
for f in sorted(glob.glob(f"{ROOT}/src/**/*.tsx", recursive=True)):
    rel = os.path.relpath(f, ROOT).replace("\\", "/")
    for kind, s in tsx_hits(strip_comments(open(f, encoding="utf8").read())):
        tsx_pairs.append((kind, s))
        if DASH.search(s): examples[rel].append(f"[{kind}] {s}")

d, t = count(data_pairs), count(tsx_pairs)
for label, c in (("data files", d), (".tsx visible text", t), ("TOTAL", d + t)):
    print(f"{label}: names {c[('name','strings')]} strings / {c[('name','dashes')]} dashes; "
          f"prose {c[('prose','strings')]} strings / {c[('prose','dashes')]} dashes")
for f in sorted(examples):
    print(f"  {f} ({len(examples[f])})"); [print(f"      {s[:100]}") for s in examples[f]]
