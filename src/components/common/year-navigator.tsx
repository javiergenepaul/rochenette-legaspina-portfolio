"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLoadingStore } from "@/store";

const YEARS = ["2025", "2026", "2027"] as const;
type Year = (typeof YEARS)[number];

const YEAR_LABELS: Record<Year, string> = {
  "2025": "2025",
  "2026": "2026",
  "2027": "2027",
};

// ─── Compact pill ────────────────────────────────────────────────────────────

function PillButton({
  year,
  locale,
  dir,
  onNavigate,
}: {
  year: Year;
  locale: string;
  dir: "prev" | "next";
  onNavigate: (href: string) => void;
}) {
  return (
    <button
      onClick={() => onNavigate(`/${year}/${locale}`)}
      className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[0.72rem] font-semibold tracking-widest uppercase border border-amethyst-500/30 bg-white/80 dark:bg-woodsmoke-900/80 backdrop-blur-sm text-amethyst-500 dark:text-amethyst-400 shadow-sm active:scale-95 transition-transform"
    >
      {dir === "prev" && <span>←</span>}
      {YEAR_LABELS[year]}
      {dir === "next" && <span>→</span>}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function YearNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const { setLoading } = useLoadingStore();

  const parts = pathname.split("/");
  const currentYear = (YEARS.find((y) => y === parts[1]) ?? "2026") as Year;
  const locale = parts[2] ?? "en";

  const currentIndex = YEARS.indexOf(currentYear);
  const prevYear = currentIndex > 0 ? YEARS[currentIndex - 1] : null;
  const nextYear = currentIndex < YEARS.length - 1 ? YEARS[currentIndex + 1] : null;

  // Clear loading once the new page pathname is active
  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);

  const handleNavigate = (href: string) => {
    setLoading(true);
    router.push(href);
  };

  return (
    <>
      {/* ── Left / Prev ── */}
      {prevYear && (
        <div className="fixed bottom-8 left-4 sm:left-8 z-9998">
          <PillButton year={prevYear} locale={locale} dir="prev" onNavigate={handleNavigate} />
        </div>
      )}

      {/* ── Right / Next ── */}
      {nextYear && (
        <div className="fixed bottom-8 right-4 sm:right-8 z-9998">
          <PillButton year={nextYear} locale={locale} dir="next" onNavigate={handleNavigate} />
        </div>
      )}
    </>
  );
}
