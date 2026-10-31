import { l, type L } from "@/lib/i18n-types";
import type { MediaKey } from "./media";

/*
  Verified school profile. Source: MASTER_PROMPT.md section 1 (research of 31 Oct 2026).
  Anything unverified carries a [[CONFIRM: ...]] marker, rendered as a visible chip
  until the school confirms it. See README "Real vs. sample content".
*/

export const IDENTITY = {
  tagline: l(
    "We offer U.S. based education in La Paz, fostering excellence and global citizenship.",
    "Ofrecemos educación estadounidense en La Paz, fomentando la excelencia y la ciudadanía global.",
  ),
  positioning: l(
    "Since 1955, ACS Calvert has been Bolivia's American school: a U.S.-accredited, English-language education from Early Childhood through Grade 12, with both U.S. and Bolivian diplomas, on a historic campus in Calacoto.",
    "Desde 1955, ACS Calvert es el colegio americano de Bolivia: educación en inglés con acreditación estadounidense desde Educación Inicial hasta 12.º grado, con diploma estadounidense y bachillerato boliviano, en un campus histórico de Calacoto.",
  ),
  mission: l(
    "We are a supportive community committed to one another's growth and well-being through transformative English-based American education. We empower learners to be a force for good in an ever-evolving world.",
    "Somos una comunidad solidaria comprometida con el crecimiento y el bienestar de cada uno a través de una educación americana transformadora en inglés. Empoderamos a nuestros estudiantes para ser una fuerza positiva en un mundo en constante cambio.",
  ),
  vision: l("A recognized model of excellence and innovation.", "Un modelo reconocido de excelencia e innovación."),
  anniversary: l("Honoring the Past, Embracing the Future", "Honrando el pasado, abrazando el futuro"),
};

export const FACTS = {
  type: l(
    "Private, non-profit, non-denominational, coeducational international day school.",
    "Colegio internacional privado, sin fines de lucro, laico, mixto y de jornada diurna.",
  ),
  governance: l(
    "Governed by a 10-member Board of Directors elected for two-year terms. Incorporated and tax-exempt in the U.S. and officially recognized by the Bolivian government.",
    "Gobernado por un Directorio de 10 miembros elegidos por períodos de dos años. Constituido y exento de impuestos en EE. UU. y reconocido oficialmente por el Estado boliviano.",
  ),
  support: l(
    "Supported in part by the U.S. Department of State, Office of Overseas Schools.",
    "Apoyado en parte por la Oficina de Colegios en el Exterior del Departamento de Estado de EE. UU.",
  ),
  language: l(
    "English is the language of instruction. Spanish and French are taught as world languages. There is no religious instruction.",
    "El inglés es el idioma de enseñanza. Se enseñan español y francés como lenguas. No se imparte instrucción religiosa.",
  ),
  diplomas: l(
    "Graduates earn a U.S. High School Diploma and the Bolivian Bachillerato (Ministry approval since 1968).",
    "Los egresados obtienen el diploma de secundaria estadounidense y el bachillerato boliviano (aprobación ministerial desde 1968).",
  ),
  enrollment: l(
    "573 students, KG3 to Grade 12, as of April 2026. 87% Bolivian, 13% foreign nationals.",
    "573 estudiantes, de KG3 a 12.º grado, a abril de 2026. 87% bolivianos, 13% extranjeros.",
  ),
};

export type Stat = { value: number; decimals?: number; prefix?: string; suffix: string; label: L; note: L };

/** Home page proof numbers. Real figures only, each with its "as of" note. */
export const HEADLINE_STATS: Stat[] = [
  { value: 70, suffix: "", label: l("Years of trust", "Años de confianza"), note: l("Founded by parents in 1955", "Fundado por padres de familia en 1955") },
  { value: 573, suffix: "", label: l("Students, KG3 to 12", "Estudiantes, de KG3 a 12.º"), note: l("As of April 2026", "A abril de 2026") },
  { value: 2, suffix: "", label: l("Diplomas, one path", "Diplomas, un solo camino"), note: l("U.S. diploma + Bolivian Bachillerato", "Diploma de EE. UU. + Bachillerato boliviano") },
  { value: 100, suffix: "%", label: l("Admitted to their universities of choice", "Admitidos en la universidad de su elección"), note: l("Our graduates, around the world", "Nuestros egresados, en todo el mundo") },
];

export type Value = { name: L; text: L };
export const CORE_VALUES: Value[] = [
  {
    name: l("Character", "Carácter"),
    text: l(
      "Maintaining the highest standards of moral virtue, and of personal and academic integrity.",
      "Mantener los más altos estándares de virtud moral y de integridad personal y académica.",
    ),
  },
  {
    name: l("Curiosity", "Curiosidad"),
    text: l(
      "Continually seeking knowledge, truth, beauty, and a deeper understanding of the world around you.",
      "Buscar continuamente el conocimiento, la verdad, la belleza y una comprensión más profunda del mundo que nos rodea.",
    ),
  },
  {
    name: l("Compassion", "Compasión"),
    text: l(
      "Giving of ourselves to one another, equally and without favor, so we all achieve our highest potential.",
      "Darnos unos a otros, por igual y sin favoritismos, para que todos alcancemos nuestro máximo potencial.",
    ),
  },
  {
    name: l("Community", "Comunidad"),
    text: l(
      "[[CONFIRM: official definition of Community. The current site repeats the Curiosity text.]]",
      "[[CONFIRM: definición oficial de Comunidad. El sitio actual repite el texto de Curiosidad.]]",
    ),
  },
  {
    name: l("Courageous Leadership", "Liderazgo valiente"),
    text: l(
      "Boldly inspiring others to model Character, Curiosity, Compassion, and Community, even in the face of adversity.",
      "Inspirar con audacia a otros a vivir el Carácter, la Curiosidad, la Compasión y la Comunidad, incluso ante la adversidad.",
    ),
  },
];

export const LEARNING_PRINCIPLES: L[] = [
  l("Every learner is unique.", "Cada estudiante es único."),
  l("Learning starts with what we already know.", "El aprendizaje parte de lo que ya sabemos."),
  l("Authentic, relevant learning matters.", "El aprendizaje auténtico y relevante importa."),
  l("Emotional well-being fuels learning.", "El bienestar emocional impulsa el aprendizaje."),
  l("Practice and feedback drive growth.", "La práctica y la retroalimentación impulsan el crecimiento."),
  l("Learners build their own understanding.", "Cada estudiante construye su propia comprensión."),
  l("Frequent reflection boosts learning.", "La reflexión frecuente potencia el aprendizaje."),
  l("Memory matters.", "La memoria importa."),
  l("Diverse collaboration strengthens learning.", "La colaboración diversa fortalece el aprendizaje."),
];
export const LEARNING_PRINCIPLES_CLOSING = l("How we learn shapes how we grow.", "Cómo aprendemos define cómo crecemos.");

export const COMMUNITY_COMMITMENT = [
  {
    title: l("A collaborative community", "Una comunidad colaborativa"),
    items: [
      l("Faculty and staff", "Docentes y personal"),
      l("Caregivers and families", "Cuidadores y familias"),
      l("Students as learners and leaders", "Estudiantes como aprendices y líderes"),
    ],
  },
  {
    title: l("A caring community", "Una comunidad que cuida"),
    items: [
      l(
        "Conduct and respect, including proactive education about harassment, bullying and discrimination",
        "Conducta y respeto, incluida la educación preventiva sobre acoso, bullying y discriminación",
      ),
      l("Well-being and safeguarding", "Bienestar y protección"),
      l("Open and respectful communication", "Comunicación abierta y respetuosa"),
      l("Active and respectful participation", "Participación activa y respetuosa"),
    ],
  },
];

export type Milestone = { year: string; title: L; text: L; photo?: MediaKey };
export const HISTORY: Milestone[] = [
  {
    year: "1955",
    title: l("Founded by parents", "Fundado por padres de familia"),
    text: l(
      "A group of parents opens a small American-English school with 6 students and 1 teacher. By the end of the year there are 23 students.",
      "Un grupo de padres abre un pequeño colegio americano en inglés con 6 estudiantes y 1 maestro. Al terminar el año ya son 23 estudiantes.",
    ),
  },
  {
    year: "1956",
    title: l("The Calvert curriculum", "El currículo Calvert"),
    text: l(
      "The school adopts the Calvert curriculum. It is where the name ACS Calvert comes from.",
      "El colegio adopta el currículo Calvert, origen del nombre ACS Calvert.",
    ),
  },
  {
    year: "1958",
    title: l("A first campus in Calacoto", "Un primer campus en Calacoto"),
    text: l(
      "Approved as the \"Cooperative Experimental School\", the school moves to Calle 13, Calacoto.",
      "Aprobado como \"Escuela Cooperativa Experimental\", el colegio se traslada a la Calle 13 de Calacoto.",
    ),
  },
  {
    year: "1960",
    title: l("A home of our own", "Un hogar propio"),
    text: l(
      "Enrollment passes 300 (316 students). The current campus, the former Patiño family hacienda, is purchased with USAID support.",
      "La matrícula supera los 300 (316 estudiantes). Se compra el campus actual, la antigua hacienda de la familia Patiño, con apoyo de USAID.",
    ),
    photo: "historyCampus",
  },
  {
    year: "1963",
    title: l("A master plan", "Un plan maestro"),
    text: l("A campus master plan is developed.", "Se desarrolla el plan maestro del campus."),
  },
  {
    year: "1964",
    title: l("Franklin D. Roosevelt School", "Colegio Franklin D. Roosevelt"),
    text: l(
      "The school is briefly renamed to encourage exchange with Lima, Peru.",
      "El colegio cambia brevemente de nombre para fomentar el intercambio con Lima, Perú.",
    ),
  },
  {
    year: "1965",
    title: l("American Cooperative School", "American Cooperative School"),
    text: l("The school adopts its lasting name.", "El colegio adopta su nombre definitivo."),
  },
  {
    year: "1968",
    title: l("Two diplomas", "Dos diplomas"),
    text: l(
      "Bolivian Ministry of Education approval and SACS accreditation. Graduates can now earn the Bolivian Bachillerato.",
      "Aprobación del Ministerio de Educación de Bolivia y acreditación SACS. Desde entonces, los egresados pueden obtener el bachillerato boliviano.",
    ),
  },
  {
    year: "1969",
    title: l("A visit from the Moon", "Una visita desde la Luna"),
    text: l("Astronaut Neil Armstrong visits ACS.", "El astronauta Neil Armstrong visita ACS."),
  },
  {
    year: "1970–73",
    title: l("Steady through change", "Firmes ante el cambio"),
    text: l(
      "The school remains open and committed to its families through years of political unrest.",
      "El colegio permanece abierto y comprometido con sus familias durante años de inestabilidad política.",
    ),
  },
  {
    year: "1977",
    title: l("Renewal", "Renovación"),
    text: l(
      "Superintendent Herm Penland launches major campus renovations.",
      "El superintendente Herm Penland impulsa grandes renovaciones del campus.",
    ),
  },
  {
    year: "1990s",
    title: l("Arts, service and well-being", "Arte, servicio y bienestar"),
    text: l(
      "Through the 1990s and 2000s, the arts, community service and student well-being grow.",
      "Durante los años noventa y dos mil crecen las artes, el servicio comunitario y el bienestar estudiantil.",
    ),
  },
  {
    year: "1996",
    title: l("Summit of First Ladies", "Cumbre de Primeras Damas"),
    text: l(
      "Hillary Rodham Clinton visits on 3 December 1996, during the Summit of First Ladies of the Americas.",
      "Hillary Rodham Clinton visita el colegio el 3 de diciembre de 1996, durante la Cumbre de Primeras Damas de las Américas.",
    ),
  },
  {
    year: "2014",
    title: l("Jaime Laredo in concert", "Jaime Laredo en concierto"),
    text: l(
      "Violinist Jaime Laredo performs at ACS on 8 August 2014.",
      "El violinista Jaime Laredo se presenta en ACS el 8 de agosto de 2014.",
    ),
  },
  {
    year: "2025",
    title: l("70 years: entering a new era", "70 años: una nueva era"),
    text: l(
      "ACS celebrates its 70th anniversary: Honoring the Past, Embracing the Future.",
      "ACS celebra su 70 aniversario: Honrando el pasado, abrazando el futuro.",
    ),
    photo: "graduates70th",
  },
];

export type Leader = { name: string; role: L; photo: MediaKey; email?: string; note?: L };
export const LEADERSHIP: Leader[] = [
  {
    name: "Kim Philot",
    role: l("Superintendent", "Superintendente"),
    photo: "teamPhilot",
    note: l(
      "[[CONFIRM: The current site lists Kim Philot as Superintendent; the welcome letter is signed by Andrew Crouse, Ph.D.]]",
      "[[CONFIRM: El sitio actual presenta a Kim Philot como Superintendente; la carta de bienvenida está firmada por Andrew Crouse, Ph.D.]]",
    ),
  },
  { name: "María Inarra", role: l("All-School Principal", "Directora General Académica"), photo: "teamInarra" },
  { name: "Dr. Ricardo Vieira", role: l("Secondary Assistant Principal", "Subdirector de Secundaria"), photo: "teamVieira" },
  { name: "Ben Drury", role: l("Elementary Assistant Principal", "Subdirector de Primaria"), photo: "teamDrury" },
  { name: "Ana María Urquidi", role: l("School Counselor, Elementary and Secondary", "Consejera Escolar, Primaria y Secundaria"), photo: "teamUrquidi" },
  { name: "Jared McGrath", role: l("College Counselor", "Consejero Universitario"), photo: "teamMcGrath" },
];

export const OTHER_CONTACTS = [
  { name: "Carolina Blanco", role: l("Secondary School Counselor", "Consejera de Secundaria"), email: "carolina.blanco@acslp.org" },
];

export const ACCREDITATION = {
  intro: l(
    "ACS is accredited in the United States and recognized by the Bolivian Ministry of Education, so every graduate leaves with two diplomas that open doors on both continents.",
    "ACS está acreditado en Estados Unidos y reconocido por el Ministerio de Educación de Bolivia, por lo que cada egresado obtiene dos diplomas que abren puertas en ambos continentes.",
  ),
  bodies: [
    {
      name: "NEASC",
      full: l("New England Association of Schools and Colleges", "New England Association of Schools and Colleges"),
      text: l(
        "U.S. accreditation. [[CONFIRM: current accreditation body and status. SACS accreditation dates from 1968.]]",
        "Acreditación estadounidense. [[CONFIRM: organismo y estado actual de la acreditación. La acreditación SACS data de 1968.]]",
      ),
    },
    {
      name: "Ministerio de Educación",
      full: l("Bolivian Ministry of Education", "Ministerio de Educación del Estado Plurinacional de Bolivia"),
      text: l(
        "Official recognition since 1968. Graduates receive the Bolivian Bachillerato.",
        "Reconocimiento oficial desde 1968. Los egresados reciben el bachillerato boliviano.",
      ),
    },
    {
      name: "AASSA",
      full: l("Association of American Schools in South America", "Asociación de Colegios Americanos de Sudamérica"),
      text: l(
        "Member school. [[CONFIRM: current membership; the site footer also shows AMISA.]]",
        "Colegio miembro. [[CONFIRM: membresía actual; el pie del sitio también muestra AMISA.]]",
      ),
    },
    {
      name: "U.S. Department of State",
      full: l("Office of Overseas Schools", "Oficina de Colegios en el Exterior"),
      text: l("Supports ACS in part.", "Apoya parcialmente a ACS."),
    },
  ],
};

export const CHILD_PROTECTION = {
  intro: l(
    "Every child at ACS deserves to be safe, known and cared for. Child protection is a published priority, and it shapes how we hire, train, supervise and communicate.",
    "Cada niño en ACS merece estar seguro, ser conocido y cuidado. La protección infantil es una prioridad pública y define cómo contratamos, capacitamos, supervisamos y nos comunicamos.",
  ),
  practices: [
    { title: l("Background checks", "Verificación de antecedentes"), text: l("Thorough screening for everyone who works with students.", "Revisión rigurosa de todas las personas que trabajan con estudiantes.") },
    { title: l("Training", "Capacitación"), text: l("Regular safeguarding training for faculty and staff.", "Capacitación periódica en protección para docentes y personal.") },
    { title: l("Supervision", "Supervisión"), text: l("Clear supervision of students throughout the school day.", "Supervisión clara de los estudiantes durante toda la jornada.") },
    { title: l("Professional boundaries", "Límites profesionales"), text: l("A code of conduct that sets clear boundaries between adults and students.", "Un código de conducta con límites claros entre adultos y estudiantes.") },
    { title: l("Reporting obligations", "Obligación de reportar"), text: l("Every adult knows how and when to report a concern.", "Cada adulto sabe cómo y cuándo reportar una preocupación.") },
    { title: l("Cyber-safety", "Seguridad digital"), text: l("Responsible Use Guidelines and education about life online.", "Lineamientos de uso responsable y educación sobre la vida en línea.") },
  ],
  law: l(
    "ACS complies with Bolivian law and follows international best practice in child protection.",
    "ACS cumple la legislación boliviana y sigue las buenas prácticas internacionales en protección infantil.",
  ),
};

export const NOTABLE_VISITS = [l("Neil Armstrong, 1969", "Neil Armstrong, 1969"), l("Hillary Rodham Clinton, 1996", "Hillary Rodham Clinton, 1996"), l("Jaime Laredo, 2014", "Jaime Laredo, 2014")];

export const UNIVERSITIES_HISTORIC = ["Harvard", "Yale", "Princeton", "Stanford", "MIT", "West Point"];
