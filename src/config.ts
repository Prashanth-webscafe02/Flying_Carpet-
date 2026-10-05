// Every link, number and address the client still has to send (G17), in one place.
// Until a value arrives it stays a placeholder: PLACEHOLDER links render but go nowhere.
// Swap each value here when the client sends it; nothing else needs to change.

export const PLACEHOLDER = "#";

/** Registration page on the platform (Register free). Placeholder: the current site's registration form. */
export const REGISTER_URL = "https://www.flyingcarpet.travel/partner-with-us";
/** Login page on the platform. */
export const LOGIN_URL = PLACEHOLDER;
/**
 * WhatsApp customer care number, digits only with country code (e.g. 27…).
 * DUMMY for now: +1 555 010 0100 is in the US range reserved for fiction, so the chat links open
 * WhatsApp but reach nobody. Replace it with the client's number before going live (G17).
 */
export const WHATSAPP_NUMBER = "15550100100";
/** Freshdesk live chat details for the WhatsApp line. Null until the client sends them. */
export const FRESHDESK: { url: string } | null = null;
export const TERMS_URL = PLACEHOLDER;
export const PRIVACY_URL = PLACEHOLDER;
/** Footer contact email. Empty until the client sends it; the footer hides the email while it is empty. */
export const CONTACT_EMAIL = "";

/** True while a link is still a placeholder. */
export const isPlaceholder = (url: string) => !url || url === PLACEHOLDER;

/** Open real outside links in a new tab; placeholders stay put. */
export const external = (href: string) =>
  isPlaceholder(href) ? {} : { target: "_blank", rel: "noopener noreferrer" };

/** A WhatsApp chat link with a prefilled message, or the placeholder until the number arrives. */
export const whatsappLink = (text: string) =>
  WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : PLACEHOLDER;
