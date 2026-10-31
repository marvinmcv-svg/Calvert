import { l, type L } from "@/lib/i18n-types";
import type { MediaKey } from "./media";

export type ScheduleItem = { time: string; label: L };

export type Division = {
  slug: "early-childhood" | "elementary" | "middle-school" | "high-school";
  name: L;
  grades: L;
  ages: L;
  hours: string;
  photo: MediaKey;
  kicker: L;
  title: L;
  intro: L;
  highlights: { title: L; text: L }[];
  dayInTheLife: ScheduleItem[];
  support: L;
  catalog?: { label: L; href: string };
  leader?: { name: string; role: L };
};

export const DIVISIONS: Division[] = [
  {
    slug: "early-childhood",
    name: l("Early Childhood", "Educación Inicial"),
    grades: l("KG3, KG4 and KG5", "KG3, KG4 y KG5"),
    ages: l("Ages 3 to 5", "De 3 a 5 años"),
    hours: "KG3 9:00–12:00 · KG4 8:30–13:00",
    photo: "earlyChildhood",
    kicker: l("Where it all begins", "Donde todo comienza"),
    title: l("Big days for small explorers.", "Grandes días para pequeños exploradores."),
    intro: l(
      "Early Childhood is the front door to ACS. Children learn through play, curiosity and friendship, in English, from their very first day. No English is required to join: KG3 and KG4 have open admission, subject to a developmental readiness screening.",
      "Educación Inicial es la puerta de entrada a ACS. Los niños aprenden jugando, explorando y haciendo amigos, en inglés, desde el primer día. No se requiere inglés para ingresar: KG3 y KG4 tienen admisión abierta, sujeta a una evaluación de madurez del desarrollo.",
    ),
    highlights: [
      { title: l("English from day one", "Inglés desde el primer día"), text: l("Children are immersed in English through stories, songs and play, with no prior English required.", "Los niños se sumergen en el inglés con cuentos, canciones y juego, sin necesidad de saber inglés antes.") },
      { title: l("Learning through play", "Aprender jugando"), text: l("Three playgrounds, two school gardens and two greenhouses turn the campus into a classroom.", "Tres patios de juego, dos huertos escolares y dos invernaderos convierten el campus en un aula.") },
      { title: l("Social and emotional growth", "Crecimiento socioemocional"), text: l("Second Step lessons help young children name feelings, make friends and solve problems.", "Las lecciones de Second Step ayudan a los niños a nombrar emociones, hacer amigos y resolver problemas.") },
      { title: l("Short, gentle days", "Jornadas cortas y tranquilas"), text: l("KG3 runs 9:00–12:00 and KG4 8:30–13:00, a rhythm built for little ones.", "KG3 asiste de 9:00 a 12:00 y KG4 de 8:30 a 13:00, un ritmo pensado para los más pequeños.") },
    ],
    dayInTheLife: [
      { time: "8:30", label: l("KG4 arrival and morning circle", "Llegada de KG4 y círculo de la mañana") },
      { time: "9:00", label: l("KG3 arrival, songs and stories in English", "Llegada de KG3, canciones y cuentos en inglés") },
      { time: "10:00", label: l("Snack and outdoor play", "Refrigerio y juego al aire libre") },
      { time: "10:45", label: l("Centers: letters, numbers, art and building", "Rincones: letras, números, arte y construcción") },
      { time: "12:00", label: l("KG3 pickup", "Salida de KG3") },
      { time: "13:00", label: l("KG4 pickup", "Salida de KG4") },
    ],
    support: l(
      "Our counselors bring social and emotional learning into every classroom through Second Step, and our Learning Services team supports children who are new to English.",
      "Nuestros consejeros llevan el aprendizaje socioemocional a cada aula con Second Step, y el equipo de Servicios de Aprendizaje acompaña a los niños que recién empiezan con el inglés.",
    ),
    catalog: {
      label: l("KG3 to Grade 5 course descriptions", "Descripción de cursos de KG3 a 5.º grado"),
      href: "https://docs.google.com/document/d/1RAwbvtcwb4BpBD1TD2xYZZYIDuZQhJnraBVeSaRfHtw/preview",
    },
  },
  {
    slug: "elementary",
    name: l("Elementary School", "Primaria"),
    grades: l("Grades 1 to 5", "De 1.º a 5.º grado"),
    ages: l("Ages 6 to 10", "De 6 a 10 años"),
    hours: "8:15–15:05",
    photo: "elementaryIpad",
    kicker: l("Elementary, Grades 1–5", "Primaria, 1.º a 5.º grado"),
    title: l("Confident readers. Curious thinkers.", "Lectores seguros. Pensadores curiosos."),
    intro: l(
      "In Elementary, children build strong foundations in reading, writing and mathematics through a U.S. standards-based curriculum taught in English. Small classes and caring teachers mean every child is known.",
      "En Primaria, los niños construyen bases sólidas en lectura, escritura y matemáticas con un currículo basado en estándares de EE. UU. y enseñado en inglés. Las clases pequeñas y los maestros cercanos hacen que cada niño sea conocido.",
    ),
    highlights: [
      { title: l("U.S. standards, taught in English", "Estándares de EE. UU., en inglés"), text: l("A coherent curriculum mapped in Atlas, from phonics to problem solving.", "Un currículo coherente, mapeado en Atlas, desde la fonética hasta la resolución de problemas.") },
      { title: l("iPads in every classroom", "iPads en cada aula"), text: l("Students use iPads and tools like IXL to practice and create.", "Los estudiantes usan iPads y herramientas como IXL para practicar y crear.") },
      { title: l("Spanish and French", "Español y francés"), text: l("World languages are part of the program, and most students grow up bilingual or trilingual.", "Las lenguas son parte del programa, y la mayoría de los estudiantes crece bilingüe o trilingüe.") },
      { title: l("A library like no other", "Una biblioteca única"), text: l("The Elementary library is part of the largest English-language collection in Bolivia.", "La biblioteca de Primaria forma parte de la mayor colección en inglés de Bolivia.") },
    ],
    dayInTheLife: [
      { time: "8:15", label: l("School day begins", "Inicio de la jornada") },
      { time: "8:30", label: l("Literacy block: reading and writing workshop", "Bloque de lectoescritura: taller de lectura y escritura") },
      { time: "10:15", label: l("Recess on the playgrounds", "Recreo en los patios") },
      { time: "10:45", label: l("Mathematics", "Matemáticas") },
      { time: "12:00", label: l("Lunch from home or the ACS Catering Service", "Almuerzo de casa o del servicio de catering de ACS") },
      { time: "13:00", label: l("Science, social studies, Spanish, arts or PE", "Ciencias, estudios sociales, español, artes o educación física") },
      { time: "15:05", label: l("Dismissal and after-school activities", "Salida y actividades extracurriculares") },
    ],
    support: l(
      "Elementary counseling brings social and emotional learning through the Second Step program, character education and integrated support. Our ELL and Learning Support teachers work alongside classroom teachers.",
      "La consejería de Primaria ofrece aprendizaje socioemocional con el programa Second Step, educación del carácter y apoyo integrado. Los docentes de ELL y Apoyo al Aprendizaje trabajan junto a los maestros de aula.",
    ),
    catalog: {
      label: l("KG3 to Grade 5 course descriptions", "Descripción de cursos de KG3 a 5.º grado"),
      href: "https://docs.google.com/document/d/1RAwbvtcwb4BpBD1TD2xYZZYIDuZQhJnraBVeSaRfHtw/preview",
    },
    leader: { name: "Ben Drury", role: l("Elementary Assistant Principal", "Subdirector de Primaria") },
  },
  {
    slug: "middle-school",
    name: l("Middle School", "Secundaria Básica"),
    grades: l("Grades 6 to 8", "De 6.º a 8.º grado"),
    ages: l("Ages 11 to 13", "De 11 a 13 años"),
    hours: "8:15–15:15",
    photo: "secondaryIpads",
    kicker: l("Middle School, Grades 6–8", "Middle School, 6.º a 8.º grado"),
    title: l("The years they find their voice.", "Los años en que encuentran su voz."),
    intro: l(
      "Middle School is a time of big change. Advisory, caring counselors and a rich mix of academics, arts and athletics help students grow in independence while staying connected.",
      "La secundaria básica es una etapa de grandes cambios. El programa de Advisory, consejeros cercanos y una combinación rica de academia, artes y deporte ayudan a los estudiantes a ganar independencia sin perder el vínculo.",
    ),
    highlights: [
      { title: l("Bring your own laptop", "Trae tu propia laptop"), text: l("From Grade 6, students bring their own laptop and learn to use technology responsibly.", "Desde 6.º grado, los estudiantes traen su laptop y aprenden a usar la tecnología con responsabilidad.") },
      { title: l("Advisory", "Advisory"), text: l("Every student belongs to an Advisory group for social and emotional learning and check-ins.", "Cada estudiante pertenece a un grupo de Advisory para el aprendizaje socioemocional y el acompañamiento.") },
      { title: l("Four science labs", "Cuatro laboratorios de ciencias"), text: l("Hands-on investigation in four science labs and an astronomy observatory.", "Investigación práctica en cuatro laboratorios de ciencias y un observatorio astronómico.") },
      { title: l("Cougar athletics", "Deporte Cougar"), text: l("Soccer, volleyball, basketball and track and field, including the Friendship Games.", "Fútbol, vóleibol, básquetbol y atletismo, incluidos los Friendship Games.") },
    ],
    dayInTheLife: [
      { time: "8:15", label: l("Advisory and morning check-in", "Advisory y saludo de la mañana") },
      { time: "8:30", label: l("Core classes: English, math, science, social studies", "Materias troncales: inglés, matemáticas, ciencias, estudios sociales") },
      { time: "12:00", label: l("Lunch and clubs", "Almuerzo y clubes") },
      { time: "13:00", label: l("Spanish or French, arts and PE", "Español o francés, artes y educación física") },
      { time: "15:15", label: l("Dismissal, practices and activities", "Salida, entrenamientos y actividades") },
    ],
    support: l(
      "Secondary counseling offers individual planning, social and emotional learning through Advisory, and academic and career support.",
      "La consejería de Secundaria ofrece planificación individual, aprendizaje socioemocional a través de Advisory y apoyo académico y vocacional.",
    ),
    catalog: {
      label: l("Middle School course descriptions", "Descripción de cursos de Middle School"),
      href: "https://docs.google.com/document/d/1aBSfsnKHiAWDTmDUYjO7l2Hkmn8dl18Z2-soE6da4d0/preview",
    },
    leader: { name: "Dr. Ricardo Vieira", role: l("Secondary Assistant Principal", "Subdirector de Secundaria") },
  },
  {
    slug: "high-school",
    name: l("High School", "Bachillerato"),
    grades: l("Grades 9 to 12", "De 9.º a 12.º grado"),
    ages: l("Ages 14 to 18", "De 14 a 18 años"),
    hours: "8:15–15:15",
    photo: "graduationClass",
    kicker: l("High School, Grades 9–12", "High School, 9.º a 12.º grado"),
    title: l("Two diplomas. A world of options.", "Dos diplomas. Un mundo de opciones."),
    intro: l(
      "High School students earn a U.S. High School Diploma and the Bolivian Bachillerato. With dedicated college counseling from Grade 8, they graduate ready for universities in the Americas, Europe and beyond.",
      "Los estudiantes de High School obtienen el diploma de secundaria estadounidense y el bachillerato boliviano. Con orientación universitaria dedicada desde 8.º grado, egresan listos para universidades en América, Europa y más allá.",
    ),
    highlights: [
      { title: l("Two diplomas", "Dos diplomas"), text: l("The U.S. High School Diploma and the Bolivian Bachillerato, recognized by the Ministry since 1968.", "Diploma de secundaria de EE. UU. y bachillerato boliviano, reconocido por el Ministerio desde 1968.") },
      { title: l("College Prep, four times a week", "College Prep, cuatro veces por semana"), text: l("Seniors attend College Prep sessions four times a week as they apply to universities.", "Los estudiantes de último año asisten a sesiones de College Prep cuatro veces por semana mientras postulan a universidades.") },
      { title: l("Cialfo and the College Fair", "Cialfo y la Feria Universitaria"), text: l("Students research and apply to universities in 25+ countries, and meet admissions officers at our annual College Fair.", "Los estudiantes investigan y postulan a universidades en más de 25 países, y conocen a representantes en nuestra Feria Universitaria anual.") },
      { title: l("Advanced coursework", "Cursos avanzados"), text: l("[[CONFIRM: AP, IB or dual-enrollment courses offered, and exam results.]] The PSAT is offered at ACS.", "[[CONFIRM: cursos AP, IB o de doble inscripción y sus resultados.]] El PSAT se rinde en ACS.") },
    ],
    dayInTheLife: [
      { time: "8:15", label: l("Advisory", "Advisory") },
      { time: "8:30", label: l("Core and elective classes", "Materias troncales y electivas") },
      { time: "12:00", label: l("Lunch, clubs and student council", "Almuerzo, clubes y consejo estudiantil") },
      { time: "13:00", label: l("Seniors: College Prep session", "Último año: sesión de College Prep") },
      { time: "15:15", label: l("Dismissal, athletics and the arts", "Salida, deporte y artes") },
    ],
    support: l(
      "Secondary counselors, a dedicated College Counselor and the Learning Services team guide every student, from course planning to university applications.",
      "Los consejeros de Secundaria, un Consejero Universitario dedicado y el equipo de Servicios de Aprendizaje guían a cada estudiante, desde la elección de cursos hasta las postulaciones universitarias.",
    ),
    catalog: {
      label: l("High School course descriptions", "Descripción de cursos de High School"),
      href: "https://docs.google.com/document/d/1_ipWftOZsrxzc8Lex8Qb2eaJvo5GekBx77dNrIbAcn4/preview",
    },
    leader: { name: "Dr. Ricardo Vieira", role: l("Secondary Assistant Principal", "Subdirector de Secundaria") },
  },
];

export function getDivision(slug: string) {
  return DIVISIONS.find((d) => d.slug === slug);
}

export const CURRICULUM = {
  title: l("A U.S. education, taught in English, rooted in La Paz.", "Educación estadounidense, en inglés, con raíces en La Paz."),
  intro: l(
    "From KG3 to Grade 12, ACS follows a U.S. standards-based curriculum taught in English. Spanish and French are taught as world languages. Curriculum maps are public in Atlas, and grades are shared with families through PowerSchool.",
    "De KG3 a 12.º grado, ACS sigue un currículo basado en estándares de EE. UU. y enseñado en inglés. Español y francés se enseñan como lenguas. Los mapas curriculares son públicos en Atlas y las calificaciones se comparten con las familias en PowerSchool.",
  ),
  platforms: ["PowerSchool", "Atlas", "IXL", "Class Dojo", "Follett Destiny", "Cialfo", "PulsEDU"],
};

export const LEARNING_SERVICES = {
  title: l("Every learner known. Every learner supported.", "Cada estudiante conocido. Cada estudiante acompañado."),
  intro: l(
    "Learning Services brings together our English Language Learning (ELL), Learning Support and Counseling departments to create a fully inclusive environment.",
    "Servicios de Aprendizaje reúne a los departamentos de Aprendizaje del Inglés (ELL), Apoyo al Aprendizaje y Consejería para crear un entorno plenamente inclusivo.",
  ),
  pillars: [
    {
      title: l("English Language Learning", "Aprendizaje del inglés (ELL)"),
      text: l(
        "Sheltered instruction helps students learn content and English at the same time, with a goal of at least one WIDA proficiency level of growth each year.",
        "La instrucción protegida (sheltered instruction) permite aprender contenidos e inglés a la vez, con la meta de crecer al menos un nivel de dominio WIDA por año.",
      ),
    },
    {
      title: l("Learning Support", "Apoyo al Aprendizaje"),
      text: l(
        "Individualized plans (IEPs) support students with mild learning differences so they can thrive in regular classes.",
        "Planes individualizados (IEP) acompañan a estudiantes con diferencias leves de aprendizaje para que prosperen en el aula regular.",
      ),
    },
    {
      title: l("Self-advocacy", "Autodeterminación"),
      text: l(
        "Students learn to understand how they learn best and to ask for what they need.",
        "Los estudiantes aprenden a entender cómo aprenden mejor y a pedir lo que necesitan.",
      ),
    },
    {
      title: l("Language support in Spanish, too", "Apoyo también en español"),
      text: l(
        "Support extends to students with lower Spanish proficiency, so newcomers from abroad feel at home.",
        "El apoyo se extiende a estudiantes con menor dominio del español, para que quienes llegan del exterior se sientan en casa.",
      ),
    },
  ],
  handbook: "https://docs.google.com/document/d/1V5GFbbdNxLskbJSSs0c0TnFt9Oeki1RRlrzWA6UXKnI/preview",
};

export const COUNSELING = {
  title: l("Well-being fuels learning.", "El bienestar impulsa el aprendizaje."),
  intro: l(
    "Our counselors partner with families and teachers so every student feels safe, known and ready to learn.",
    "Nuestros consejeros trabajan junto a familias y docentes para que cada estudiante se sienta seguro, conocido y listo para aprender.",
  ),
  elementary: [
    l("Social and emotional learning through the Second Step program", "Aprendizaje socioemocional con el programa Second Step"),
    l("Character education built on the 5 Cs", "Educación del carácter basada en las 5 C"),
    l("Integrated support with teachers and families", "Apoyo integrado con docentes y familias"),
  ],
  secondary: [
    l("Individual planning with every student", "Planificación individual con cada estudiante"),
    l("Social and emotional learning through Advisory", "Aprendizaje socioemocional a través de Advisory"),
    l("Academic and career guidance", "Orientación académica y vocacional"),
  ],
};

export const UNIVERSITY_COUNSELING = {
  title: l("From La Paz to the world.", "De La Paz al mundo."),
  intro: l(
    "100% of our graduates are admitted to their universities of choice around the world. The Class of 2025 was admitted to universities in the United States, Europe and Latin America.",
    "El 100% de nuestros egresados es admitido en la universidad de su elección en todo el mundo. La promoción 2025 fue admitida en universidades de Estados Unidos, Europa y América Latina.",
  ),
  timeline: [
    { grade: l("Grade 8", "8.º grado"), text: l("Group sessions begin: interests, strengths and the road to High School.", "Comienzan las sesiones grupales: intereses, fortalezas y el camino hacia High School.") },
    { grade: l("Grades 9–10", "9.º y 10.º"), text: l("Cialfo accounts and three self-assessments from Human eSources. The PSAT is offered at ACS.", "Cuentas en Cialfo y tres autoevaluaciones de Human eSources. El PSAT se rinde en ACS.") },
    { grade: l("Grade 11", "11.º grado"), text: l("One-to-one meetings with the College Counselor and family meetings to build a university list.", "Reuniones individuales con el Consejero Universitario y reuniones familiares para armar la lista de universidades.") },
    { grade: l("Grade 12", "12.º grado"), text: l("College Prep sessions four times a week, applications, recommendations and decisions.", "Sesiones de College Prep cuatro veces por semana, postulaciones, recomendaciones y decisiones.") },
  ],
  tools: [
    { title: l("Cialfo", "Cialfo"), text: l("Applications to 25+ countries, with university recommendations from a U.S. algorithm plus counselor review.", "Postulaciones a más de 25 países, con recomendaciones de universidades de un algoritmo estadounidense y revisión del consejero.") },
    { title: l("Annual College Fair", "Feria Universitaria anual"), text: l("ACS hosts universities from around the world on our campus every year.", "Cada año, ACS recibe en su campus a universidades de todo el mundo.") },
    { title: l("Family meetings", "Reuniones familiares"), text: l("Families are partners in the process, from the first list to the final choice.", "Las familias son parte del proceso, desde la primera lista hasta la decisión final.") },
  ],
  resultsNote: l(
    "[[CONFIRM: university list for the Classes of 2025 and 2026, number of graduates, scholarships and average scores.]]",
    "[[CONFIRM: lista de universidades de las promociones 2025 y 2026, número de egresados, becas y puntajes promedio.]]",
  ),
  counselor: { name: "Jared McGrath", role: l("College Counselor", "Consejero Universitario") },
};

export const LIBRARIES = {
  title: l("The largest English-language collection in Bolivia.", "La mayor colección en inglés de Bolivia."),
  intro: l(
    "ACS has two libraries, one for Elementary and one for Secondary. Together they hold the largest English-language collection in Bolivia, and the catalog is open online through Follett Destiny.",
    "ACS tiene dos bibliotecas, una de Primaria y una de Secundaria. Juntas reúnen la mayor colección en inglés de Bolivia, y el catálogo está disponible en línea en Follett Destiny.",
  ),
};
