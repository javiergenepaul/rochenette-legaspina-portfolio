import { NextRequest, NextResponse } from "next/server";

const defaultLocale = "en";
const defaultYear = "2026";
const locales = ["en", "de", "fr"];
const years = ["2025", "2026", "2027"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // / → /2026/en
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${defaultYear}/${defaultLocale}`, request.url)
    );
  }

  for (const year of years) {
    if (pathname === `/${year}` || pathname === `/${year}/`) {
      return NextResponse.redirect(
        new URL(`/${year}/${defaultLocale}`, request.url)
      );
    }

    const withoutYear = pathname.slice(`/${year}`.length);
    if (withoutYear && withoutYear.startsWith("/")) {
      const firstSegment = withoutYear.split("/")[1];
      if (firstSegment && !locales.includes(firstSegment)) {
        return NextResponse.redirect(
          new URL(`/${year}/${defaultLocale}${withoutYear}`, request.url)
        );
      }
    }
  }

  // Expose the resolved locale to the root layout (via headers()) so
  // <html lang> can be set server-side on first render, not just client-side.
  const segments = pathname.split("/").filter(Boolean);
  const localeSegment = segments[1];
  const locale = locales.includes(localeSegment ?? "") ? localeSegment! : defaultLocale;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/", "/2025/:path*", "/2026/:path*", "/2027/:path*"],
};
