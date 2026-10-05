import type { ProductId } from "../destinations/data";

// The What you can book cards (H3) open a category's panel in The platform (H7).
export const OPEN_EVENT = "platform:open";

/** Open a category's panel in The platform. */
export function openPlatformPanel(id: ProductId) {
  window.dispatchEvent(new CustomEvent<ProductId>(OPEN_EVENT, { detail: id }));
}
