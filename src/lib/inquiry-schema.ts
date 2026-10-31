import { z } from "zod";

/** One schema shared by the inquiry form (client) and /api/inquiries (server). Messages are keys into INQUIRY_ERRORS. */
export const inquirySchema = z.object({
  type: z.enum(["inquiry", "tour"]),
  parentName: z.string().trim().min(2, "name").max(120, "name"),
  email: z.string().trim().email("email").max(160, "email"),
  phone: z.string().trim().max(40, "phone").optional().or(z.literal("")),
  childGrade: z.string().trim().min(1, "grade").max(60, "grade"),
  startDate: z.string().trim().max(60, "start").optional().or(z.literal("")),
  nationality: z.string().trim().max(80, "nationality").optional().or(z.literal("")),
  currentSchool: z.enum(["", "bolivia-feb", "bolivia-aug", "abroad", "none"]).optional(),
  preferredLanguage: z.enum(["en", "es"]),
  source: z.string().trim().max(120, "source").optional().or(z.literal("")),
  message: z.string().trim().max(2000, "message").optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "consent" }) }),
  /** Honeypot: real people never see or fill this. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type Inquiry = z.infer<typeof inquirySchema>;
export type StoredInquiry = Inquiry & { id: string; createdAt: string; lang: "en" | "es" };

export const INQUIRY_ERRORS = {
  name: { en: "Please enter your name.", es: "Escribe tu nombre." },
  email: { en: "Please enter a valid email.", es: "Escribe un correo válido." },
  phone: { en: "Please check the phone number.", es: "Revisa el número de teléfono." },
  grade: { en: "Tell us your child's grade or age.", es: "Indícanos el grado o la edad de tu hijo o hija." },
  start: { en: "Please shorten this answer.", es: "Acorta esta respuesta." },
  nationality: { en: "Please shorten this answer.", es: "Acorta esta respuesta." },
  source: { en: "Please shorten this answer.", es: "Acorta esta respuesta." },
  message: { en: "Please keep your message under 2,000 characters.", es: "Tu mensaje debe tener menos de 2.000 caracteres." },
  consent: { en: "Please accept so we can reply.", es: "Acepta para que podamos responderte." },
} as const;
