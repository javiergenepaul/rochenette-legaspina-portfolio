import { Font } from "@react-pdf/renderer";

let registered = false;

/**
 * Registers Inter (used by the Modern theme) as a real embedded font so the
 * PDF text stays selectable/ATS-parseable. The Simple theme intentionally
 * uses react-pdf's built-in Times-Roman — one of the 14 standard PDF fonts,
 * which every ATS parser recognizes natively.
 */
export function registerResumeFonts() {
  if (registered) return;
  registered = true;

  Font.register({
    family: "Inter",
    fonts: [
      { src: "/fonts/inter/Inter-Regular.ttf", fontWeight: 400 },
      { src: "/fonts/inter/Inter-Medium.ttf", fontWeight: 500 },
      { src: "/fonts/inter/Inter-SemiBold.ttf", fontWeight: 600 },
      { src: "/fonts/inter/Inter-Bold.ttf", fontWeight: 700 },
      { src: "/fonts/inter/Inter-ExtraBold.ttf", fontWeight: 800 },
    ],
  });

  // Don't hyphenate/split words across lines.
  Font.registerHyphenationCallback((word) => [word]);
}
