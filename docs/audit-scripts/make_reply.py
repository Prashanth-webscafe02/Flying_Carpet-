# Builds docs/fct-client-reply.md from the audit's section 13 statuses. Run from the repo root.
import re, collections, sys
OUT = sys.argv[1] if len(sys.argv) > 1 else "docs/fct-client-reply.md"

audit = open("docs/fct-audit-v3.md", encoding="utf8").read().split("## 13. Per-number checklist", 1)[1]
internal = dict(re.findall(r"^\| ([GFHQRDL]\d+) \| ([^|]+?) \|", audit, re.M))

def to_client(s):
    if s.startswith("todo, placeholder") or s.startswith("blocked"):
        return "Will do, waiting on your input"
    if s in ("todo + question", "question"):
        return "Question for you"
    if s == "todo":
        return "Will do"
    raise ValueError(s)

notes = [
("G1", "New tab title, page description and footer sign off on every page. The US description depends on question 6."),
("G2", "All copy will speak to the agent about their client. See question 3."),
("G3", "350+ airlines becomes 400+ everywhere. See question 5 for the other numbers."),
("G4", "All five categories everywhere, never Coming soon. See question 1 for the order."),
("G5", "Only Register free, Login, Explore destinations and Chat with us, plus the buttons inside the questions."),
("G6", "Floating Chat with us on every page with your prefilled message. Needs the WhatsApp number and the Freshdesk details."),
("G7", "Car rentals only, always written as Zero booking fee. T&Cs apply."),
("G8", "Flying Carpet everywhere, including the footer, the tab title and image descriptions."),
("G9", "Every word in your table replaced as you listed."),
("G10", "We will take hyphens and dashes out of all copy. See question 4 about names."),
("G11", "Canada and Zambia removed everywhere. Each country site showing its own list depends on question 6."),
("G12", "We will use your US wording. See questions 6 and 12."),
("G13", "Gold line that moves behind and in front of content, with dots, two lines per screen, and behind the question cards."),
("G14", "Lato for all text."),
("G15", "Real photos of each destination and category, with no brand names in any image. See question 11."),
("G16", "The page always scrolls freely, and a tap works wherever hover does."),
("G17", "We keep placeholders until your items arrive, and we take the dummy phone number down now. See the list below."),
("F1", "Register free goes straight to the registration page once we have the link. The old registration form page is covered in question 7."),
("F2", "The WhatsApp button and the help boxes open your customer care chat once we have the number."),
("F3", "Explore destinations, then the two questions, results, a destination, and listings with the scratch card."),
("F4", "Login goes to the platform login page once we have the link."),
("H1", "Same header on every page, with your menu, Login and Register free."),
("H2", "Your hero copy and buttons, a destination photo, and the Lucid Line leading to Register free."),
("H3", "What you can book with your copy. Each card opens its category in The platform."),
("H4", "Your About us copy and numbers, with the US version on the US site."),
("H5", "Your Why Flying Carpet text word for word, plus the Stay up to date card. See question 3."),
("H6", "New destination browser with region tabs, search and See all destinations. See questions 6, 10 and 11."),
("H7", "Your category descriptions in each panel, with See all features."),
("H8", "New heading and text, and the cards open on tap. See question 13."),
("H9", "Register free button and the WhatsApp line under it. One of the kept points is White label site; see question 4."),
("H10", "Our line and all five categories in the moving strip."),
("H11", "Your footer copy on every page. Needs the footer email and the Terms and Privacy links."),
("Q1", "Market screen removed. Each site will know its market from its web address; see question 6."),
("Q2", "Regions from your list for that market, with their counts. See question 6."),
("Q3", "All five categories, with several picks allowed. See question 1 about putting them first."),
("Q4", "Hotel category screen removed."),
("Q5", "Two steps in the progress bar, Show me everything on both, and the header and WhatsApp button stay."),
("R1", "New label, heading and text."),
("R2", "Only Regions, Categories and Clear filters."),
("R3", "Your destinations, See all destinations and that market's regions, sorted by Our ranking or A to Z. See question 6."),
("R4", "Popular removed. Your region kept."),
("R5", "New side card and help box. The chat needs the WhatsApp number."),
("R6", "See question 2."),
("D1", "Your two destination lines at the top of each page. See questions 10 and 11."),
("D2", "Plain highlight labels. See question 9 for the airline count."),
("D3", "All five tabs work. Empty categories show your description, Register free and a WhatsApp line, which needs the number."),
("D4", "What you can book in [destination]. See questions 1 and 8."),
("D5", "New why box with your four points."),
("D6", "New help box. The chat needs the WhatsApp number."),
("L1", "Scratch card on every listing, with no prices shown. See question 12 for the US wording."),
("L2", "Badges that are not from your data removed. Stars and hotel category kept."),
("L3", "Your Hotels and Experiences points word for word. See question 3."),
("L4", "Complete the trip, with Transfers and Experiences links."),
("L5", "New help box. The chat needs the WhatsApp number."),
("L6", "New heading and text. Curated for agents selling India to world removed."),
]
assert [n for n, _ in notes] == list(internal), "numbers differ from the audit checklist"
rows = [(n, to_client(internal[n]), t) for n, t in notes]
cnt = collections.Counter(s for _, s, _ in rows)

table = ("<table>\n<thead><tr><th>No.</th><th>Status</th><th>Notes</th></tr></thead>\n<tbody>\n"
         + "\n".join(f"<tr><td>{n}</td><td>{s}</td><td>{t.replace('&', '&amp;')}</td></tr>" for n, s, t in rows)
         + "\n</tbody>\n</table>")

doc = f"""# Flying Carpet agent microsite: our reply to your changes

This is our reply against each number in your document "Changes for the next build" (1 October 2026, version 1). For every number you will find one of three answers:

1. **Will do:** clear, and we will build it as written.
2. **Will do, waiting on your input:** we will build it now with a placeholder and switch to the real link or number when you send it.
3. **Question for you:** we will build what is clear, but one point needs your answer first. The questions are listed after the table.

In total: {cnt['Will do']} Will do, {cnt['Will do, waiting on your input']} Will do, waiting on your input, and {cnt['Question for you']} Question for you.

## Our reply, number by number

{table}

## Small notes

**F3, returning agents.** When an agent who has already answered the questions presses Explore destinations, we plan to start at step 1 with their earlier choices already selected. Tell us if you would prefer something else.

## Questions for you

Questions 1, 6, 10 and 11 gate the most work. The rest can follow.

1. **Category order (G4, Q3, D4).** G4 asks for one fixed order everywhere: Flights, Hotels, Experiences, Transfers, Car rentals. Q3 and D4 ask for the agent's own picks to come first on every destination. Our suggestion: picks first on destination pages only, and the fixed order everywhere else. Is that right?

2. **Floating buttons (G6, R6).** G6 puts Chat with us at the bottom right of every page, and R6 asks for a floating Register free on the results page. Register free is already in the header on every page, but the header slides away while you scroll down and comes back when you scroll up. Must Register free stay visible while scrolling? If yes, we suggest keeping the header fixed so only WhatsApp floats; otherwise we can put a floating Register free at the bottom left.

3. **"Your client" or "your customers" (G2, H5, L3).** G2 asks for "your client", but your category descriptions (Appendix C) say "your customers" 15 times, and so do Why Flying Carpet cards 5 and 9. Should we change these to "your clients" for consistency, or keep them word for word? We suggest "your clients". Until you tell us, we will keep your wording as written.

4. **Names spelled with a hyphen (G10, H9).** Some hotel, place and brand names are officially written with a hyphen, for example the Shangri La hotels (officially hyphenated), Notre Dame in Paris and a few street addresses. Can these keep their official spelling while all other copy follows G10? We suggest keeping official spellings for names only. The registration block point you asked us to keep also reads "White label site with your own branding", which we will write without the hyphen unless you say otherwise.

5. **Numbers (G3).** G3 lists the only numbers to use, but your own copy also uses 100+ countries, 1,400+ travel agents and up to 3.5%. The testimonials section also shows 4.9 out of 5, 98% would recommend, and 1,400+ travel agents onboard. We suggest keeping the three from your copy and removing the testimonial figures unless you can confirm them. Is that right?

6. **Country sites (G1, G11, G12, Q1, Q2, H6, R3).** Your document names us.flyingcarpet.travel. Can you confirm the web addresses for the South Africa and India sites, and who can add the address records for us? When someone opens a link without a country address, such as our preview link, which market should they see? We suggest India, as in your example in H6, with a way to switch market on the preview.

7. **The old registration form page.** The new site still has a registration form page called Partner with us. It is not linked from anywhere, and it does not send its details anywhere yet. With Register free going to the platform, may we remove it? We suggest removing it.

8. **Airline names on the Flights card (low priority).** On each destination page, the Flights card lists airline names as small tags, for example Singapore Airlines, Scoot and Air India. Your rules keep airline names out of the destination lines and brand names out of images, but they don't cover these tags. Are they fine to keep? We suggest keeping them, as they help agents.

9. **Airline count on destination pages (D2).** D2 shows the number of airlines only where it comes from your data. Today we have counts for the current destinations, compiled by our team. Do these count as your data, and can you send counts for the new destinations? Where we have no confirmed count, we suggest hiding that label.

10. **Destination lines (D1, H6).** We will write the two lines for the remaining 73 destinations, following your rules and examples in Appendix B, and send them for your review before they go live. How long will you need for the review? We can send them market by market, starting with India if that suits you.

11. **Destination photos (G15, H6, D1).** We need a real photo for each of the 79 destinations, with no brand names visible. Who will supply them, or are you happy for us to use a licensed stock library? If we use a library, who covers the licensing cost? We suggest a licensed stock library, with your approval of the final set.

12. **US wording for "agent rate" (L1).** The scratch card says "your agent rate", and the help box says "agent rates". Your document gives no US version for these. For the US site we suggest "your advisor rate" and "advisor rates". Is that right?

13. **Testimonials (H8).** Our five testimonial cards mention Portugal, India and Romania, which are not in your destination list, and we edited some quotes to remove dashes. Should we keep them, replace them with quotes from your agents, or change which destinations they mention? We suggest replacing them with quotes you can confirm.

## What we're waiting on (G17)

Until these arrive we will keep placeholders, and we will not publish the dummy phone number or WhatsApp link.

1. The registration page link, for Register free.
2. The login page link.
3. The WhatsApp customer care number.
4. The Freshdesk details for the live chat.
5. The Terms and Conditions link and the Privacy Policy link.
6. The contact email for the footer.

When we share the next link, we will reply against each number again, with done or with our question.
"""
dashes = [(i + 1, l) for i, l in enumerate(doc.splitlines()) if re.search(r"[‐-―−-]", l)]
assert not dashes, dashes
open(OUT, "w", encoding="utf8").write(doc)
print(dict(cnt))
