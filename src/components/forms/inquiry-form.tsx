"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { inquirySchema, INQUIRY_ERRORS, type Inquiry } from "@/lib/inquiry-schema";
import { useLang } from "@/lib/lang-context";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button";

const T = {
  typeLabel: { en: "I would like to", es: "Me gustaría" },
  typeInquiry: { en: "Ask a question", es: "Hacer una consulta" },
  typeTour: { en: "Book a campus tour", es: "Agendar una visita" },
  parentName: { en: "Parent or guardian name", es: "Nombre del padre, madre o tutor" },
  email: { en: "Email", es: "Correo electrónico" },
  phone: { en: "Phone or WhatsApp (optional)", es: "Teléfono o WhatsApp (opcional)" },
  childGrade: { en: "Child's grade or age", es: "Grado o edad de tu hijo o hija" },
  childGradeHint: { en: "For example: KG4, Grade 7, or 5 years old", es: "Por ejemplo: KG4, 7.º grado o 5 años" },
  startDate: { en: "Desired start (optional)", es: "Fecha de ingreso deseada (opcional)" },
  startHint: { en: "For example: August 2027", es: "Por ejemplo: agosto de 2027" },
  nationality: { en: "Nationality (optional)", es: "Nacionalidad (opcional)" },
  currentSchool: { en: "Where does your child study now?", es: "¿Dónde estudia tu hijo o hija ahora?" },
  schoolNone: { en: "Not in school yet", es: "Aún no va al colegio" },
  schoolFeb: { en: "Bolivian school, Feb–Nov calendar", es: "Colegio boliviano, calendario feb–nov" },
  schoolAug: { en: "Bolivian school, Aug–Jun calendar", es: "Colegio boliviano, calendario ago–jun" },
  schoolAbroad: { en: "A school outside Bolivia", es: "Un colegio fuera de Bolivia" },
  preferredLanguage: { en: "Reply in", es: "Responder en" },
  source: { en: "How did you hear about ACS? (optional)", es: "¿Cómo conociste ACS? (opcional)" },
  message: { en: "Anything else we should know? (optional)", es: "¿Algo más que debamos saber? (opcional)" },
  consent: {
    en: "I agree that ACS may use these details to reply to my inquiry.",
    es: "Acepto que ACS use estos datos para responder a mi consulta.",
  },
  submit: { en: "Send", es: "Enviar" },
  sending: { en: "Sending…", es: "Enviando…" },
  successTitle: { en: "Thank you. We'll be in touch soon.", es: "Gracias. Te contactaremos pronto." },
  successText: {
    en: "Our admissions team usually replies within two working days. In the meantime you can start an application on PulsEDU.",
    es: "Nuestro equipo de admisiones suele responder en dos días hábiles. Mientras tanto, puedes iniciar la postulación en PulsEDU.",
  },
  startApp: { en: "Start an application", es: "Iniciar postulación" },
  failed: {
    en: `We couldn't send your message. Please try again, or write to ${SITE.email}.`,
    es: `No pudimos enviar tu mensaje. Inténtalo de nuevo o escribe a ${SITE.email}.`,
  },
  required: { en: "Required", es: "Obligatorio" },
};

const field =
  "mt-2 block min-h-12 w-full rounded-xl bg-white px-4 py-3 text-[0.97rem] text-charcoal ring-1 ring-inset ring-forest-800/15 outline-none transition placeholder:text-mist/70 focus-visible:ring-2 focus-visible:ring-gold-500 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600";

export function InquiryForm({ defaultType = "inquiry" }: { defaultType?: "inquiry" | "tour" }) {
  const { lang, tr } = useLang();
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { type: defaultType, preferredLanguage: lang, currentSchool: "", website: "" },
  });

  const err = (name: keyof Inquiry) => {
    const key = errors[name]?.message as keyof typeof INQUIRY_ERRORS | undefined;
    return key && INQUIRY_ERRORS[key] ? tr(INQUIRY_ERRORS[key]) : undefined;
  };

  const onSubmit = async (data: Inquiry) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" aria-live="polite" className="rounded-[1.75rem] bg-white p-8 text-center shadow-soft ring-1 ring-forest-800/8 sm:p-12">
        <CheckCircle2 aria-hidden className="mx-auto h-12 w-12 text-cougar-500" />
        <h3 className="mt-5 text-3xl text-forest-900">{tr(T.successTitle)}</h3>
        <p className="mx-auto mt-3 max-w-md text-mist">{tr(T.successText)}</p>
        <a href={SITE.portals.apply} target="_blank" rel="noopener noreferrer" className={buttonClass("gold", "md", "mt-7")}>
          {tr(T.startApp)}
        </a>
      </div>
    );
  }

  const Err = ({ name }: { name: keyof Inquiry }) =>
    err(name) ? (
      <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-red-700">
        {err(name)}
      </p>
    ) : null;

  const a11y = (name: keyof Inquiry) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-forest-800/8 sm:p-10"
    >
      <fieldset>
        <legend className="text-sm font-semibold text-forest-900">{tr(T.typeLabel)}</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-cream p-1.5">
          {(["inquiry", "tour"] as const).map((t) => (
            <label key={t} className="relative cursor-pointer">
              <input type="radio" value={t} {...register("type")} className="peer sr-only" />
              <span className="flex min-h-11 items-center justify-center rounded-xl px-3 text-center text-sm font-semibold text-forest-800 transition peer-checked:bg-forest-800 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-gold-500">
                {tr(t === "inquiry" ? T.typeInquiry : T.typeTour)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="parentName" className="text-sm font-semibold text-forest-900">
            {tr(T.parentName)} <span className="text-red-700" aria-hidden>*</span>
          </label>
          <input id="parentName" autoComplete="name" className={field} {...register("parentName")} {...a11y("parentName")} aria-required />
          <Err name="parentName" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-forest-900">
            {tr(T.email)} <span className="text-red-700" aria-hidden>*</span>
          </label>
          <input id="email" type="email" autoComplete="email" className={field} {...register("email")} {...a11y("email")} aria-required />
          <Err name="email" />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-forest-900">{tr(T.phone)}</label>
          <input id="phone" type="tel" autoComplete="tel" className={field} {...register("phone")} {...a11y("phone")} />
          <Err name="phone" />
        </div>
        <div>
          <label htmlFor="childGrade" className="text-sm font-semibold text-forest-900">
            {tr(T.childGrade)} <span className="text-red-700" aria-hidden>*</span>
          </label>
          <input id="childGrade" placeholder={tr(T.childGradeHint)} className={field} {...register("childGrade")} {...a11y("childGrade")} aria-required />
          <Err name="childGrade" />
        </div>
        <div>
          <label htmlFor="startDate" className="text-sm font-semibold text-forest-900">{tr(T.startDate)}</label>
          <input id="startDate" placeholder={tr(T.startHint)} className={field} {...register("startDate")} {...a11y("startDate")} />
          <Err name="startDate" />
        </div>
        <div>
          <label htmlFor="currentSchool" className="text-sm font-semibold text-forest-900">{tr(T.currentSchool)}</label>
          <select id="currentSchool" className={cn(field, "appearance-none")} {...register("currentSchool")}>
            <option value="">—</option>
            <option value="none">{tr(T.schoolNone)}</option>
            <option value="bolivia-feb">{tr(T.schoolFeb)}</option>
            <option value="bolivia-aug">{tr(T.schoolAug)}</option>
            <option value="abroad">{tr(T.schoolAbroad)}</option>
          </select>
        </div>
        <div>
          <label htmlFor="nationality" className="text-sm font-semibold text-forest-900">{tr(T.nationality)}</label>
          <input id="nationality" className={field} {...register("nationality")} {...a11y("nationality")} />
        </div>
        <div>
          <label htmlFor="preferredLanguage" className="text-sm font-semibold text-forest-900">{tr(T.preferredLanguage)}</label>
          <select id="preferredLanguage" className={cn(field, "appearance-none")} {...register("preferredLanguage")}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div>
          <label htmlFor="source" className="text-sm font-semibold text-forest-900">{tr(T.source)}</label>
          <input id="source" className={field} {...register("source")} {...a11y("source")} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-semibold text-forest-900">{tr(T.message)}</label>
          <textarea id="message" rows={4} className={field} {...register("message")} {...a11y("message")} />
          <Err name="message" />
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-charcoal">
          <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-forest-800" {...register("consent")} {...a11y("consent")} />
          <span>{tr(T.consent)}</span>
        </label>
        <Err name="consent" />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={isSubmitting} className={buttonClass("gold", "lg")}>
          {isSubmitting && <Loader2 aria-hidden className="h-5 w-5 animate-spin" />}
          {tr(isSubmitting ? T.sending : T.submit)}
        </button>
        <p aria-live="assertive" className="text-sm font-medium text-red-700">
          {status === "error" ? tr(T.failed) : ""}
        </p>
      </div>
    </form>
  );
}
