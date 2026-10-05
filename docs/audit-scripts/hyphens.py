# Count hyphens/dashes in the text of the site's data files, split into NAMES and PROSE.
# A "dash" is: a hyphen between two letters/digits (Shangri-La, last-minute), an en dash (–) or an em dash (—).
# NAME  = value of a name-like key (name, title, area, place, city, country, airportName, address, via),
#         an object key written as a string ('Floating Market Day Trip': {...}),
#         or the first item of a [title, description] pair (itinerary/stop titles).
# PROSE = every other visible string (text, intro, overview, quotes, list items, stop descriptions...).
# SKIP  = ids, slugs, image/URL/source fields, class names, icons, codes, enum values.
import re, sys, glob, collections, os

ROOT = sys.argv[1]
FILES = sorted(glob.glob(f"{ROOT}/src/destinations/*.ts") + glob.glob(f"{ROOT}/src/destinations/itineraries/*.ts")
               + [f"{ROOT}/src/content.ts", f"{ROOT}/src/get-started/steps.ts"])
NAME_KEYS = {"name", "title", "area", "place", "city", "country", "airportName", "address", "via"}
SKIP_KEYS = {"id", "img", "src", "source", "url", "href", "icon", "category", "code", "airport", "region",
             "className", "tripImg", "avatar", "transferMode", "products", "n", "kind", "type", "logo"}
DASH = re.compile(r"(?<=[A-Za-z0-9])-(?=[A-Za-z0-9])|[–—]")
STR = re.compile(r"'((?:[^'\\\n]|\\.)*)'|\"((?:[^\"\\\n]|\\.)*)\"|`((?:[^`\\]|\\.)*)`")

def classify(src, m):
    s = m.group(0)[1:-1]
    before = src[:m.start()]
    after = src[m.end():m.end() + 3]
    if re.match(r"\s*:", after):                      # 'Some Name': {...}  -> object key
        return "skip" if re.fullmatch(r"[a-z0-9-]+", s) else "name"   # 'new-york': {...} is an id
    k = re.search(r"(\w+)\s*:\s*$", before)            # key: 'value'
    if k:
        key = k.group(1)
        return "skip" if key in SKIP_KEYS else ("name" if key in NAME_KEYS else "prose")
    if re.search(r"\[\s*$", before) and re.match(r"\s*,\s*['\"`]", src[m.end():m.end() + 4]):
        return "name"                                  # first item of ['Title', 'desc']
    # list item: find the key of the enclosing array
    depth, i = 0, m.start() - 1
    while i >= 0:
        c = src[i]
        if c in ")]}": depth += 1
        elif c in "([{":
            if depth == 0:
                if c == "[":
                    k = re.search(r"(\w+)\s*:\s*$", src[:i])
                    if k and k.group(1) in SKIP_KEYS: return "skip"
                    if k and k.group(1) in NAME_KEYS: return "name"
                break
            depth -= 1
        i -= 1
    if re.fullmatch(r"[a-z0-9-]+|https?:.*|/.*|photo-.*", s): return "skip"   # slugs, URLs, paths
    if re.search(r"(^|\s)(size|text|bg|rounded|flex|grid|px|py)-", s): return "skip"  # tailwind classes
    return "prose"

totals = collections.Counter()
examples = collections.defaultdict(set)
per_file = collections.defaultdict(collections.Counter)
for f in FILES:
    src = open(f, encoding="utf8").read()
    src_nc = re.sub(r"^\s*//.*$", "", src, flags=re.M)   # drop line comments
    for m in STR.finditer(src_nc):
        kind = classify(src_nc, m)
        if kind == "skip": continue
        n = len(DASH.findall(m.group(0)))
        if not n: continue
        rel = os.path.relpath(f, ROOT).replace("\\", "/")
        totals[(kind, "strings")] += 1
        totals[(kind, "dashes")] += n
        per_file[rel][kind] += 1
        if kind == "name": examples[rel].add(m.group(0)[1:-1])

print("strings containing a hyphen or dash, by file (name / prose):")
for f in sorted(per_file): print(f"  {f}: {per_file[f]['name']} / {per_file[f]['prose']}")
for kind in ("name", "prose"):
    print(f"{kind.upper()}: {totals[(kind,'strings')]} strings, {totals[(kind,'dashes')]} hyphens/dashes")
print("\nALL NAMES WITH A HYPHEN OR DASH:")
for f in sorted(examples):
    for e in sorted(examples[f]): print(f"  {f}: {e}")
