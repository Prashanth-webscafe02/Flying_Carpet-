# Pre-send checks for docs/fct-client-reply.md. Run from the repo root.
import re, collections

R = open("docs/fct-client-reply.md", encoding="utf8").read()
lines = R.splitlines()
ok = lambda b: "PASS" if b else "FAIL"

# 1. hyphens and dashes (markdown table separator rows are exempt; this file uses an HTML table)
sep = re.compile(r"^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$")
hits = [(i + 1, l) for i, l in enumerate(lines) if re.search(r"[‐-―−-]", l) and not sep.match(l)]
seps = [i + 1 for i, l in enumerate(lines) if sep.match(l)]
print(f"1 hyphens/dashes: {ok(not hits)} hits={hits} table_separator_rows={seps}")

# 2. internal terms
bad = {
 "prashant-dev": r"prashant", "main (branch)": r"\bmain\b", "commit hash": r"\b[0-9a-f]{7,40}\b",
 "file name": r"\b[\w/]+\.(tsx|ts|py|md)\b", "line number": r"(:\d+\b|\blines? \d+)",
 "Tailwind": r"(?i)tailwind", "Vercel": r"(?i)vercel", "stash": r"(?i)\bstash", "scratch (folder)": r"(?i)scratch(?! card)",
 "X1 to X8": r"\bX[1-8]\b",
}
found = {k: re.findall(p, R) for k, p in bad.items()}
print("2 internal terms:", ok(not any(found.values())), {k: v for k, v in found.items() if v})

# 3. all 55 numbers once, in order, valid status
order = [f"G{i}" for i in range(1, 18)] + [f"F{i}" for i in range(1, 5)] + [f"H{i}" for i in range(1, 12)] \
      + [f"Q{i}" for i in range(1, 6)] + [f"R{i}" for i in range(1, 7)] + [f"D{i}" for i in range(1, 7)] + [f"L{i}" for i in range(1, 7)]
rows = re.findall(r"<tr><td>([A-Z]\d+)</td><td>([^<]+)</td>", R)
ids = [r for r, _ in rows]
valid = {"Will do", "Will do, waiting on your input", "Question for you"}
bad_status = [(r, s) for r, s in rows if s not in valid]
print(f"3 numbers: {ok(ids == order and not bad_status)} count={len(ids)} unique={len(set(ids))} in_order={ids == order} bad_status={bad_status}")

# 4. mapping from the audit checklist
audit = open("docs/fct-audit-v3.md", encoding="utf8").read().split("## 13. Per-number checklist", 1)[1]
internal = dict(re.findall(r"^\| ([GFHQRDL]\d+) \| ([^|]+?) \|", audit, re.M))
kind = lambda s: "todo, placeholder" if s.startswith("todo, placeholder") else ("blocked" if s.startswith("blocked") else s)
expect = {"todo": "Will do", "todo + question": "Question for you", "question": "Question for you",
          "todo, placeholder": "Will do, waiting on your input", "blocked": "Will do, waiting on your input"}
client = dict(rows)
mism = [(n, internal[n], client.get(n)) for n in internal if expect[kind(internal[n])] != client.get(n)]
ic = collections.Counter(kind(s) for s in internal.values()); cc = collections.Counter(client.values())
print(f"4 mapping: {ok(not mism)} mismatches={mism}")
print("   internal:", dict(ic)); print("   client:  ", dict(cc))

# 5. questions
qsec = R.split("## Questions for you", 1)[1].split("## What we", 1)[0]
qs = re.findall(r"^(\d+)\. \*\*(.+?)\*\* (.+)$", qsec, re.M)
def sentences(t):
    t = re.sub(r"\b(us\.flyingcarpet\.travel|No\.|T&Cs apply\.)", "X", t)
    return [s for s in re.split(r"(?<=[.?!])\s+(?=[A-Z\"])", t.strip()) if s]
for n, title, body in qs:
    s = sentences(body); sug = bool(re.search(r"(?i)\bwe suggest|our suggestion|we can send", body))
    print(f"   Q{n}: {title}  sentences={len(s)} suggestion={sug}")
conflict_titles = {1: r"Category order", 2: r"Floating buttons", 3: r"Your client.*your customers", 4: r"Names spelled with a hyphen",
    5: r"^Numbers", 6: r"Country sites", 7: r"old registration form page", 10: r"Airline names on the Flights card",
    11: r"Airline count", 12: r"Destination lines", 13: r"Destination photos", 14: r"Testimonials"}
titles = [t for _, t, _ in qs]
missing = [k for k, p in conflict_titles.items() if not any(re.search(p, x) for x in titles)]
lengths_ok = all(2 <= len(sentences(b)) <= 4 for _, _, b in qs)
print(f"5 questions: {ok(len(qs) == 13 and not missing and lengths_ok)} count={len(qs)} (expect 13) "
      f"conflicts_missing={missing} all_2_to_4_sentences={lengths_ok}")
print("   conflict 8 (no fees) present:", bool(re.search(r"(?i)no fees, no minimum.*zero|zero, never", qsec)),
      "| conflict 9 (branch) present:", bool(re.search(r"(?i)branch", qsec)))

# 6. G17 list
g17 = R.split("## What we", 1)[1]
need = {"registration link": r"registration page link", "login link": r"login page link", "WhatsApp number": r"WhatsApp customer care number",
        "Freshdesk details": r"Freshdesk details", "Terms and Privacy links": r"Terms and Conditions link and the Privacy Policy link", "footer email": r"contact email for the footer"}
miss = [k for k, p in need.items() if not re.search(p, g17)]
print(f"6 G17 list: {ok(not miss)} missing={miss}")
print("lines:", len(lines))
