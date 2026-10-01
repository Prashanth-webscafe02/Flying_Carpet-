import { ArrowLeft, ArrowRight, Check, FileText, Upload, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Eyebrow, Reveal, SplitHeading } from "../effects/motion";
import { LucidWave } from "../effects/LucidLine";

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
  { id: "arc_number", label: "ARC Number", placeholder: "Enter ARC Number" },
  { id: "iata_number", label: "IATA Number", placeholder: "Enter IATA Number" },
  { id: "clia_number", label: "CLIA Number", placeholder: "Enter CLIA Number" },
  {
    id: "others",
    label: "Other Number",
    placeholder: "Business (or) Commercial (or) Tax Registration (or) Government ID",
  },
];
const MAX_DOC_BYTES = 512_000;
const benefits = [
  { title: "Global network", img: "/images/global.webp" },
  { title: "Airline bookings", img: "/images/flights.webp" },
  { title: "Hotel bookings", img: "/images/hotel.webp" },
];

const control =
  "w-full rounded-xl border border-white/12 bg-white/[0.05] px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-white/40 focus:border-white/40";

function Field({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-white/70">{label}</span>
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
}: { label: string; name: string; type?: string; className?: string; maxLength?: number; autoComplete?: string }) {
  return (
    <Field label={label} className={className}>
      <input name={name} type={type} required className={control} {...rest} />
    </Field>
  );
}

function Select({ label, name, options, className }: { label: string; name: string; options: string[]; className?: string }) {
  return (
    <Field label={label} className={className}>
      <select name={name} required defaultValue="" className={control}>
        <option value="" disabled>
          Select
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </Field>
  );
}

// Dial code + number, e.g. "+971" and "501234567".
function Phone({ label, name }: { label: string; name: string }) {
  return (
    <Field label={label}>
      <span className="flex gap-2">
        <input
          name={`${name}_code`}
          required
          inputMode="tel"
          placeholder="+1"
          pattern="\+?[0-9]{1,4}"
          title="Country code, e.g. +971"
          aria-label={`${label} country code`}
          className={`${control} w-20 shrink-0`}
        />
        <input
          name={name}
          type="tel"
          required
          pattern="[0-9 ]{5,15}"
          title="Digits only, 5 to 15 long"
          className={control}
        />
      </span>
    </Field>
  );
}

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
    <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm font-medium text-white/85">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        className="size-4 accent-accent"
      />
      {children}
    </label>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-white/10 py-7 first:border-t-0 first:pt-0">
      <legend className="float-left mb-4 w-full text-lg font-semibold tracking-tight">
        {title} <span className="text-accent">*</span>
      </legend>
      {hint && <p className="clear-both -mt-2 mb-4 text-sm text-white/60">{hint}</p>}
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

const grid = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

// Title, name, email and phones for one person; `prefix` keeps the field names apart.
function Person({ prefix }: { prefix: string }) {
  return (
    <div className={`mt-5 ${grid}`}>
      <Select label="Title" name={`${prefix}_title`} options={titles} />
      <Text label="First Name" name={`${prefix}_first_name`} />
      <Text label="Last Name" name={`${prefix}_last_name`} />
      <Text label="Email" name={`${prefix}_working_email`} type="email" />
      <Phone label="Phone Number" name={`${prefix}_mobile_number`} />
      <Phone label="Office Number" name={`${prefix}_office_number`} />
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
  const [terms, setTerms] = useState(false);
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

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const problem = !checked.length && !noAccreditation
      ? "Add at least one accreditation number, or tick “I don't have one”."
      : !doc
        ? "Business Verification Document is required."
        : "";
    setError(problem);
    if (problem) return;
    // TODO: send the form to the registration API once its endpoint is confirmed. Nothing is submitted yet.
    setSent(true);
    top.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative px-4 pb-8 pt-32 md:px-8 md:pt-44">
      <LucidWave shape="swell" draw="intro" className="absolute inset-x-0 top-24 -z-1 hidden h-56 md:block" />
      <div ref={top} className="mx-auto max-w-7xl scroll-mt-28">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
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
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <Eyebrow>Sign up</Eyebrow>
                <SplitHeading
                  text="Register with us now"
                  className="text-[clamp(2.2rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-tighter"
                />
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-white/70 md:pt-14 md:text-right">
                For any queries regarding agency registration, please contact us at{" "}
                <a href="mailto:hello@flyingcarpet.travel" className="font-semibold text-white underline-offset-4 hover:underline">
                  hello@flyingcarpet.travel
                </a>
              </p>
            </div>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                Get the benefits of our global airline and hotel partners with the agency pricing like never before
              </p>
            </Reveal>

            <form onSubmit={submit} className="glass mt-10 rounded-[1.75rem] p-5 sm:p-8">
              <Section title="Primary Contact Details">
                <div className={grid}>
                  <Select label="Title" name="title" options={titles} />
                  <Text label="First Name" name="first_name" autoComplete="given-name" />
                  <Text label="Last Name" name="last_name" autoComplete="family-name" />
                  <Text label="Agency Name" name="agency_name" autoComplete="organization" />
                  <Text label="Email" name="email" type="email" autoComplete="email" />
                  <Text label="Street Address" name="street_address" autoComplete="street-address" />
                  <Select label="Country" name="country" options={countries} />
                  <Text label="State" name="state" maxLength={20} />
                  <Text label="City" name="city" maxLength={30} />
                  <Phone label="Phone Number" name="phone_number" />
                  <Phone label="Office Number" name="office_number" />
                  <Text label="Postal Code / Zip Code" name="zipcode" autoComplete="postal-code" />
                </div>
                <p className="mb-3 mt-6 text-sm font-medium text-white/70">
                  Contacting from <span className="text-accent">*</span>
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  <Choice type="radio" name="contacting_from" value="Main Office" required>
                    Main Office
                  </Choice>
                  <Choice type="radio" name="contacting_from" value="Branch Office" required>
                    Branch Office
                  </Choice>
                </div>
              </Section>

              <Section title="Accreditation" hint="Atleast one information is mandatory">
                <div className="grid gap-4 sm:grid-cols-2">
                  {accreditations.map((a) => {
                    const on = checked.includes(a.id);
                    return (
                      <div key={a.id}>
                        <Choice
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
                        {on && (
                          <input
                            name={a.id}
                            required
                            placeholder={a.placeholder}
                            aria-label={a.label}
                            className={`${control} mt-2`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4">
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
              </Section>

              <Section title="Additional Details">
                <div className={grid}>
                  <Text label="Legal Company Name" name="legal_company_name" />
                  <Text label="Signatory Name" name="signatory_name" />
                  <Text label="Signatory Designation" name="signatory_designation" />
                </div>
                <p className="mb-3 mt-6 text-sm font-medium text-white/70">Registered Company Address</p>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  <Choice type="radio" name="companyAddress" value="same" required checked={address === "same"} onChange={() => setAddress("same")}>
                    Same As Primary Contact Details
                  </Choice>
                  <Choice type="radio" name="companyAddress" value="different" required checked={address === "different"} onChange={() => setAddress("different")}>
                    Different Details
                  </Choice>
                </div>
                {address === "different" && (
                  <div className={`mt-5 ${grid}`}>
                    <Select label="Country" name="company_country" options={countries} />
                    <Text label="State" name="company_state" maxLength={20} />
                    <Text label="City" name="company_city" maxLength={30} />
                    <Text label="Street Address" name="company_street_address" />
                    <Text label="Zip Code" name="company_zip_code" />
                  </div>
                )}
              </Section>

              <Section title="Point of Contact Details">
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  <Choice type="radio" name="pocStatus" value="same" required checked={poc === "same"} onChange={() => setPoc("same")}>
                    Same As Primary Contact Details
                  </Choice>
                  <Choice type="radio" name="pocStatus" value="different" required checked={poc === "different"} onChange={() => setPoc("different")}>
                    Different Details
                  </Choice>
                </div>
                {poc === "different" && <Person prefix="poc" />}
              </Section>

              <Section title="Financial Controller Information">
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  <Choice type="radio" name="financeStatus" value="admin" checked={finance === "admin"} onChange={() => setFinance("admin")}>
                    Same As Primary Contact Details
                  </Choice>
                  <Choice type="radio" name="financeStatus" value="poc" checked={finance === "poc"} onChange={() => setFinance("poc")}>
                    Same as Above Point of contact information details
                  </Choice>
                  <Choice type="radio" name="financeStatus" value="different" checked={finance === "different"} onChange={() => setFinance("different")}>
                    Different Details
                  </Choice>
                </div>
                {finance === "different" && <Person prefix="finance" />}
              </Section>

              <Section
                title="Business Verification Documents"
                hint="Upload Business (or) Commercial (or) Tax Registration (or) Government ID"
              >
                {doc ? (
                  <div className="flex max-w-md items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.05] p-4">
                    <FileText className="size-6 shrink-0 text-accent" />
                    <p className="min-w-0 flex-1 truncate text-sm font-medium">{doc.name}</p>
                    <button
                      type="button"
                      aria-label="Remove document"
                      onClick={() => setDoc(null)}
                      className="grid size-8 place-items-center rounded-full transition-colors hover:bg-white/10"
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
                    className="flex max-w-md cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed border-white/25 bg-white/[0.04] px-6 py-8 text-sm font-medium text-white/80 transition-colors hover:border-white/50"
                  >
                    <Upload className="size-6 text-accent" />
                    Click to upload
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
                <p className="mt-2 text-xs text-white/55">Supported file format: PDF | Max file size: 500KB</p>
                {docError && <p className="mt-2 text-sm font-medium text-orange-300">{docError}</p>}
              </Section>

              <Section title="How did you hear about us?">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <select
                    name="agency_source"
                    required
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    aria-label="How did you hear about us?"
                    className={control}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {sources.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {sourcesWithDetails.includes(source) && (
                    <input
                      name="agency_source_details"
                      maxLength={20}
                      placeholder="Enter details"
                      aria-label="Details"
                      className={control}
                    />
                  )}
                </div>
              </Section>

              <div className="border-t border-white/10 pt-7">
                <Choice type="checkbox" name="terms" checked={terms} onChange={() => setTerms((t) => !t)}>
                  <span>
                    I agree to{" "}
                    <a
                      href="https://www.flyingcarpet.travel/terms-of-service"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-white underline underline-offset-4"
                    >
                      terms and conditions
                    </a>{" "}
                    of Flying Carpet
                  </span>
                </Choice>
                {error && (
                  <p role="alert" className="mt-4 text-sm font-medium text-orange-300">
                    {error}
                  </p>
                )}
                <div className="mt-5">
                  <button
                    type="submit"
                    disabled={!terms}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-accent py-2.5 pl-6 pr-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgb(232_101_37/0.9)] transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/45 disabled:shadow-none"
                  >
                    Submit
                    <span className="grid size-6 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-disabled:translate-x-0">
                      <ArrowRight className="size-3.5" />
                    </span>
                  </button>
                </div>
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
              Get the benefits of our global airline and hotel partners with the agency pricing like never before
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
                  <p className="glass-strong absolute inset-x-4 bottom-4 z-2 rounded-3xl px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em]">
                    {b.title}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
