import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Globe2,
  Search,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ease } from "../effects/motion";
import { LucidWave } from "../effects/LucidLine";
import ChoiceTile from "./ChoiceTile";
import Stepper from "./Stepper";
import { steps, type Step, type StepId } from "./steps";
import { STORAGE_KEY } from "./answers";
import { pageTitle } from "../content";

type Answers = Record<StepId, string[]>;
const empty: Answers = {
  market: [],
  destinations: [],
  specialise: [],
  hotels: [],
};

// Routes mirror the original site: /get-started/<step>. The last step leads to /destinations.
const indexFromPath = () => {
  const slug = window.location.pathname.split("/").filter(Boolean)[1];
  const i = steps.findIndex((s) => s.id === slug);
  return i === -1 ? 0 : i;
};
const pathFor = (i: number) => `/get-started/${steps[i].id}`;

function load(): { answers: Answers; visited: StepId[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<{
        answers: Partial<Answers>;
        visited: StepId[];
      }>;
      const answers = { ...empty };
      for (const s of steps) {
        const ids = (saved.answers?.[s.id] ?? []).filter((id) =>
          s.choices.some((c) => c.id === id),
        );
        answers[s.id] = s.multi ? ids : ids.slice(0, 1);
      }
      return {
        answers,
        visited: (saved.visited ?? []).filter((v) =>
          steps.some((s) => s.id === v),
        ),
      };
    }
  } catch {
    /* storage blocked or corrupt — start fresh */
  }
  return { answers: empty, visited: [] };
}

// The site's buttons all link to the first step. Coming back with saved progress, pick up at the
// first step not yet completed instead of starting over (or go straight to the destinations when
// every step is done). A link to a specific step, such as "Edit" on the destinations page, is kept.
const ALL_DONE = -1;
function resumeIndex(visited: StepId[]) {
  const i = indexFromPath();
  if (i !== 0 || window.location.search || !visited.length) return i;
  const next = steps.findIndex((s) => !visited.includes(s.id));
  return next === -1 ? ALL_DONE : next;
}

export default function GetStarted() {
  const [{ answers, visited }, setState] = useState(load);
  const [resume] = useState(() => resumeIndex(visited));
  const [index, setIndex] = useState(resume === ALL_DONE ? 0 : resume);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, visited }));
    } catch {
      /* ignore */
    }
  }, [answers, visited]);

  // Normalise the URL on first load and follow browser back/forward.
  useEffect(() => {
    if (resume === ALL_DONE) {
      window.location.replace("/destinations");
      return;
    }
    if (window.location.pathname !== pathFor(index))
      window.history.replaceState(null, "", pathFor(index));
    const onPop = () => setIndex(indexFromPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = pageTitle(steps[index].label);
  }, [index]);

  const go = useCallback(
    (i: number) => {
      setDir(i >= index ? 1 : -1);
      setIndex(i);
      window.history.pushState(null, "", pathFor(i));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [index],
  );

  const step = steps[index];
  const selected = answers[step.id];
  const done = useMemo(() => new Set<StepId>(visited), [visited]);

  const toggle = (id: string) =>
    setState((s) => {
      const cur = s.answers[step.id];
      const next = step.multi
        ? cur.includes(id)
          ? cur.filter((x) => x !== id)
          : [...cur, id]
        : [id];
      return { ...s, answers: { ...s.answers, [step.id]: next } };
    });

  const complete = () => {
    const next = {
      answers,
      visited: visited.includes(step.id) ? visited : [...visited, step.id],
    };
    if (index < steps.length - 1) {
      setState(next);
      go(index + 1);
      return;
    }
    // Last step: save now (the page is about to unload) and show the tailored destinations.
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    window.location.assign("/destinations");
  };

  return (
    <main className="relative mx-auto flex min-h-svh max-w-6xl flex-col px-4 pb-12 pt-28 sm:pt-32 md:px-8 lg:pt-36">
      <div className="mb-10 md:mb-14">
        <div className="mb-5 flex items-center justify-between text-sm">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" /> Back to home
          </a>
          <p className="font-medium text-white/60">
            Step <span className="text-white">{index + 1}</span> of{" "}
            {steps.length}
          </p>
        </div>
        <Stepper current={index} done={done} onGo={go} />
      </div>

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.section
          key={index}
          custom={dir}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d * 40 }),
            center: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: d * -40 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease }}
          className="flex-1"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <Intro step={step} />
            <div className="flex flex-col gap-4">
              <ChoicePanel
                key={step.id}
                step={step}
                selected={selected}
                onToggle={toggle}
              />
              <Actions
                step={step}
                first={index === 0}
                hasPicks={selected.length > 0}
                onBack={() => go(index - 1)}
                onNext={() => complete()}
              />
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
      {/* Lucid Line sign-off under the content on smaller screens (desktop has a fixed one) */}
      <LucidWave
        shape="swell"
        draw="view"
        className="relative -mx-4 mt-10 h-24 md:-mx-8 lg:hidden"
      />
    </main>
  );
}

function Intro({ step }: { step: Step }) {
  return (
    <div className="lg:sticky lg:top-36 lg:self-start">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        {step.eyebrow}
      </p>
      <h1 className="text-[clamp(2.1rem,3.3vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.045em]">
        {step.title[0]}
        <br />
        <span className="bg-gradient-to-r from-[#ffb68c] to-accent bg-clip-text text-transparent">
          {step.title[1]}
        </span>
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
        {step.intro}
      </p>
      <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/55">
        <Globe2 className="size-4 text-accent" /> {step.tagline}
      </p>
    </div>
  );
}

// Glass panel holding the choices; scrolls on its own once the list outgrows it.
function ChoicePanel({
  step,
  selected,
  onToggle,
}: {
  step: Step;
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const choices = q
    ? step.choices.filter((c) => c.title.toLowerCase().includes(q))
    : step.choices;
  const searchable = step.choices.length > 8;

  const scroller = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState(false);
  const updateFade = useCallback(() => {
    const el = scroller.current;
    if (el) setFade(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
  }, []);
  useLayoutEffect(() => {
    updateFade();
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(updateFade);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, [updateFade, choices.length]);

  return (
    <div className="glass rounded-[1.75rem] p-3 sm:p-4">
      <div className="flex items-center justify-between gap-4 px-1.5 pb-3 pt-1">
        <p className="text-sm font-medium text-white/70">
          {step.multi ? "Choose all that apply" : "Choose one"}
        </p>
        {step.multi && (
          <motion.span
            key={selected.length}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${selected.length ? "bg-accent text-white" : "bg-white/10 text-white/70"}`}
          >
            {selected.length} selected
          </motion.span>
        )}
      </div>

      {searchable && (
        <label className="mb-3 flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.05] px-3.5 py-2.5 focus-within:border-white/30">
          <Search className="size-4 shrink-0 text-white/55" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label={`Search ${step.label.toLowerCase()}`}
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/45"
          />
        </label>
      )}

      <div
        ref={scroller}
        data-lenis-prevent
        onScroll={updateFade}
        className="choice-scroll lg:max-h-[min(26rem,60svh)] lg:overflow-y-auto lg:overscroll-contain"
        style={
          fade
            ? {
                maskImage:
                  "linear-gradient(to bottom, #000 calc(100% - 2.5rem), transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 calc(100% - 2.5rem), transparent)",
              }
            : undefined
        }
      >
        <div
          role={step.multi ? "group" : "radiogroup"}
          aria-label={step.title.join(" ")}
          className="grid gap-2 sm:grid-cols-2"
        >
          {choices.map((c, i) => (
            <ChoiceTile
              key={c.id}
              choice={c}
              index={i}
              multi={step.multi}
              selected={selected.includes(c.id)}
              onToggle={() => onToggle(c.id)}
            />
          ))}
        </div>
        {choices.length === 0 && (
          <p className="px-1.5 py-6 text-center text-sm text-white/60">
            Nothing matches “{query}”.
          </p>
        )}
      </div>
    </div>
  );
}

function Actions({
  step,
  first,
  hasPicks,
  onBack,
  onNext,
}: {
  step: Step;
  first: boolean;
  hasPicks: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {first ? (
        <span />
      ) : (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" /> Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={!hasPicks && !step.skipHint}
        className="group inline-flex items-center gap-2.5 rounded-full bg-accent py-2.5 pl-5 pr-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgb(232_101_37/0.9)] transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/45 disabled:shadow-none"
      >
        {!hasPicks && step.skipHint ? "Continue without choosing" : step.next}
        <span className="grid size-6 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-disabled:translate-x-0">
          <ArrowRight className="size-3.5" />
        </span>
      </button>
      {step.skipHint && !hasPicks && (
        <p className="w-full text-right text-xs text-white/50">
          {step.skipHint}
        </p>
      )}
    </div>
  );
}
