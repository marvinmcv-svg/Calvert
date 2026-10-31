import { l, type L } from "@/lib/i18n-types";
import type { MediaKey } from "./media";

export const HERO_SLIDES: { photo: MediaKey; caption: L; position?: string }[] = [
  { photo: "campusPlayground", caption: l("Recess on the lawns of the former Patiño hacienda, Calacoto.", "Recreo en los jardines de la antigua hacienda Patiño, Calacoto."), position: "center 60%" },
  { photo: "graduationClass", caption: l("Graduation day: two diplomas, one community.", "Día de graduación: dos diplomas, una comunidad."), position: "center 35%" },
  { photo: "campusCourtyard", caption: l("The central courtyard, at the heart of a historic campus.", "El patio central, en el corazón de un campus histórico."), position: "center 55%" },
  { photo: "elementaryIpad", caption: l("Elementary: confident readers and curious thinkers.", "Primaria: lectores seguros y pensadores curiosos."), position: "center 40%" },
];

export type AdvantageTile = { photo: MediaKey; figure: string; label: L; line: L; href: string; position?: string };

/** The six bento tiles. Each figure is a verified fact. */
export const ADVANTAGE: AdvantageTile[] = [
  { photo: "graduationFaculty", figure: "2", label: l("Diplomas", "Diplomas"), line: l("A U.S. High School Diploma and the Bolivian Bachillerato.", "Diploma de secundaria de EE. UU. y bachillerato boliviano."), href: "/academics/high-school" },
  { photo: "campusLawn", figure: "1955", label: l("Founded by parents", "Fundado por padres"), line: l("70 years of trust, supported in part by the U.S. Department of State.", "70 años de confianza, con apoyo parcial del Departamento de Estado de EE. UU."), href: "/about/history" },
  { photo: "secondaryIpads", figure: "8–23", label: l("Students per class", "Estudiantes por clase"), line: l("Small classes where every learner is known.", "Clases pequeñas donde cada estudiante es conocido."), href: "/academics" },
  { photo: "aquatics", figure: "3,600 m", label: l("A campus like no other", "Un campus único"), line: l("Observatory, heated indoor pool and climbing wall at altitude.", "Observatorio, piscina techada temperada y muro de escalada en altura."), href: "/student-life/campus" },
  { photo: "earlyChildhood", figure: "KG3", label: l("No English required", "Sin inglés previo"), line: l("Open admission in Early Childhood, English from day one.", "Admisión abierta en Inicial, inglés desde el primer día."), href: "/academics/early-childhood" },
  { photo: "graduatesTrio", figure: "25+", label: l("Countries to apply to", "Países para postular"), line: l("College counseling with Cialfo and an annual College Fair.", "Orientación universitaria con Cialfo y una Feria Universitaria anual."), href: "/academics/university-counseling" },
];
