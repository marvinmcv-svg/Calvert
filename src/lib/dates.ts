import { format, parseISO } from "date-fns";
import { enUS, es } from "date-fns/locale";
import type { Lang } from "./i18n-types";
import type { DatePrecision } from "@/data/content";

export function formatDate(iso: string, lang: Lang, precision: DatePrecision = "day") {
  const locale = lang === "es" ? es : enUS;
  const pattern =
    precision === "year" ? "yyyy" : precision === "month" ? "MMMM yyyy" : lang === "es" ? "d 'de' MMMM 'de' yyyy" : "d MMMM yyyy";
  return format(parseISO(iso), pattern, { locale });
}
