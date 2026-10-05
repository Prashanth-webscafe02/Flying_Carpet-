import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { REGISTER_URL } from "../config";
import { words } from "../market";

const REVEAL_AT = 0.35; // share of the foil scratched off before it clears by itself
const BRUSH = 32;

/**
 * Scratch card in place of rates (L1). Drag on desktop, swipe on phones; Enter or Space reveals it
 * from the keyboard. Underneath: "Register free to see your agent rate for this hotel." and
 * Register free. No prices anywhere.
 */
export default function ScratchCard({
  kind,
  className = "",
}: {
  kind: "hotel" | "experience";
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const strokes = useRef(0);
  // Once the agent has started scratching, a resize must not repaint (and undo) the foil.
  const touched = useRef(false);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const label = `Scratch to see your ${words.agentRate}`;

  // Paint the gold foil, sized to the card (crisp on high density screens).
  const paint = useCallback(() => {
    const c = canvas.current;
    const w = wrap.current;
    if (!c || !w || touched.current) return;
    const { width, height } = w.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(width * dpr);
    c.height = Math.round(height * dpr);
    const ctx = c.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#f6d98b");
    g.addColorStop(0.45, "#e8b04b");
    g.addColorStop(1, "#c98f2c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    // fine diagonal sheen lines
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    for (let x = -height; x < width; x += 9) {
      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x + height, 0);
      ctx.stroke();
    }
    // a few "stops" along a soft thread, like the Lucid Line
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.78);
    ctx.bezierCurveTo(width * 0.3, height * 0.55, width * 0.6, height * 0.98, width, height * 0.62);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    for (const [px, py] of [[0.28, 0.66], [0.7, 0.8]]) {
      ctx.beginPath();
      ctx.arc(width * px, height * py, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#0b0945";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `700 ${width < 220 ? 13 : 15}px Lato, sans-serif`;
    const lines = width < 220 ? ["Scratch to see your", words.agentRate] : [label];
    lines.forEach((l, i) => ctx.fillText(l, width / 2, height * 0.38 + (i - (lines.length - 1) / 2) * 18));
  }, [label]);

  useEffect(() => {
    if (revealed) return;
    paint();
    const ro = new ResizeObserver(paint);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [paint, revealed]);

  const point = (e: PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  // How much foil is gone, sampled on a coarse grid.
  const cleared = () => {
    const c = canvas.current!;
    const data = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    let n = 0;
    for (let i = 3; i < data.length; i += 4 * 40) {
      n++;
      if (data[i] === 0) clear++;
    }
    return n ? clear / n : 0;
  };

  const scratch = (to: { x: number; y: number }) => {
    const ctx = canvas.current!.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH;
    touched.current = true;
    const from = last.current ?? to;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    last.current = to;
    if (++strokes.current % 8 === 0 && cleared() > REVEAL_AT) setRevealed(true);
  };

  return (
    <div
      ref={wrap}
      // Scratching must not open the card it sits on.
      onClick={(e) => e.stopPropagation()}
      className={`relative z-10 min-h-28 overflow-hidden rounded-2xl bg-white/8 ring-1 ring-white/15 ${className}`}
    >
      {/* Under the foil */}
      <div
        aria-hidden={!revealed}
        className="flex h-full min-h-28 flex-col items-start justify-center gap-3 p-4"
      >
        <p className="text-sm font-semibold leading-snug">
          Register free to see your {words.agentRate} for this {kind}.
        </p>
        <a
          href={REGISTER_URL}
          target="_blank"
          tabIndex={revealed ? 0 : -1}
          className="group/rf inline-flex items-center gap-2 rounded-full bg-cream py-1.5 pl-4 pr-1.5 text-sm font-bold text-ink shadow-[0_10px_30px_-10px_rgb(232_101_37/0.8)] transition-transform hover:scale-[1.04]"
        >
          Register free
          <span className="grid size-6 place-items-center rounded-full bg-accent text-white transition-transform group-hover/rf:rotate-[-45deg]">
            <ArrowRight className="size-3.5" />
          </span>
        </a>
      </div>

      {/* The foil */}
      <AnimatePresence>
        {!revealed && (
          <motion.canvas
            ref={canvas}
            role="button"
            tabIndex={0}
            aria-label={`${label}. Press Enter to reveal.`}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
            transition={{ duration: 0.45 }}
            onPointerDown={(e) => {
              e.stopPropagation();
              drawing.current = true;
              last.current = null;
              try {
                // Keeps the stroke going if the finger or mouse slips past the edge; optional.
                e.currentTarget.setPointerCapture(e.pointerId);
              } catch {
                /* not available for this pointer */
              }
              scratch(point(e));
            }}
            onPointerMove={(e) => {
              if (drawing.current) scratch(point(e));
            }}
            onPointerUp={() => {
              drawing.current = false;
              last.current = null;
              if (cleared() > REVEAL_AT) setRevealed(true);
            }}
            onPointerCancel={() => {
              drawing.current = false;
              last.current = null;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setRevealed(true);
              }
            }}
            className="absolute inset-0 h-full w-full cursor-grab touch-none rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-white active:cursor-grabbing"
          />
        )}
      </AnimatePresence>
      {!revealed && (
        <Sparkles aria-hidden className="pointer-events-none absolute right-3 top-3 size-4 animate-pulse text-white/80" />
      )}
    </div>
  );
}
