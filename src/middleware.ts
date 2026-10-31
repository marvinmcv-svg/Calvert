import { NextResponse, type NextRequest } from "next/server";

/** Sends un-prefixed paths to /en or /es, by saved choice first, then the browser language. */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (/^\/(en|es)(\/|$)/.test(pathname)) return NextResponse.next();

  const saved = req.cookies.get("acs-lang")?.value;
  const accept = req.headers.get("accept-language") ?? "";
  const lang = saved === "es" || saved === "en" ? saved : /^\s*es\b/i.test(accept) ? "es" : "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|admin|_next|brand|images|favicon|robots.txt|sitemap.xml|.*\\.[a-zA-Z0-9]+$).*)"],
};
