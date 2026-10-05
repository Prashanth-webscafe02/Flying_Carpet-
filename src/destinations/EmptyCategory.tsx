import { ArrowRight, Check } from "lucide-react";
import { categoryById } from "../categories";
import { REGISTER_URL } from "../config";
import { LucidCorner } from "../effects/LucidLine";
import { ChatLink } from "./ChatFab";
import type { ProductId } from "./data";

/**
 * A category with no listings yet (G4, D3): the client's description from Appendix C,
 * Register free, and a WhatsApp line. Never "Coming soon".
 */
export default function EmptyCategory({ id, city }: { id: ProductId; city: string }) {
  const c = categoryById(id);
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-[#1d1a63] via-brand to-brand p-7 ring-1 ring-white/15 md:p-10">
      <LucidCorner className="absolute -bottom-2 -right-6 rotate-180 opacity-50" />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{c.title}</p>
      <p className="mt-3 max-w-2xl text-[clamp(1.25rem,2vw,1.6rem)] font-semibold leading-snug tracking-tight">
        {c.intro}
      </p>
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {c.points.map((p) => (
          <li key={p.title} className="flex gap-3 text-[0.95rem] leading-snug text-white/75">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent">
              <Check className="size-3" strokeWidth={3.5} />
            </span>
            <span>
              <span className="font-semibold text-white">{p.title}:</span> {p.text}
            </span>
          </li>
        ))}
      </ul>
      {c.note && <p className="mt-4 text-sm text-white/55">{c.note}</p>}
      <a
        href={REGISTER_URL}
        target="_blank"
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-cream py-1.5 pl-5 pr-1.5 font-bold tracking-tight text-ink shadow-[0_10px_40px_-8px_rgb(232_101_37/0.7)] transition-transform duration-500 hover:scale-[1.04]"
      >
        Register free
        <span className="grid size-8 place-items-center rounded-full bg-accent text-white">
          <ArrowRight className="size-4" />
        </span>
      </a>
      <p className="mt-4 text-sm text-white/75">
        Questions about {c.title.toLowerCase()} in {city}?{" "}
        <ChatLink className="font-semibold text-white underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
          Chat with us on WhatsApp.
        </ChatLink>
      </p>
    </div>
  );
}
