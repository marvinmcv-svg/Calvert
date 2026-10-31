import { l, type L } from "@/lib/i18n-types";

export type NavChild = { href: string; label: L; blurb: L };
export type Pillar = { id: string; href: string; homeAnchor: string; label: L; children: NavChild[] };

export const PILLARS: Pillar[] = [
  {
    id: "about",
    href: "/about",
    homeAnchor: "advantage",
    label: l("Discover ACS", "Conoce ACS"),
    children: [
      { href: "/about", label: l("Mission, vision and the 5 Cs", "Misión, visión y las 5 C"), blurb: l("Who we are and what we value.", "Quiénes somos y qué valoramos.") },
      { href: "/about/history", label: l("Our history", "Nuestra historia"), blurb: l("70 years, from 6 students to today.", "70 años, de 6 estudiantes a hoy.") },
      { href: "/about/leadership", label: l("Leadership and governance", "Liderazgo y gobierno"), blurb: l("The people who lead ACS.", "Las personas que lideran ACS.") },
      { href: "/about/accreditation", label: l("Accreditation", "Acreditación"), blurb: l("U.S. accredited, Bolivian recognized.", "Acreditado en EE. UU., reconocido en Bolivia.") },
      { href: "/about/safeguarding", label: l("Child protection", "Protección infantil"), blurb: l("How we keep every child safe.", "Cómo cuidamos a cada niño.") },
      { href: "/careers", label: l("Careers", "Trabaja con nosotros"), blurb: l("Teach and work at ACS.", "Enseña y trabaja en ACS.") },
    ],
  },
  {
    id: "admissions",
    href: "/admissions",
    homeAnchor: "admissions",
    label: l("Admissions", "Admisiones"),
    children: [
      { href: "/admissions", label: l("How to apply", "Cómo postular"), blurb: l("Steps, tools and FAQ.", "Pasos, herramientas y preguntas frecuentes.") },
      { href: "/admissions/visit", label: l("Book a tour", "Agenda una visita"), blurb: l("See ACS in person.", "Conoce ACS en persona.") },
      { href: "/admissions/transfer-guide", label: l("Transfer guide", "Guía de traslado"), blurb: l("From a Bolivian school or from abroad.", "Desde un colegio boliviano o del exterior.") },
      { href: "/admissions#calculator", label: l("Grade calculator", "Calculadora de grado"), blurb: l("Find your child's grade.", "Encuentra el grado de tu hijo o hija.") },
      { href: "/admissions#faq", label: l("Admissions FAQ", "Preguntas frecuentes"), blurb: l("Clear answers, in your language.", "Respuestas claras, en tu idioma.") },
    ],
  },
  {
    id: "academics",
    href: "/academics",
    homeAnchor: "journey",
    label: l("Learning", "Aprendizaje"),
    children: [
      { href: "/academics/early-childhood", label: l("Early Childhood", "Educación Inicial"), blurb: l("KG3 to KG5. No English required.", "KG3 a KG5. No se requiere inglés.") },
      { href: "/academics/elementary", label: l("Elementary", "Primaria"), blurb: l("Grades 1 to 5.", "De 1.º a 5.º grado.") },
      { href: "/academics/middle-school", label: l("Middle School", "Middle School"), blurb: l("Grades 6 to 8.", "De 6.º a 8.º grado.") },
      { href: "/academics/high-school", label: l("High School and diplomas", "High School y diplomas"), blurb: l("Grades 9 to 12. Two diplomas.", "De 9.º a 12.º. Dos diplomas.") },
      { href: "/academics/university-counseling", label: l("University counseling", "Orientación universitaria"), blurb: l("From La Paz to the world.", "De La Paz al mundo.") },
      { href: "/academics/learning-services", label: l("Learning Services", "Servicios de Aprendizaje"), blurb: l("ELL, learning support, counseling.", "ELL, apoyo al aprendizaje, consejería.") },
    ],
  },
  {
    id: "student-life",
    href: "/student-life",
    homeAnchor: "experience",
    label: l("Student Life", "Vida estudiantil"),
    children: [
      { href: "/student-life/campus", label: l("Campus and facilities", "Campus e instalaciones"), blurb: l("A historic hacienda in Calacoto.", "Una hacienda histórica en Calacoto.") },
      { href: "/student-life/athletics", label: l("Cougar Athletics", "Deporte Cougar"), blurb: l("Four sports, the Friendship Games.", "Cuatro deportes y los Friendship Games.") },
      { href: "/student-life/arts", label: l("Fine and Performing Arts", "Artes"), blurb: l("A 500-seat theater.", "Un teatro de 500 butacas.") },
      { href: "/student-life/activities", label: l("Clubs and activities", "Clubes y actividades"), blurb: l("Life after the bell.", "La vida después de clases.") },
      { href: "/news", label: l("News", "Noticias"), blurb: l("Stories from campus.", "Historias del campus.") },
    ],
  },
  {
    id: "community",
    href: "/community",
    homeAnchor: "life",
    label: l("Community", "Comunidad"),
    children: [
      { href: "/community/parents", label: l("Parents hub", "Portal de familias"), blurb: l("PowerSchool, handbooks, menus, dates.", "PowerSchool, manuales, menús, fechas.") },
      { href: "/community/alumni", label: l("Alumni: Cougar Connect", "Exalumnos: Cougar Connect"), blurb: l("70 years of Cougars.", "70 años de Cougars.") },
      { href: "/community#membership", label: l("Membership and Sports Complex", "Membresía y Complejo Deportivo"), blurb: l("Campus life for families.", "El campus para las familias.") },
      { href: "/contact", label: l("Contact", "Contacto"), blurb: l("Every office, one page.", "Todas las oficinas en una página.") },
    ],
  },
];
