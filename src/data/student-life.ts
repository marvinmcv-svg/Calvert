import { l, type L } from "@/lib/i18n-types";
import type { MediaKey } from "./media";

export type Facility = { slug: string; name: L; text: L; photo?: MediaKey; figure?: string };

/** Campus and facilities, all verified (MASTER_PROMPT 1.8). */
export const FACILITIES: Facility[] = [
  { slug: "observatory", name: l("Astronomy observatory", "Observatorio astronómico"), figure: "3,600 m", text: l("Stargazing from one of the highest school campuses in the world.", "Observar las estrellas desde uno de los campus escolares más altos del mundo.") },
  { slug: "pool", name: l("Indoor heated pool", "Piscina techada temperada"), photo: "aquatics", text: l("Swimming all year round, whatever the weather in La Paz.", "Natación todo el año, sin importar el clima de La Paz.") },
  { slug: "theater", name: l("Michael Donahue Theater", "Teatro Michael Donahue"), figure: "500", text: l("A 500-seat theater and auditorium for concerts, plays and assemblies.", "Un teatro y auditorio de 500 butacas para conciertos, obras y actos.") },
  { slug: "libraries", name: l("Two libraries", "Dos bibliotecas"), figure: "#1", text: l("The largest English-language collection in Bolivia, across an Elementary and a Secondary library.", "La mayor colección en inglés de Bolivia, entre una biblioteca de Primaria y otra de Secundaria.") },
  { slug: "science", name: l("Four science labs", "Cuatro laboratorios de ciencias"), figure: "4", text: l("Hands-on labs for investigation from Middle School to Grade 12.", "Laboratorios prácticos para investigar, desde Middle School hasta 12.º grado.") },
  { slug: "fields", name: l("Lit soccer field and track", "Cancha de fútbol iluminada y pista"), photo: "athleticsTrack", text: l("A full-size lit soccer field, built by draining a lagoon on the old hacienda.", "Una cancha de fútbol reglamentaria e iluminada, construida drenando una laguna de la antigua hacienda.") },
  { slug: "gym", name: l("Gymnasium and weight room", "Gimnasio y sala de pesas"), text: l("Home court for Cougar basketball and volleyball.", "La casa del básquetbol y el vóleibol Cougar.") },
  { slug: "climbing", name: l("Climbing wall", "Muro de escalada"), text: l("A climbing wall for PE, clubs and a little courage.", "Un muro de escalada para educación física, clubes y un poco de valentía.") },
  { slug: "courts", name: l("Tennis and racquetball courts", "Canchas de tenis y ráquetbol"), text: l("Courts for PE classes, teams and families who are ACS members.", "Canchas para educación física, equipos y familias miembros de ACS.") },
  { slug: "gardens", name: l("Greenhouses and gardens", "Invernaderos y huertos"), figure: "2 + 2", text: l("Two greenhouses and two school gardens where science grows.", "Dos invernaderos y dos huertos escolares donde crece la ciencia.") },
  { slug: "playgrounds", name: l("Three playgrounds", "Tres patios de juego"), photo: "campusPlayground", figure: "3", text: l("Room to run, climb and play for our youngest Cougars.", "Espacio para correr, trepar y jugar para los Cougars más pequeños.") },
  { slug: "classrooms", name: l("50+ classrooms and computer labs", "Más de 50 aulas y laboratorios de computación"), figure: "50+", text: l("Bright classrooms, computer labs, iPads in Elementary and laptops from Grade 6.", "Aulas luminosas, laboratorios de computación, iPads en Primaria y laptops desde 6.º grado.") },
  { slug: "bridge", name: l("The stone garden bridge", "El puente de piedra del jardín"), photo: "campusCourtyard", text: l("A historic stone bridge from the USAID era, in the gardens of the former Patiño hacienda.", "Un puente de piedra histórico de la época de USAID, en los jardines de la antigua hacienda Patiño.") },
];

export type Experience = {
  slug: string;
  name: L;
  kicker: L;
  summary: L;
  body: L[];
  photo: MediaKey;
  points: L[];
  links?: { label: L; href: string }[];
  confirm?: L;
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "athletics",
    name: l("Cougar Athletics", "Deporte Cougar"),
    kicker: l("Go Cougars", "Vamos Cougars"),
    summary: l(
      "Soccer, volleyball, basketball and track and field for boys and girls, from Elementary to Secondary.",
      "Fútbol, vóleibol, básquetbol y atletismo para varones y mujeres, de Primaria a Secundaria.",
    ),
    body: [
      l(
        "Being a Cougar means showing up for your team. Boys and girls compete in soccer, volleyball, basketball and track and field in both Elementary and Secondary.",
        "Ser Cougar significa estar presente para tu equipo. Varones y mujeres compiten en fútbol, vóleibol, básquetbol y atletismo, tanto en Primaria como en Secundaria.",
      ),
      l(
        "Our athletes travel for the Friendship Games against schools in La Paz, Cochabamba and Santa Cruz, and train at altitude on a full-size lit field, a heated indoor pool, a gymnasium and a climbing wall.",
        "Nuestros deportistas viajan a los Friendship Games contra colegios de La Paz, Cochabamba y Santa Cruz, y entrenan en altura en una cancha reglamentaria iluminada, una piscina techada temperada, un gimnasio y un muro de escalada.",
      ),
    ],
    photo: "athleticsTrack",
    points: [
      l("Soccer", "Fútbol"),
      l("Volleyball", "Vóleibol"),
      l("Basketball", "Básquetbol"),
      l("Track and field", "Atletismo"),
      l("Swimming in the indoor heated pool", "Natación en la piscina techada temperada"),
      l("Friendship Games: La Paz, Cochabamba, Santa Cruz", "Friendship Games: La Paz, Cochabamba, Santa Cruz"),
    ],
    links: [{ label: l("Athletic Handbook", "Manual de Deportes"), href: "https://docs.google.com/document/d/1cCozM_-LRAgthabtrgoIgLrEkzfuEMO9mIIGXvAR-7k/preview" }],
    confirm: l("[[CONFIRM: teams, season schedules, coaches and results.]]", "[[CONFIRM: equipos, calendarios, entrenadores y resultados.]]"),
  },
  {
    slug: "arts",
    name: l("Fine and Performing Arts", "Artes y Artes Escénicas"),
    kicker: l("On stage", "En escena"),
    summary: l(
      "Dance, music, visual arts, theater and creative workshops, with a 500-seat theater to show it all.",
      "Danza, música, artes visuales, teatro y talleres creativos, con un teatro de 500 butacas para mostrarlo todo.",
    ),
    body: [
      l(
        "Creativity runs through an ACS education. Students explore dance, music, visual arts, theater and creative workshops.",
        "La creatividad atraviesa la educación en ACS. Los estudiantes exploran danza, música, artes visuales, teatro y talleres creativos.",
      ),
      l(
        "The Michael Donahue Theater seats 500 and has hosted guests such as violinist Jaime Laredo.",
        "El Teatro Michael Donahue tiene 500 butacas y ha recibido a invitados como el violinista Jaime Laredo.",
      ),
    ],
    photo: "campusLawn",
    points: [l("Dance", "Danza"), l("Music", "Música"), l("Visual arts", "Artes visuales"), l("Theater", "Teatro"), l("Creative workshops", "Talleres creativos")],
    confirm: l("[[CONFIRM: ensembles, productions and photos from recent performances.]]", "[[CONFIRM: elencos, producciones y fotos de presentaciones recientes.]]"),
  },
  {
    slug: "activities",
    name: l("Clubs and Activities", "Clubes y Actividades"),
    kicker: l("After the bell", "Después de clases"),
    summary: l(
      "Extracurricular activities for Elementary and Secondary, from clubs to student leadership.",
      "Actividades extracurriculares para Primaria y Secundaria, desde clubes hasta liderazgo estudiantil.",
    ),
    body: [
      l(
        "When classes end, campus comes alive. Elementary and Secondary students choose from a menu of extracurricular activities (ECAs) each season.",
        "Cuando terminan las clases, el campus cobra vida. Los estudiantes de Primaria y Secundaria eligen entre una variedad de actividades extracurriculares (ECA) cada temporada.",
      ),
    ],
    photo: "elementaryIpad",
    points: [l("Elementary ECAs", "ECA de Primaria"), l("Secondary clubs", "Clubes de Secundaria"), l("Student council", "Consejo estudiantil")],
    links: [
      { label: l("Extra-Curricular Handbook (English)", "Manual Extracurricular (inglés)"), href: "https://docs.google.com/document/d/1JSBxrlXrTlL5cxugQXI7CWm3wiJXn9YPA-fOXtZZnxs/preview" },
      { label: l("Extra-Curricular Handbook (Spanish)", "Manual Extracurricular (español)"), href: "https://docs.google.com/document/d/1NqBsJVhDbdylb0PhJh-_pvvOxbBEiwblvAiEppLQjVk/preview" },
    ],
    confirm: l("[[CONFIRM: current list of clubs and ECAs for 2026–27.]]", "[[CONFIRM: lista actual de clubes y ECA para 2026–27.]]"),
  },
  {
    slug: "service",
    name: l("Service Learning", "Aprendizaje-Servicio"),
    kicker: l("A force for good", "Una fuerza positiva"),
    summary: l(
      "Our mission asks students to be a force for good. Service learning is where they practice it.",
      "Nuestra misión pide a los estudiantes ser una fuerza positiva. El aprendizaje-servicio es donde lo practican.",
    ),
    body: [
      l(
        "Community service has been part of ACS life since the 1990s. Students learn by serving, reflect on what they learn, and lead.",
        "El servicio comunitario es parte de la vida de ACS desde los años noventa. Los estudiantes aprenden sirviendo, reflexionan sobre lo aprendido y lideran.",
      ),
    ],
    photo: "graduationFaculty",
    points: [l("Compassion in action", "Compasión en acción"), l("Courageous leadership", "Liderazgo valiente"), l("Reflection", "Reflexión")],
    confirm: l("[[CONFIRM: current service partners and projects.]]", "[[CONFIRM: aliados y proyectos de servicio actuales.]]"),
  },
];

export function getExperience(slug: string) {
  return EXPERIENCES.find((e) => e.slug === slug);
}

/** Moments in the ACS year (verified only). */
export type Tradition = { name: L; group: "academic" | "athletic" | "community"; when: L; text: L; photo: MediaKey };
export const TRADITIONS: Tradition[] = [
  { name: l("Friendship Games", "Friendship Games"), group: "athletic", when: l("Season", "Temporada"), text: l("Cougars compete with schools from La Paz, Cochabamba and Santa Cruz.", "Los Cougars compiten con colegios de La Paz, Cochabamba y Santa Cruz."), photo: "athleticsTrack" },
  { name: l("Annual College Fair", "Feria Universitaria anual"), group: "academic", when: l("Every year", "Cada año"), text: l("Universities from around the world come to our campus.", "Universidades de todo el mundo llegan a nuestro campus."), photo: "secondaryIpads" },
  { name: l("Graduation", "Graduación"), group: "community", when: l("End of the school year", "Fin del año escolar"), text: l("Two diplomas, green gowns and the whole community in the gardens.", "Dos diplomas, togas verdes y toda la comunidad en los jardines."), photo: "graduationClass" },
  { name: l("Open House", "Open House"), group: "community", when: l("Admissions season", "Temporada de admisiones"), text: l("Families visit the campus, meet teachers and see ACS in action.", "Las familias visitan el campus, conocen a los docentes y ven ACS en acción."), photo: "campusCourtyard" },
  { name: l("Swim at altitude", "Natación en altura"), group: "athletic", when: l("All year", "Todo el año"), text: l("The indoor heated pool keeps Cougars swimming all year.", "La piscina techada temperada mantiene a los Cougars nadando todo el año."), photo: "aquatics" },
  { name: l("70 years of Cougars", "70 años de Cougars"), group: "community", when: l("1955–2025", "1955–2025"), text: l("Honoring the past, embracing the future.", "Honrando el pasado, abrazando el futuro."), photo: "graduates70th" },
  { name: l("Early Childhood play days", "Días de juego en Inicial"), group: "community", when: l("Every day", "Cada día"), text: l("Three playgrounds and two gardens for our youngest explorers.", "Tres patios y dos huertos para nuestros exploradores más pequeños."), photo: "earlyChildhood" },
];
