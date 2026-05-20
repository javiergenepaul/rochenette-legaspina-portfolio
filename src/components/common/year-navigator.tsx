"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLoadingStore } from "@/store";

const YEARS = ["2025", "2026", "2027"] as const;
type Year = (typeof YEARS)[number];

const YEAR_LABELS: Record<Year, string> = {
  "2025": "2025",
  "2026": "2026",
  "2027": "2027",
};

const IFRAME_W = 1280;
const IFRAME_H = 800;
const PREVIEW_W = 160;
const PREVIEW_H = 100;
const SCALE = PREVIEW_W / IFRAME_W;

// ─── Compact pill (mobile) ────────────────────────────────────────────────────

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

// ─── Full preview card (desktop) ─────────────────────────────────────────────

function PreviewCard({
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
  const [hovered, setHovered] = useState(false);
  const href = `/${year}/${locale}`;

  return (
    <div className="relative" style={{ width: PREVIEW_W, height: PREVIEW_H }}>
      {/* Label */}
      <div
        className={`absolute -top-6 left-0 flex items-center gap-1.5 transition-opacity duration-200 ${
          hovered ? "opacity-100" : "opacity-60"
        }`}
      >
        {dir === "prev" && (
          <span
            className={`text-xs text-amethyst-400 transition-transform duration-200 ${
              hovered ? "-translate-x-1" : "translate-x-0"
            }`}
          >
            ←
          </span>
        )}
        <span className="text-xs font-semibold text-amethyst-500 dark:text-amethyst-400 tracking-widest uppercase">
          {YEAR_LABELS[year]}
        </span>
        {dir === "next" && (
          <span
            className={`text-xs text-amethyst-400 transition-transform duration-200 ${
              hovered ? "translate-x-1" : "translate-x-0"
            }`}
          >
            →
          </span>
        )}
      </div>

      {/* Glow */}
      <div
        className={`absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 ${
          hovered
            ? "shadow-[0_0_32px_6px_rgba(99,102,241,0.4)]"
            : "shadow-[0_0_14px_2px_rgba(99,102,241,0.15)]"
        }`}
      />

      {/* Card */}
      <div
        className={`relative w-full h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border ${
          hovered
            ? "border-amethyst-400/70 scale-[1.04]"
            : "border-amethyst-500/20 scale-100"
        }`}
        onClick={() => onNavigate(href)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            width: IFRAME_W,
            height: IFRAME_H,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        >
          <iframe
            src={href}
            width={IFRAME_W}
            height={IFRAME_H}
            scrolling="no"
            tabIndex={-1}
            aria-hidden="true"
            style={{ border: "none", display: "block" }}
          />
        </div>

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 flex items-end justify-center pb-2 bg-linear-to-t from-amethyst-950/70 via-transparent to-transparent transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-[10px] font-semibold text-amethyst-50 tracking-wide bg-amethyst-500 px-3 py-1 rounded-full">
            {`Visit ${year} →`}
          </span>
        </div>
      </div>
    </div>
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
          {/* Mobile: pill */}
          <div className="md:hidden">
            <PillButton year={prevYear} locale={locale} dir="prev" onNavigate={handleNavigate} />
          </div>
          {/* Desktop: preview card */}
          <div className="hidden md:block">
            <PreviewCard year={prevYear} locale={locale} dir="prev" onNavigate={handleNavigate} />
          </div>
        </div>
      )}

      {/* ── Right / Next ── */}
      {nextYear && (
        <div className="fixed bottom-8 right-4 sm:right-8 z-9998">
          {/* Mobile: pill */}
          <div className="md:hidden">
            <PillButton year={nextYear} locale={locale} dir="next" onNavigate={handleNavigate} />
          </div>
          {/* Desktop: preview card */}
          <div className="hidden md:block">
            <PreviewCard year={nextYear} locale={locale} dir="next" onNavigate={handleNavigate} />
          </div>
        </div>
      )}
    </>
  );
}
