// Logos gliding past in an endless loop, on white tiles so brand colours stay true. The list is
// repeated until one lap is long enough to fill the row, then doubled so the loop has no seam.
// A name without a logo shows as text on its tile. Hovering pauses the loop.
export default function LogoMarquee({
  names,
  logos,
  label,
}: {
  names: string[];
  logos: Record<string, string>;
  /** What the logos are, for screen readers (e.g. "Airlines"). */
  label?: string;
}) {
  const lap = Array.from(
    { length: Math.ceil(10 / names.length) },
    () => names,
  ).flat();
  const fade =
    "linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)";
  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <ul className="sr-only" aria-label={label}>
        {names.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <div
        aria-hidden
        className="marquee flex w-max hover:[animation-play-state:paused]"
      >
        {[...lap, ...lap].map((c, i) => (
          <span
            key={i}
            className="mr-3 grid h-20 w-40 shrink-0 place-items-center rounded-2xl bg-white px-5"
          >
            {logos[c] ? (
              <img
                src={logos[c]}
                alt=""
                loading="lazy"
                decoding="async"
                className="max-h-10 w-full object-contain"
              />
            ) : (
              <span className="text-center text-sm font-extrabold uppercase leading-tight tracking-[0.04em] text-ink">
                {c}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
