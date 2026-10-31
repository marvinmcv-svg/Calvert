import { l, type L } from "@/lib/i18n-types";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: L;
  /** Where the photo came from, so staff can trace consent and credit. */
  source: string;
};

const SRC_SITE = "acslp.org (school website, 2026)";

/**
 * The photo library. Every photo is the school's own; nothing is stock or generated.
 * Components reference photos by key, so replacing one here updates it everywhere.
 */
export const MEDIA = {
  campusPlayground: {
    src: "/images/acs/campus-playground.jpg",
    width: 1800,
    height: 1350,
    alt: l(
      "Elementary students playing on the ACS playground and lawn on a sunny day, with picnic tables, trees and Zona Sur buildings behind.",
      "Estudiantes de primaria juegan en el patio y el césped de ACS en un día soleado, con mesas de picnic, árboles y edificios de la Zona Sur al fondo.",
    ),
    source: `${SRC_SITE}, home page slideshow`,
  },
  campusCourtyard: {
    src: "/images/acs/campus-courtyard.jpg",
    width: 1280,
    height: 960,
    alt: l(
      "The ACS central courtyard: a green lawn, brick paths and benches framed by red-tiled colonial buildings under a blue sky.",
      "El patio central de ACS: césped, senderos de ladrillo y bancas rodeados de edificios coloniales de teja roja bajo un cielo azul.",
    ),
    source: `${SRC_SITE}, home page slideshow`,
  },
  campusLawn: {
    src: "/images/acs/campus-lawn-mountains.jpg",
    width: 593,
    height: 584,
    alt: l(
      "Students relax on the wide campus lawn among palm trees, with tiled roofs and the La Paz mountains beyond.",
      "Estudiantes descansan en el amplio césped del campus entre palmeras, con techos de teja y las montañas de La Paz detrás.",
    ),
    source: `${SRC_SITE}, home page`,
  },
  historyCampus: {
    src: "/images/acs/history-early-campus.jpg",
    width: 593,
    height: 584,
    alt: l(
      "An archival colour photo of the early campus: children on open ground in front of the hacienda house and palm trees.",
      "Foto de archivo a color del campus en sus inicios: niños en un terreno abierto frente a la casa de hacienda y las palmeras.",
    ),
    source: `${SRC_SITE}, About page`,
  },
  earlyChildhood: {
    src: "/images/acs/early-childhood-sunhat.jpg",
    width: 593,
    height: 584,
    alt: l(
      "A young ACS student in a bright green sun hat smiles at the camera outdoors.",
      "Una pequeña estudiante de ACS con un sombrero verde para el sol sonríe a la cámara al aire libre.",
    ),
    source: `${SRC_SITE}, home page`,
  },
  secondaryIpads: {
    src: "/images/acs/secondary-students-ipads.jpg",
    width: 593,
    height: 584,
    alt: l(
      "Two secondary students work on tablets at their desks in a classroom with posters on the wall.",
      "Dos estudiantes de secundaria trabajan con tabletas en sus pupitres, en un aula con afiches en la pared.",
    ),
    source: `${SRC_SITE}, home page`,
  },
  graduatesTrio: {
    src: "/images/acs/graduates-trio.jpg",
    width: 536,
    height: 643,
    alt: l(
      "Three ACS graduates in caps, gowns and stoles stand together, smiling.",
      "Tres egresados de ACS con birrete, toga y estola posan juntos, sonriendo.",
    ),
    source: `${SRC_SITE}, home page`,
  },
  graduates70th: {
    src: "/images/acs/graduates-70th.jpg",
    width: 536,
    height: 643,
    alt: l(
      "Three graduates in caps and gowns beside the green ACS Calvert 70th anniversary seal.",
      "Tres egresados con birrete y toga junto al sello verde del 70 aniversario de ACS Calvert.",
    ),
    source: `${SRC_SITE}, home page`,
  },
  graduationFaculty: {
    src: "/images/acs/graduation-faculty.jpg",
    width: 1200,
    height: 900,
    alt: l(
      "Graduating seniors in green gowns line up with faculty on a brick path in the campus gardens.",
      "Egresados con togas verdes se forman junto a docentes en un sendero de ladrillo de los jardines del campus.",
    ),
    source: `${SRC_SITE}, news post`,
  },
  graduationClass: {
    src: "/images/acs/graduation-class.jpg",
    width: 1200,
    height: 900,
    alt: l(
      "Smiling graduates in green caps and gowns gather under the courtyard awnings on graduation day.",
      "Egresados sonrientes con birretes y togas verdes reunidos bajo los toldos del patio el día de la graduación.",
    ),
    source: `${SRC_SITE}, home page slideshow`,
  },
  elementaryIpad: {
    src: "/images/acs/elementary-ipad.jpg",
    width: 1125,
    height: 750,
    alt: l(
      "An elementary student smiles while working on an iPad in a red case, with classmates at work behind.",
      "Una estudiante de primaria sonríe mientras trabaja en un iPad con funda roja; detrás, sus compañeros trabajan.",
    ),
    source: `${SRC_SITE}, home page`,
  },
  athleticsTrack: {
    src: "/images/acs/athletics-track.jpg",
    width: 594,
    height: 585,
    alt: l(
      "A student sprints on the running track beneath a \"Welcome Athletes, ACS Cougars\" banner.",
      "Un estudiante corre en la pista bajo un cartel que dice \"Welcome Athletes, ACS Cougars\".",
    ),
    source: `${SRC_SITE}, home page`,
  },
  aquatics: {
    src: "/images/acs/aquatics-pool.jpg",
    width: 594,
    height: 585,
    alt: l(
      "A young swimmer in goggles and a swim cap glides underwater in the ACS indoor pool.",
      "Una pequeña nadadora con gafas y gorra se desliza bajo el agua en la piscina techada de ACS.",
    ),
    source: `${SRC_SITE}, home page`,
  },
  merchSweatshirt: {
    src: "/images/acs/merch-sweatshirt.jpg",
    width: 1254,
    height: 1370,
    alt: l(
      "A grey sweatshirt printed with the green \"Calvert 70th Anniversary\" cougar design.",
      "Un buzo gris con el diseño verde del puma \"Calvert 70th Anniversary\".",
    ),
    source: `${SRC_SITE}, 70th anniversary merchandise post`,
  },
  merchNotebook: {
    src: "/images/acs/merch-notebook.jpg",
    width: 1600,
    height: 1600,
    alt: l(
      "A white notebook with the ACS Calvert 70th anniversary logo.",
      "Un cuaderno blanco con el logo del 70 aniversario de ACS Calvert.",
    ),
    source: `${SRC_SITE}, 70th anniversary merchandise post`,
  },
  teamInarra: {
    src: "/images/acs/team-maria-inarra.jpg",
    width: 1047,
    height: 1280,
    alt: l("Portrait of María Inarra, All-School Principal.", "Retrato de María Inarra, Directora General Académica."),
    source: `${SRC_SITE}, About page, Our Team`,
  },
  teamPhilot: {
    src: "/images/acs/team-kim-philot.jpg",
    width: 1472,
    height: 1800,
    alt: l("Portrait of Kim Philot.", "Retrato de Kim Philot."),
    source: `${SRC_SITE}, About page, Our Team`,
  },
  teamVieira: {
    src: "/images/acs/team-ricardo-vieira.jpg",
    width: 1472,
    height: 1800,
    alt: l(
      "Portrait of Dr. Ricardo Vieira, Secondary Assistant Principal.",
      "Retrato del Dr. Ricardo Vieira, Subdirector de Secundaria.",
    ),
    source: `${SRC_SITE}, About page, Our Team`,
  },
  teamDrury: {
    src: "/images/acs/team-ben-drury.jpg",
    width: 1472,
    height: 1800,
    alt: l(
      "Portrait of Ben Drury, Elementary Assistant Principal.",
      "Retrato de Ben Drury, Subdirector de Primaria.",
    ),
    source: `${SRC_SITE}, About page, Our Team`,
  },
  teamUrquidi: {
    src: "/images/acs/team-ana-maria-urquidi.jpg",
    width: 600,
    height: 800,
    alt: l("Portrait of Ana María Urquidi, School Counselor.", "Retrato de Ana María Urquidi, Consejera Escolar."),
    source: `${SRC_SITE}, About page, Our Team`,
  },
  teamMcGrath: {
    src: "/images/acs/team-jared-mcgrath.jpg",
    width: 600,
    height: 800,
    alt: l("Portrait of Jared McGrath, College Counselor.", "Retrato de Jared McGrath, Consejero Universitario."),
    source: `${SRC_SITE}, About page, Our Team`,
  },
} satisfies Record<string, Photo>;

export type MediaKey = keyof typeof MEDIA;

export function photo(key: MediaKey): Photo {
  return MEDIA[key];
}
