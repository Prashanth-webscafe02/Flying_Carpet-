import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { categories } from "../categories";

// The client's category descriptions (Appendix C), word for word, from src/categories.ts.
export const products = categories.map((c) => ({
  id: c.id,
  title: c.title,
  intro: c.intro,
  points: c.points.map((pt) => [pt.title, pt.text] as [string, string]),
  note: c.note,
}));

export default function ProductInfoPanel({ product }: { product: string }) {
  const content = products.find((item) => item.id === product)!;
  const [expanded, setExpanded] = useState(false);
  const visiblePoints = expanded ? content.points : content.points.slice(0, 3);

  return (
    <section className="glass-solid mt-12 rounded-3xl p-6 ring-1 ring-white/15 lg:mt-0">
      <div className="max-w-xl">
        <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.035em]">
          {content.title}
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-white/80">
          {content.intro}
        </p>
        <ul className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-white/75">
          {visiblePoints.map(([label, text]) => (
            <li key={label}>
              <strong className="font-semibold text-white">{label}: </strong>
              {text}
            </li>
          ))}
        </ul>
        {content.points.length > 3 && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-white"
          >
            {expanded ? "View less" : "View more"}
            <ChevronDown
              aria-hidden="true"
              className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
        {content.note && (
          <p className="mt-5 text-sm italic leading-relaxed text-white/60">
            {content.note}
          </p>
        )}
      </div>
    </section>
  );
}
