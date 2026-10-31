import { l, type L } from "@/lib/i18n-types";

export const ADMISSIONS = {
  title: l("Your family's place at ACS starts here.", "El lugar de tu familia en ACS empieza aquí."),
  intro: l(
    "Rolling admissions open on 1 October of the year before entry. Most families hear back within 2 to 5 working days once every document and placement test is complete.",
    "Las admisiones abiertas comienzan el 1 de octubre del año anterior al ingreso. La mayoría de las familias recibe respuesta en 2 a 5 días hábiles, una vez completos todos los documentos y pruebas de ubicación.",
  ),
};

export type Step = { title: L; text: L; cta?: { label: L; href: string } };

export const STEPS: Step[] = [
  {
    title: l("Inquire", "Consulta"),
    text: l("Tell us about your child. Our admissions team will reply in your language.", "Cuéntanos sobre tu hijo o hija. El equipo de admisiones te responderá en tu idioma."),
    cta: { label: l("Send an inquiry", "Enviar consulta"), href: "/admissions#inquire" },
  },
  {
    title: l("Visit", "Visita"),
    text: l("Walk the campus, meet teachers and see a school day in action.", "Recorre el campus, conoce a los docentes y vive un día de clases."),
    cta: { label: l("Book a tour", "Agendar visita"), href: "/admissions/visit" },
  },
  {
    title: l("Apply online", "Postula en línea"),
    text: l("Create a parent account on PulsEDU, then complete a student application.", "Crea una cuenta de padre o madre en PulsEDU y luego completa la postulación del estudiante."),
    cta: { label: l("Open PulsEDU", "Abrir PulsEDU"), href: "https://acs.pulsedu.com" },
  },
  {
    title: l("Assessment", "Evaluación"),
    text: l(
      "KG3 and KG4: a developmental readiness screening. Grades 1–12: WIDA English assessment plus placement tests in English, math and foreign language.",
      "KG3 y KG4: evaluación de madurez del desarrollo. De 1.º a 12.º: evaluación de inglés WIDA y pruebas de ubicación en inglés, matemáticas y lengua extranjera.",
    ),
  },
  {
    title: l("Decision", "Decisión"),
    text: l("A decision in 2 to 5 working days once your file is complete.", "Una decisión en 2 a 5 días hábiles con el expediente completo."),
  },
  {
    title: l("Welcome, Cougar", "Bienvenido, Cougar"),
    text: l("Enroll, join the ACS membership and get ready for your first day.", "Inscríbete, forma parte de la membresía de ACS y prepárate para el primer día."),
  },
];

/** The three-phase stepper used on the home page. */
export const PHASES: Step[] = [
  { title: l("Discover", "Descubre"), text: l("Inquire and book a campus tour.", "Haz tu consulta y agenda una visita al campus.") },
  { title: l("Apply", "Postula"), text: l("Apply on PulsEDU and complete the assessments.", "Postula en PulsEDU y completa las evaluaciones.") },
  { title: l("Enroll", "Inscríbete"), text: l("Receive a decision in 2–5 working days and join the Cougars.", "Recibe una decisión en 2 a 5 días hábiles y únete a los Cougars.") },
];

export const DOCUMENTS: L[] = [
  l("Student ID or passport", "Carnet de identidad o pasaporte del estudiante"),
  l("Parent ID or passport", "Carnet de identidad o pasaporte de los padres"),
  l("Birth certificate", "Certificado de nacimiento"),
  l("The last three report cards", "Las tres últimas libretas de calificaciones"),
  l("A daycare report (PreK and KG applicants)", "Informe de guardería (postulantes a PreK y KG)"),
];

export const SCHOOL_HOURS = [
  { label: l("KG3", "KG3"), hours: "9:00–12:00" },
  { label: l("KG4", "KG4"), hours: "8:30–13:00" },
  { label: l("Elementary", "Primaria"), hours: "8:15–15:05" },
  { label: l("Secondary", "Secundaria"), hours: "8:15–15:15" },
];

/** Grade ladder for the age calculator. The child must reach `minAge` by 30 June of the entry year. */
export const GRADE_LADDER: { minAge: number; grade: L }[] = [
  { minAge: 3, grade: l("KG3", "KG3") },
  { minAge: 4, grade: l("KG4", "KG4") },
  { minAge: 5, grade: l("KG5", "KG5") },
  { minAge: 6, grade: l("Grade 1", "1.º grado") },
  { minAge: 7, grade: l("Grade 2", "2.º grado") },
  { minAge: 8, grade: l("Grade 3", "3.º grado") },
  { minAge: 9, grade: l("Grade 4", "4.º grado") },
  { minAge: 10, grade: l("Grade 5", "5.º grado") },
  { minAge: 11, grade: l("Grade 6", "6.º grado") },
  { minAge: 12, grade: l("Grade 7", "7.º grado") },
  { minAge: 13, grade: l("Grade 8", "8.º grado") },
  { minAge: 14, grade: l("Grade 9", "9.º grado") },
  { minAge: 15, grade: l("Grade 10", "10.º grado") },
  { minAge: 16, grade: l("Grade 11", "11.º grado") },
  { minAge: 17, grade: l("Grade 12", "12.º grado") },
];

export type TransferOrigin = "bolivia-feb" | "bolivia-aug" | "abroad";

export const TRANSFER_GUIDE: Record<TransferOrigin, { label: L; checklist: L[]; calendar: L[] }> = {
  "bolivia-feb": {
    label: l("A Bolivian school on the February–November calendar", "Un colegio boliviano con calendario de febrero a noviembre"),
    checklist: [
      l("RUDE (Registro Único de Estudiantes)", "RUDE (Registro Único de Estudiantes)"),
      l("Original Ministry report cards (libretas)", "Libretas originales del Ministerio"),
      l("Student and parent ID, birth certificate", "Carnet del estudiante y de los padres, certificado de nacimiento"),
      l("The last three report cards", "Las tres últimas libretas de calificaciones"),
    ],
    calendar: [
      l(
        "Because of the change from a February to an August calendar, your child may repeat six months.",
        "Por el cambio de calendario de febrero a agosto, tu hijo o hija podría repetir seis meses.",
      ),
      l("Students from Bolivian schools may only enter at the start of a semester.", "Los estudiantes de colegios bolivianos solo pueden ingresar al inicio de un semestre."),
    ],
  },
  "bolivia-aug": {
    label: l("A Bolivian school on the American (August–June) calendar", "Un colegio boliviano con calendario americano (agosto a junio)"),
    checklist: [
      l("RUDE (Registro Único de Estudiantes)", "RUDE (Registro Único de Estudiantes)"),
      l("Original Ministry report cards (libretas)", "Libretas originales del Ministerio"),
      l("Student and parent ID, birth certificate", "Carnet del estudiante y de los padres, certificado de nacimiento"),
      l("The last three report cards", "Las tres últimas libretas de calificaciones"),
    ],
    calendar: [
      l("Your child continues in the same grade.", "Tu hijo o hija continúa en el mismo grado."),
      l(
        "The Bolivian diploma is received one year after ACS graduation.",
        "El bachillerato boliviano se recibe un año después de la graduación de ACS.",
      ),
      l("Students from Bolivian schools may only enter at the start of a semester.", "Los estudiantes de colegios bolivianos solo pueden ingresar al inicio de un semestre."),
    ],
  },
  abroad: {
    label: l("A school outside Bolivia", "Un colegio fuera de Bolivia"),
    checklist: [
      l(
        "Report cards apostilled or legalized in the country of origin",
        "Libretas apostilladas o legalizadas en el país de origen",
      ),
      l("Translation or stamp by the Bolivian consulate", "Traducción o sello del consulado de Bolivia"),
      l(
        "Equivalency process in Bolivia: Cancillería, then the Ministry of Education",
        "Trámite de equivalencia en Bolivia: Cancillería y luego Ministerio de Educación",
      ),
      l("Student and parent passport, birth certificate", "Pasaporte del estudiante y de los padres, certificado de nacimiento"),
      l("The last three report cards", "Las tres últimas libretas de calificaciones"),
    ],
    calendar: [
      l(
        "Students who enroll after September are fully admitted, but their Ministry registration is deferred to the next year.",
        "Los estudiantes que se inscriben después de septiembre son admitidos plenamente, pero su registro en el Ministerio se difiere al año siguiente.",
      ),
      l("ACS follows the American calendar, from August to early June.", "ACS sigue el calendario americano, de agosto a principios de junio."),
    ],
  },
};

export const MINISTRY_NOTE = l(
  "Bolivian Ministry rule: no student may miss more than 24 days in a school year.",
  "Norma del Ministerio de Educación: ningún estudiante puede faltar más de 24 días en un año escolar.",
);

export type Faq = { q: L; a: L };
export const FAQ: Faq[] = [
  {
    q: l("When can we apply?", "¿Cuándo podemos postular?"),
    a: l(
      "Admissions are rolling and open on 1 October of the year before entry. Apply online at acs.pulsedu.com: create a parent account first, then a student application.",
      "Las admisiones son continuas y abren el 1 de octubre del año anterior al ingreso. Postula en acs.pulsedu.com: primero crea una cuenta de padre o madre y luego la postulación del estudiante.",
    ),
  },
  {
    q: l("Does my child need to speak English?", "¿Mi hijo o hija necesita hablar inglés?"),
    a: l(
      "Not for Early Childhood. KG3 and KG4 have open admission, subject to a developmental readiness screening. From Grade 1 to 12, students need adequate English shown on the WIDA assessment, plus placement tests in English, math and foreign language.",
      "No para Educación Inicial. KG3 y KG4 tienen admisión abierta, sujeta a una evaluación de madurez del desarrollo. De 1.º a 12.º, se requiere un nivel de inglés adecuado en la evaluación WIDA y pruebas de ubicación en inglés, matemáticas y lengua extranjera.",
    ),
  },
  {
    q: l("What is the age cutoff?", "¿Cuál es la fecha límite de edad?"),
    a: l(
      "Your child must turn 3 by 30 June to enter KG3, 4 for KG4, 5 for KG5, 6 for Grade 1, and so on.",
      "Tu hijo o hija debe cumplir 3 años hasta el 30 de junio para ingresar a KG3, 4 para KG4, 5 para KG5, 6 para 1.º grado, y así sucesivamente.",
    ),
  },
  {
    q: l("How long does a decision take?", "¿Cuánto demora la decisión?"),
    a: l(
      "2 to 5 working days once all documents and tests are complete.",
      "De 2 a 5 días hábiles una vez completos todos los documentos y pruebas.",
    ),
  },
  {
    q: l("Which documents do we need?", "¿Qué documentos necesitamos?"),
    a: l(
      "The student's ID or passport, parent ID or passport, birth certificate, the last three report cards, and a daycare report for PreK and KG applicants. Families transferring from Bolivian schools or from abroad need extra documents: use our transfer guide.",
      "Carnet o pasaporte del estudiante, carnet o pasaporte de los padres, certificado de nacimiento, las tres últimas libretas y un informe de guardería para postulantes a PreK y KG. Las familias que vienen de colegios bolivianos o del exterior necesitan documentos adicionales: usa nuestra guía de traslado.",
    ),
  },
  {
    q: l("Will my child receive the Bolivian diploma?", "¿Mi hijo o hija recibirá el bachillerato boliviano?"),
    a: l(
      "Yes. ACS graduates earn both a U.S. High School Diploma and the Bolivian Bachillerato. Students coming from American-calendar Bolivian schools receive the Bolivian diploma one year after ACS graduation.",
      "Sí. Los egresados de ACS obtienen el diploma de secundaria estadounidense y el bachillerato boliviano. Quienes vienen de colegios bolivianos con calendario americano reciben el bachillerato boliviano un año después de la graduación de ACS.",
    ),
  },
  {
    q: l("What is the school calendar and what are the hours?", "¿Cuál es el calendario y el horario?"),
    a: l(
      "ACS follows the American calendar, from August to early June. KG3 9:00–12:00, KG4 8:30–13:00, Elementary 8:15–15:05, Secondary 8:15–15:15.",
      "ACS sigue el calendario americano, de agosto a principios de junio. KG3 de 9:00 a 12:00, KG4 de 8:30 a 13:00, Primaria de 8:15 a 15:05 y Secundaria de 8:15 a 15:15.",
    ),
  },
  {
    q: l("Is there a uniform? What about lunch?", "¿Hay uniforme? ¿Y el almuerzo?"),
    a: l(
      "There is no uniform, but there is a dress code. Students bring lunch from home or buy it from the ACS Catering Service, which publishes a monthly menu.",
      "No hay uniforme, pero sí un código de vestimenta. Los estudiantes traen almuerzo de casa o lo compran al servicio de catering de ACS, que publica un menú mensual.",
    ),
  },
  {
    q: l("How much is tuition?", "¿Cuánto cuesta la colegiatura?"),
    a: l(
      "Tuition is not published online. Please send an inquiry and our admissions and business office will share the current fee schedule. The business office is open Monday to Friday, 9:00–15:30.",
      "La colegiatura no se publica en línea. Envía una consulta y las oficinas de admisiones y administración te compartirán las tarifas vigentes. La oficina administrativa atiende de lunes a viernes, de 9:00 a 15:30.",
    ),
  },
  {
    q: l("Can families use the campus after school?", "¿Las familias pueden usar el campus fuera del horario escolar?"),
    a: l(
      "Yes. Parents become ACS members and can use the Sports Complex on weekends and after school.",
      "Sí. Los padres se vuelven miembros de ACS y pueden usar el Complejo Deportivo los fines de semana y después de clases.",
    ),
  },
];
