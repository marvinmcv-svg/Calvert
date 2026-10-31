import { l, type L } from "@/lib/i18n-types";
import type { MediaKey } from "./media";

export type DatePrecision = "day" | "month" | "year";

export type NewsPost = {
  slug: string;
  date: string;
  precision: DatePrecision;
  category: L;
  title: L;
  excerpt: L;
  body: L[];
  photo: MediaKey;
  gallery?: MediaKey[];
};

/*
  News. Each story is built only from verified facts. Exact publication dates are not
  always known, so `precision` controls how much of the date is shown.
*/
export const NEWS: NewsPost[] = [
  {
    slug: "admissions-2027-28-open",
    date: "2026-10-01",
    precision: "day",
    category: l("Admissions", "Admisiones"),
    title: l("Admissions for 2027–28 are open", "Abrimos las admisiones 2027–28"),
    excerpt: l(
      "Rolling admissions opened on 1 October. Here is how to apply, step by step.",
      "Las admisiones abiertas comenzaron el 1 de octubre. Así puedes postular, paso a paso.",
    ),
    body: [
      l(
        "ACS admissions are rolling and open on 1 October of the year before entry, so families can now apply for the 2027–28 school year.",
        "Las admisiones de ACS son continuas y abren el 1 de octubre del año anterior al ingreso, así que las familias ya pueden postular para el año escolar 2027–28.",
      ),
      l(
        "Applications run through PulsEDU at acs.pulsedu.com. Create a parent account first, then a student application. KG3 and KG4 have open admission, subject to a developmental readiness screening, and no English is required for Early Childhood.",
        "Las postulaciones se hacen en PulsEDU, en acs.pulsedu.com. Primero crea una cuenta de padre o madre y luego la postulación del estudiante. KG3 y KG4 tienen admisión abierta, sujeta a una evaluación de madurez del desarrollo, y no se requiere inglés para Educación Inicial.",
      ),
      l(
        "Once every document and placement test is complete, families usually receive a decision within 2 to 5 working days.",
        "Con todos los documentos y pruebas de ubicación completos, las familias suelen recibir una decisión en 2 a 5 días hábiles.",
      ),
    ],
    photo: "campusCourtyard",
  },
  {
    slug: "open-house-november-2025",
    date: "2025-11-22",
    precision: "day",
    category: l("Events", "Eventos"),
    title: l("Open House: families on campus", "Open House: familias en el campus"),
    excerpt: l(
      "On 22 November 2025, families toured the campus from 10:00 to 12:00 and met our teachers.",
      "El 22 de noviembre de 2025, las familias recorrieron el campus de 10:00 a 12:00 y conocieron a nuestros docentes.",
    ),
    body: [
      l(
        "Our Open House welcomed prospective families from 10:00 to 12:00 to get to know our facilities, our academic program, our teachers, and our mission, vision and values.",
        "Nuestro Open House recibió a familias interesadas de 10:00 a 12:00 para conocer nuestras instalaciones, nuestro programa académico, a nuestros docentes y nuestra misión, visión y valores.",
      ),
      l(
        "Families learned about our program from KG3 to Grade 12, university and career guidance, extracurricular activities, social and emotional learning, and our accreditation.",
        "Las familias conocieron nuestro programa de KG3 a 12.º grado, la orientación universitaria y vocacional, las actividades extracurriculares, el aprendizaje socioemocional y nuestra acreditación.",
      ),
    ],
    photo: "campusPlayground",
  },
  {
    slug: "class-of-2025-university-admissions",
    date: "2025-06-01",
    precision: "year",
    category: l("University counseling", "Orientación universitaria"),
    title: l("Class of 2025: admitted around the world", "Promoción 2025: admitidos en todo el mundo"),
    excerpt: l(
      "Our 2025 graduates were admitted to universities in the United States, Europe and Latin America.",
      "Nuestros egresados 2025 fueron admitidos en universidades de Estados Unidos, Europa y América Latina.",
    ),
    body: [
      l(
        "The Class of 2025 was admitted to universities in the United States, Europe and Latin America. Like every ACS class, 100% of our graduates were admitted to their universities of choice.",
        "La promoción 2025 fue admitida en universidades de Estados Unidos, Europa y América Latina. Como cada promoción de ACS, el 100% de nuestros egresados fue admitido en la universidad de su elección.",
      ),
      l(
        "[[CONFIRM: the full list of universities for the Class of 2025.]]",
        "[[CONFIRM: la lista completa de universidades de la promoción 2025.]]",
      ),
    ],
    photo: "graduationClass",
    gallery: ["graduationFaculty", "graduatesTrio"],
  },
  {
    slug: "70-years-of-acs",
    date: "2025-08-01",
    precision: "year",
    category: l("70th anniversary", "70 aniversario"),
    title: l("70 years: honoring the past, embracing the future", "70 años: honrando el pasado, abrazando el futuro"),
    excerpt: l(
      "From 6 students and 1 teacher in 1955 to a community of hundreds of Cougars.",
      "De 6 estudiantes y 1 maestro en 1955 a una comunidad de cientos de Cougars.",
    ),
    body: [
      l(
        "In 1955, a group of parents opened a small American-English school in La Paz with 6 students and 1 teacher. Seventy years later, ACS celebrated its anniversary under the theme \"Honoring the Past, Embracing the Future\".",
        "En 1955, un grupo de padres abrió en La Paz un pequeño colegio americano en inglés con 6 estudiantes y 1 maestro. Setenta años después, ACS celebró su aniversario bajo el lema \"Honrando el pasado, abrazando el futuro\".",
      ),
      l(
        "The community marked the year with 70th anniversary merchandise, including a notebook and a Cougars sweatshirt.",
        "La comunidad celebró el año con productos del 70 aniversario, entre ellos un cuaderno y un buzo de los Cougars.",
      ),
    ],
    photo: "graduates70th",
    gallery: ["merchSweatshirt", "merchNotebook"],
  },
];

export function getPost(slug: string) {
  return NEWS.find((n) => n.slug === slug);
}

export type SchoolEvent = { date: string; title: L; place: L; href?: string };

/**
 * Upcoming events. The 2026–27 calendar could not be read during research,
 * so this list is empty until the school supplies dates. [[CONFIRM]]
 */
export const EVENTS: SchoolEvent[] = [];
