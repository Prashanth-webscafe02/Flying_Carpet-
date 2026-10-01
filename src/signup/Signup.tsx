import { ArrowLeft, ArrowRight, Check, ChevronDown, CircleAlert, FileText, Mail, Upload, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Eyebrow, Reveal, SplitHeading } from "../effects/motion";

// Agency registration, mirroring the form on flyingcarpet.travel/partner-with-us (same sections,
// fields and rules), in this site's glass style.

const ISO =
  "AF AX AL DZ AS AD AO AI AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BA BW BR IO VG BN BG BF BI KH CM CA CV KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI XK KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF KP MK MP NO OM PK PW PS PA PG PY PE PH PL PT PR QA RE RO RU RW WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA KR SS ES LK BL SH KN LC MF PM VC SD SR SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UY UZ VU VA VE VN VI WF EH YE ZM ZW";
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const countries = ISO.split(" ")
  .map((c) => regionNames.of(c) ?? c)
  .sort((a, b) => a.localeCompare(b));

const titles = ["Mr.", "Ms.", "Mrs."];
const sources = [
  "Search Engines Ads",
  "Social Media Ads",
  "Organic Search (SEO / Website visit)",
  "Referral Link",
  "Online Travel Forums or Communities",
  "Networking / Word of Mouth",
  "Printed Brochures / Flyers",
];
const sourcesWithDetails = ["Online Travel Forums or Communities", "Networking / Word of Mouth"];
const accreditations = [
  { id: "arc_number", label: "ARC number", placeholder: "Enter ARC number" },
  { id: "iata_number", label: "IATA number", placeholder: "Enter IATA number" },
  { id: "clia_number", label: "CLIA number", placeholder: "Enter CLIA number" },
  {
    id: "others",
    label: "Other number",
    placeholder: "Business, commercial or tax registration, or government ID number",
  },
];
const MAX_DOC_BYTES = 512_000;
const benefits = [
  { title: "Global network", stat: "24/7", unit: "Support", img: "/images/global.webp" },
  { title: "Airline bookings", stat: "350+", unit: "Airlines", img: "/images/flights.webp" },
  { title: "Hotel bookings", stat: "300,000+", unit: "Hotels", img: "/images/hotel.webp" },
];

// One look for every text field and select: 48px tall, readable on the glass panel, an orange focus
// ring, and a red border once the field has been touched (or the form submitted) while invalid.
const control =
  "h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-base text-white outline-none transition-[border-color,box-shadow,background-color] placeholder:text-white/35 hover:border-white/30 focus:border-accent focus:bg-white/[0.09] focus:ring-4 focus:ring-accent/20 user-invalid:border-red-400/80 group-data-[submitted=true]/form:invalid:border-red-400/80 autofill:shadow-[inset_0_0_0_1000px_#1d1a63] autofill:[-webkit-text-fill-color:#fff] sm:text-[0.95rem]";

function Field({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[0.8rem] font-semibold tracking-wide text-white/75">{label}</span>
      {children}
    </label>
  );
}

function Text({
  label,
  name,
  type = "text",
  className,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  className?: string;
  maxLength?: number;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <Field label={label} className={className}>
      <input name={name} type={type} required className={control} {...rest} />
    </Field>
  );
}

function Select({
  label,
  name,
  options,
  className,
  placeholder = "Select",
}: {
  label: string;
  name: string;
  options: string[];
  className?: string;
  placeholder?: string;
}) {
  return (
    <Field label={label} className={className}>
      <SelectBox name={name} options={options} placeholder={placeholder} />
    </Field>
  );
}

// The open list is drawn by the browser and takes the select's see-through fill, which on Windows
// leaves white text on a white list. Give every option a solid navy background of its own.
const option = "bg-[#15124f] text-white disabled:text-white/45";

// Native select with its own chevron; the empty choice reads as a placeholder (muted) until picked.
function SelectBox({
  name,
  options,
  placeholder,
  ...rest
}: {
  name: string;
  options: string[];
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  "aria-label"?: string;
}) {
  return (
    <span className="relative block">
      <select
        name={name}
        required
        {...(rest.value === undefined ? { defaultValue: "" } : {})}
        {...rest}
        className={`${control} cursor-pointer appearance-none pr-11 invalid:text-white/40`}
      >
        <option value="" disabled className={option}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} className={option}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/55" />
    </span>
  );
}

// Dial code + number in one bordered control, e.g. "+971 | 50 123 4567".
function Phone({ label, name, className }: { label: string; name: string; className?: string }) {
  return (
    <Field label={label} className={className}>
      <span className="flex h-12 items-center rounded-xl border border-white/15 bg-white/[0.06] transition-[border-color,box-shadow,background-color] hover:border-white/30 focus-within:border-accent focus-within:bg-white/[0.09] focus-within:ring-4 focus-within:ring-accent/20 has-[:user-invalid]:border-red-400/80 group-data-[submitted=true]/form:has-[:invalid]:border-red-400/80">
        <input
          name={`${name}_code`}
          required
          inputMode="tel"
          autoComplete="tel-country-code"
          placeholder="+1"
          pattern="\+?[0-9]{1,4}"
          title="Country code, e.g. +971"
          aria-label={`${label} country code`}
          className="h-full w-16 shrink-0 bg-transparent pl-4 text-base text-white outline-none placeholder:text-white/35 sm:text-[0.95rem]"
        />
        <span aria-hidden className="h-5 w-px bg-white/20" />
        <input
          name={name}
          type="tel"
          required
          autoComplete="tel-national"
          placeholder="Number"
          pattern="[0-9 ]{5,15}"
          title="Digits only, 5 to 15 long"
          className="h-full min-w-0 flex-1 bg-transparent px-3.5 text-base text-white outline-none placeholder:text-white/35 sm:text-[0.95rem]"
        />
      </span>
    </Field>
  );
}

// Radio or checkbox drawn as a pill: the native input stays in place (invisible) for the keyboard,
// screen readers and validation; the pill and its tick follow its state.
function Choice({
  type,
  name,
  value,
  checked,
  onChange,
  required,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  value?: string;
  checked?: boolean;
  onChange?: () => void;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="relative inline-flex cursor-pointer">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        className="peer absolute inset-0 cursor-pointer opacity-0"
      />
      <span className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] py-2 pl-3 pr-4 text-sm font-medium text-white/80 transition-colors peer-hover:border-white/35 peer-checked:border-accent peer-checked:bg-accent/15 peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-accent/25 group-data-[submitted=true]/form:peer-invalid:border-red-400/80">
        <span
          className={`grid size-5 shrink-0 place-items-center border border-white/30 text-transparent transition-colors [input:checked+span>&]:border-accent [input:checked+span>&]:bg-accent [input:checked+span>&]:text-white ${type === "radio" ? "rounded-full" : "rounded-md"}`}
        >
          <Check className="size-3" strokeWidth={3.5} />
        </span>
        {children}
      </span>
    </label>
  );
}

// A numbered form section: title and helper on the left, fields on the right (stacked on small screens).
function Section({ step, title, hint, children }: { step: number; title: string; hint?: string; children: ReactNode }) {
  const id = `signup-section-${step}`;
  return (
    <section
      aria-labelledby={id}
      className="grid gap-x-12 gap-y-5 border-t border-white/10 py-8 first:border-t-0 first:pt-0 md:py-10 lg:grid-cols-[15rem_minmax(0,1fr)]"
    >
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-accent">{String(step).padStart(2, "0")}</p>
        <h2 id={id} className="mt-2 scroll-mt-32 text-xl font-semibold leading-snug tracking-tight">
          {title}
        </h2>
        {hint && <p className="mt-2 text-sm leading-relaxed text-white/60">{hint}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

const SubLabel = ({ children }: { children: ReactNode }) => (
  <p className="mb-3 mt-7 text-[0.8rem] font-semibold tracking-wide text-white/75">{children}</p>
);
const FieldError = ({ children }: { children: ReactNode }) => (
  <p role="alert" className="mt-3 flex items-center gap-2 text-sm font-medium text-red-300">
    <CircleAlert className="size-4 shrink-0" /> {children}
  </p>
);

const grid = "grid gap-x-4 gap-y-5 sm:grid-cols-6";
const choices = "flex flex-wrap gap-2.5";

// Title, name, email and phones for one person; `prefix` keeps the field names apart.
function Person({ prefix }: { prefix: string }) {
  return (
    <div className={`mt-6 ${grid}`}>
      <Select label="Title" name={`${prefix}_title`} options={titles} className="sm:col-span-2" />
      <Text label="First name" name={`${prefix}_first_name`} className="sm:col-span-2" />
      <Text label="Last name" name={`${prefix}_last_name`} className="sm:col-span-2" />
      <Text label="Email" name={`${prefix}_working_email`} type="email" placeholder="name@agency.com" className="sm:col-span-6" />
      <Phone label="Mobile number" name={`${prefix}_mobile_number`} className="sm:col-span-3" />
      <Phone label="Office number" name={`${prefix}_office_number`} className="sm:col-span-3" />
    </div>
  );
}

export default function Signup() {
  const top = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState<string[]>([]); // ticked accreditations
  const [noAccreditation, setNoAccreditation] = useState(false);
  const [address, setAddress] = useState<"same" | "different" | "">("");
  const [poc, setPoc] = useState<"same" | "different" | "">("");
  const [finance, setFinance] = useState<"admin" | "poc" | "different">("admin");
  const [doc, setDoc] = useState<File | null>(null);
  const [docError, setDocError] = useState("");
  const [source, setSource] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = sent ? "Registration received — Flying Carpet" : "Sign up — Flying Carpet";
  }, [sent]);

  const pickDoc = (file: File | undefined) => {
    if (!file) return;
    if (file.type !== "application/pdf" || file.size > MAX_DOC_BYTES) {
      setDocError("Only PDF files up to 500KB are allowed.");
      return;
    }
    setDocError("");
    setDoc(file);
  };

  const accreditationMissing = submitted && !checked.length && !noAccreditation;
  const docMissing = submitted && !doc && !docError;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const form = e.currentTarget;
    const noAccreditationPicked = !checked.length && !noAccreditation;
    const firstInvalid = form.querySelector<HTMLElement>("input:invalid, select:invalid");
    if (firstInvalid || noAccreditationPicked || !doc) {
      setError("Please complete the highlighted fields before submitting.");
      const target =
        firstInvalid ?? document.getElementById(noAccreditationPicked ? "signup-section-2" : "signup-section-6");
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid?.focus({ preventScroll: true });
      return;
    }
    setError("");
    // TODO: send the form to the registration API once its endpoint is confirmed. Nothing is submitted yet.
    setSent(true);
    top.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative px-4 pb-8 pt-28 md:px-8 md:pt-40">
      <div ref={top} className="mx-auto max-w-7xl scroll-mt-28">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" /> Back to home
        </a>

        {sent ? (
          <div className="glass-strong max-w-2xl rounded-[2.5rem] p-7 md:p-12">
            <span className="grid size-12 place-items-center rounded-full bg-accent">
              <Check className="size-6" />
            </span>
            <h1 className="mt-6 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tighter">
              Thank you for registering
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              We have your agency details. Our team will review them and get back to you by email.
            </p>
          </div>
        ) : (
          <>
            <div className="grid items-end gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
              <div>
                <Eyebrow>Sign up</Eyebrow>
                <SplitHeading
                  text="Register with us now"
                  className="text-[clamp(2.2rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-tighter"
                />
                <Reveal delay={0.15}>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                    Get the benefits of our global airline and hotel partners, with agency pricing like never before.
                  </p>
                </Reveal>
              </div>
              <div className="glass rounded-3xl p-5 text-sm leading-relaxed text-white/75">
                <p className="flex items-start gap-3">
                  <FileText className="mt-0.5 size-4 shrink-0 text-accent" />
                  Have a PDF of your business registration or government ID ready (up to 500KB).
                </p>
                <p className="mt-3 flex items-start gap-3 border-t border-white/10 pt-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>
                    Questions about registration?{" "}
                    <a
                      href="mailto:hello@flyingcarpet.travel"
                      className="font-semibold text-white underline-offset-4 hover:underline"
                    >
                      hello@flyingcarpet.travel
                    </a>
                  </span>
                </p>
              </div>
            </div>

            <form
              onSubmit={submit}
              noValidate
              data-submitted={submitted}
              className="group/form glass mt-10 rounded-[1.75rem] p-5 sm:p-8 lg:p-10"
            >
              <Section step={1} title="Primary contact" hint="The person registering the agency. All fields are required.">
                <div className={grid}>
                  <Select label="Title" name="title" options={titles} className="sm:col-span-2" />
                  <Text label="First name" name="first_name" autoComplete="given-name" className="sm:col-span-2" />
                  <Text label="Last name" name="last_name" autoComplete="family-name" className="sm:col-span-2" />
                  <Text label="Agency name" name="agency_name" autoComplete="organization" className="sm:col-span-3" />
                  <Text label="Email" name="email" type="email" autoComplete="email" placeholder="name@agency.com" className="sm:col-span-3" />
                  <Phone label="Phone number" name="phone_number" className="sm:col-span-3" />
                  <Phone label="Office number" name="office_number" className="sm:col-span-3" />
                  <Text label="Street address" name="street_address" autoComplete="street-address" className="sm:col-span-6" />
                  <Select label="Country" name="country" options={countries} placeholder="Select country" className="sm:col-span-3" />
                  <Text label="State" name="state" maxLength={20} autoComplete="address-level1" className="sm:col-span-3" />
                  <Text label="City" name="city" maxLength={30} autoComplete="address-level2" className="sm:col-span-3" />
                  <Text label="Postal / zip code" name="zipcode" autoComplete="postal-code" className="sm:col-span-3" />
                </div>
                <SubLabel>Contacting from</SubLabel>
                <div role="radiogroup" aria-label="Contacting from" className={choices}>
                  <Choice type="radio" name="contacting_from" value="Main Office" required>
                    Main office
                  </Choice>
                  <Choice type="radio" name="contacting_from" value="Branch Office" required>
                    Branch office
                  </Choice>
                </div>
              </Section>

              <Section step={2} title="Accreditation" hint="Select every number you hold and enter it. At least one is required.">
                <div className={choices}>
                  {accreditations.map((a) => {
                    const on = checked.includes(a.id);
                    return (
                      <Choice
                        key={a.id}
                        type="checkbox"
                        name={`${a.id}_checked`}
                        checked={on}
                        onChange={() => {
                          setNoAccreditation(false);
                          setChecked((c) => (on ? c.filter((x) => x !== a.id) : [...c, a.id]));
                        }}
                      >
                        {a.label}
                      </Choice>
                    );
                  })}
                  <Choice
                    type="checkbox"
                    name="no_accreditation"
                    checked={noAccreditation}
                    onChange={() => {
                      setChecked([]);
                      setNoAccreditation((v) => !v);
                    }}
                  >
                    I don't have one
                  </Choice>
                </div>
                {checked.length > 0 && (
                  <div className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2">
                    {accreditations
                      .filter((a) => checked.includes(a.id))
                      .map((a) => (
                        <Text
                          key={a.id}
                          label={a.label}
                          name={a.id}
                          placeholder={a.placeholder}
                          className={a.id === "others" ? "sm:col-span-2" : ""}
                        />
                      ))}
                  </div>
                )}
                {accreditationMissing && (
                  <FieldError>Select at least one accreditation, or “I don't have one”.</FieldError>
                )}
              </Section>

              <Section step={3} title="Company details" hint="The legal entity and who signs on its behalf.">
                <div className={grid}>
                  <Text label="Legal company name" name="legal_company_name" className="sm:col-span-6" />
                  <Text label="Signatory name" name="signatory_name" className="sm:col-span-3" />
                  <Text label="Signatory designation" name="signatory_designation" className="sm:col-span-3" />
                </div>
                <SubLabel>Registered company address</SubLabel>
                <div role="radiogroup" aria-label="Registered company address" className={choices}>
                  <Choice type="radio" name="companyAddress" value="same" required checked={address === "same"} onChange={() => setAddress("same")}>
                    Same as primary contact
                  </Choice>
                  <Choice type="radio" name="companyAddress" value="different" required checked={address === "different"} onChange={() => setAddress("different")}>
                    A different address
                  </Choice>
                </div>
                {address === "different" && (
                  <div className={`mt-6 ${grid}`}>
                    <Text label="Street address" name="company_street_address" className="sm:col-span-6" />
                    <Select label="Country" name="company_country" options={countries} placeholder="Select country" className="sm:col-span-3" />
                    <Text label="State" name="company_state" maxLength={20} className="sm:col-span-3" />
                    <Text label="City" name="company_city" maxLength={30} className="sm:col-span-3" />
                    <Text label="Postal / zip code" name="company_zip_code" className="sm:col-span-3" />
                  </div>
                )}
              </Section>

              <Section step={4} title="Point of contact" hint="Who we should reach for day-to-day matters.">
                <div role="radiogroup" aria-label="Point of contact" className={choices}>
                  <Choice type="radio" name="pocStatus" value="same" required checked={poc === "same"} onChange={() => setPoc("same")}>
                    Same as primary contact
                  </Choice>
                  <Choice type="radio" name="pocStatus" value="different" required checked={poc === "different"} onChange={() => setPoc("different")}>
                    Someone else
                  </Choice>
                </div>
                {poc === "different" && <Person prefix="poc" />}
              </Section>

              <Section step={5} title="Financial controller" hint="Who handles payments and invoices.">
                <div role="radiogroup" aria-label="Financial controller" className={choices}>
                  <Choice type="radio" name="financeStatus" value="admin" checked={finance === "admin"} onChange={() => setFinance("admin")}>
                    Same as primary contact
                  </Choice>
                  <Choice type="radio" name="financeStatus" value="poc" checked={finance === "poc"} onChange={() => setFinance("poc")}>
                    Same as point of contact
                  </Choice>
                  <Choice type="radio" name="financeStatus" value="different" checked={finance === "different"} onChange={() => setFinance("different")}>
                    Someone else
                  </Choice>
                </div>
                {finance === "different" && <Person prefix="finance" />}
              </Section>

              <Section
                step={6}
                title="Business verification"
                hint="Upload your business, commercial or tax registration, or a government ID."
              >
                {doc ? (
                  <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/15 ring-1 ring-accent/30">
                      <FileText className="size-5 text-accent" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{doc.name}</p>
                      <p className="text-xs text-white/55">PDF · {Math.max(1, Math.round(doc.size / 1024))} KB</p>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove document"
                      onClick={() => setDoc(null)}
                      className="grid size-9 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      pickDoc(e.dataTransfer.files[0]);
                    }}
                    className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl border border-dashed bg-white/[0.04] px-6 py-9 text-center transition-colors hover:border-accent hover:bg-white/[0.07] focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/20 ${docMissing || docError ? "border-red-400/80" : "border-white/25"}`}
                  >
                    <span className="mb-2 grid size-11 place-items-center rounded-full bg-accent/15 ring-1 ring-accent/30">
                      <Upload className="size-5 text-accent" />
                    </span>
                    <span className="text-sm font-semibold">
                      Drop your PDF here, or <span className="text-accent">browse</span>
                    </span>
                    <span className="text-xs text-white/55">PDF only, up to 500KB</span>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="sr-only"
                      onChange={(e) => {
                        pickDoc(e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                  </label>
                )}
                {docError && <FieldError>{docError}</FieldError>}
                {docMissing && <FieldError>A business verification document is required.</FieldError>}
              </Section>

              <Section step={7} title="How did you hear about us?">
                <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                  <SelectBox
                    name="agency_source"
                    options={sources}
                    placeholder="Select an option"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    aria-label="How did you hear about us?"
                  />
                  {sourcesWithDetails.includes(source) && (
                    <input
                      name="agency_source_details"
                      maxLength={20}
                      placeholder="Tell us where (optional)"
                      aria-label="Details"
                      className={control}
                    />
                  )}
                </div>
              </Section>

              <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-white/10 pt-8">
                <div className="min-w-0">
                  <Choice type="checkbox" name="terms" required>
                    <span>
                      I agree to the{" "}
                      <a
                        href="https://www.flyingcarpet.travel/terms-of-service"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative font-semibold text-white underline underline-offset-4"
                      >
                        terms and conditions
                      </a>{" "}
                      of Flying Carpet
                    </span>
                  </Choice>
                  {error && <FieldError>{error}</FieldError>}
                </div>
                <button
                  type="submit"
                  className="group inline-flex h-13 w-full items-center justify-center gap-3 rounded-full bg-accent pl-8 pr-2.5 text-[0.95rem] font-bold tracking-tight text-white shadow-[0_14px_36px_-12px_rgb(232_101_37/0.9)] transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 sm:w-auto"
                >
                  Submit registration
                  <span className="grid size-8 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="size-4" />
                  </span>
                </button>
              </div>
            </form>
          </>
        )}

        <section className="pt-24 md:pt-32">
          <SplitHeading
            text="Business Benefits"
            className="text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.02] tracking-tighter"
          />
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              What you get as a Flying Carpet agency partner.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <div className="group sheen relative block aspect-4/3 overflow-hidden rounded-4xl sm:aspect-4/5">
                  <img
                    src={b.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand/70 via-transparent to-transparent" />
                  {/* Same caption as the home page's "Partner with us" cards: label, headline figure, unit. */}
                  <div className="glass-strong absolute inset-x-4 bottom-4 z-2 flex items-end justify-between rounded-3xl px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-white/70">{b.title}</p>
                      <p className="text-[clamp(1.9rem,3vw,2.25rem)] font-semibold tracking-tighter">{b.stat}</p>
                    </div>
                    <p className="pb-1 text-sm font-semibold text-white/80">{b.unit}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
