"use client";

import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  User, Wrench, GraduationCap, FolderOpen,
  BookOpen, Compass, Send,
  Sun, Moon, ChevronDown, AlignJustify, X, Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { translate } from "@/lib";
import { use2026UIStore } from "@/app/2026/store/ui-store";

function useNavLinks() {
  const { t } = useTranslation();
  return [
    { href: "#about",        label: translate(t, "portfolio2026.nav.about"),      Icon: User },
    { href: "#skills",       label: translate(t, "portfolio2026.nav.skills"),     Icon: Wrench },
    { href: "#work",         label: translate(t, "portfolio2026.nav.experience"), Icon: Briefcase },
    { href: "#education",    label: translate(t, "portfolio2026.nav.education"),  Icon: GraduationCap },
    { href: "#projects",     label: translate(t, "portfolio2026.nav.projects"),   Icon: FolderOpen },
    { href: "#books",        label: translate(t, "portfolio2026.nav.books"),      Icon: BookOpen },
    { href: "#approach",     label: translate(t, "portfolio2026.nav.approach"),   Icon: Compass },
    { href: "#gallery",      label: translate(t, "portfolio2026.nav.explorer"),   Icon: Compass },
  ] as const;
}

const LOCALES = [
  { code: "en", label: "English",  short: "EN", flag: <FlagEN /> },
  { code: "de", label: "Deutsch",  short: "DE", flag: <FlagDE /> },
  { code: "fr", label: "Français", short: "FR", flag: <FlagFR /> },
] as const;

function FlagEN() {
  return (
    <svg viewBox="0 0 20 14" className="w-5 h-3.5 rounded-sm">
      <rect width="20" height="14" fill="#B22234"/>
      {[1.08,3.23,5.38,7.54,9.69,11.85].map((y) => (
        <rect key={y} y={y} width="20" height="1.08" fill="#fff"/>
      ))}
      <rect width="8" height="7.54" fill="#3C3B6E"/>
    </svg>
  );
}
function FlagDE() {
  return (
    <svg viewBox="0 0 20 14" className="w-5 h-3.5 rounded-sm">
      <rect width="20" height="4.67" fill="#000"/>
      <rect y="4.67" width="20" height="4.67" fill="#D00"/>
      <rect y="9.33" width="20" height="4.67" fill="#FFCE00"/>
    </svg>
  );
}
function FlagFR() {
  return (
    <svg viewBox="0 0 20 14" className="w-5 h-3.5 rounded-sm">
      <rect width="6.67" height="14" fill="#002395"/>
      <rect x="6.67" width="6.67" height="14" fill="#fff"/>
      <rect x="13.33" width="6.67" height="14" fill="#ED2939"/>
    </svg>
  );
}

export default function Navigation2026() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  // isDark defaults to false so server & initial client render match (hydration safe)
  const isDark = mounted && resolvedTheme === "dark";
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const NAV_LINKS = useNavLinks();
  const { isMobileMenuOpen, isLangOpen, toggleMobileMenu, closeMobileMenu, toggleLang, closeLang } =
    use2026UIStore();

  const parts = pathname.split("/");
  const currentLocale = parts[2] ?? "en";
  const activeLocale = LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

  // On sub-pages (e.g. /2026/en/projects/slug) hash links must be absolute
  const rootPath = `/2026/${currentLocale}`;
  const isRoot = pathname === rootPath || pathname === `${rootPath}/`;
  function navHref(hash: string) {
    return isRoot ? hash : `${rootPath}${hash}`;
  }

  const langRef = useRef<HTMLDivElement>(null);

  // Close lang dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        closeLang();
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [closeLang]);

  function setLocale(code: string) {
    closeLang();
    closeMobileMenu();
    // Preserve the current path (e.g. /2026/en/projects/slug -> /2026/de/projects/slug)
    const nextParts = [...parts];
    nextParts[2] = code;
    router.push(nextParts.join("/") || `/2026/${code}`);
  }

  return (
    <>
      {/* ── Desktop nav ─────────────────────────────────────────────────── */}
      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-9999",
          "w-[calc(100%-3rem)] max-w-275 h-14.5",
          "flex items-center justify-between px-5",
          "rounded-full border",
          "backdrop-blur-2xl backdrop-saturate-150",
          "transition-all duration-300",
          isDark
            ? "bg-woodsmoke-950/60 border-amethyst-500/25 shadow-[0_8px_32px_rgba(211,47,47,.18)]"
            : "bg-white/55 border-amethyst-500/18 shadow-[0_8px_32px_rgba(211,47,47,.1)]"
        )}
      >
        {/* Logo */}
        <a href={navHref("#hero")} className="shrink-0" aria-label="RL — Home">
          <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="31" fill="#D32F2F"/>
            <circle cx="32" cy="32" r="25" stroke="rgba(255,255,255,0.25)" strokeWidth="0.75"/>
            <text
              x="32" y="42"
              textAnchor="middle"
              fontFamily="'Poppins',system-ui"
              fontSize="22" fontWeight="500"
              fill="white" letterSpacing="-1"
            >RL</text>
            <circle cx="50" cy="16" r="4" fill="white" fillOpacity="0.9"/>
          </svg>
        </a>

        {/* Links — hidden on mobile */}
        <ul className="hidden lg:flex gap-3.5 list-none">
          {NAV_LINKS.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={navHref(href)}
                className={cn(
                  "group flex items-center gap-1 font-poppins font-medium text-[0.8rem] no-underline whitespace-nowrap",
                  "relative pb-0.5 transition-colors duration-300",
                  "text-woodsmoke-500 hover:text-amethyst-500",
                  "dark:text-woodsmoke-400 dark:hover:text-amethyst-400",
                  "after:content-[''] after:absolute after:-bottom-0.5 after:left-0",
                  "after:h-0.5 after:w-0 after:rounded-full after:bg-amethyst-500",
                  "after:transition-[width] after:duration-300 hover:after:w-full"
                )}
              >
                <Icon size={13} className="shrink-0 transition-colors duration-300 text-woodsmoke-400 group-hover:text-amethyst-500 dark:group-hover:text-amethyst-400" />
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              "w-8.5 h-8.5 rounded-full flex items-center justify-center",
              "border transition-all duration-300 hover:scale-110",
              isDark
                ? "bg-amethyst-500/15 border-amethyst-500/30 text-amethyst-300 hover:bg-amethyst-500 hover:text-white"
                : "bg-amethyst-50 border-amethyst-100 text-amethyst-500 hover:bg-amethyst-500 hover:text-white"
            )}
            title="Toggle theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Language selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={toggleLang}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5",
                "font-poppins font-bold text-caption transition-all duration-300",
                isLangOpen
                  ? "bg-amethyst-500 text-white border-amethyst-500"
                  : isDark
                    ? "bg-amethyst-500/12 border-amethyst-500/30 text-amethyst-300 hover:bg-amethyst-500 hover:text-white"
                    : "bg-amethyst-50 border-amethyst-100 text-amethyst-600 hover:bg-amethyst-500 hover:text-white"
              )}
            >
              {activeLocale.flag}
              <span>{activeLocale.short}</span>
              <ChevronDown
                size={10}
                strokeWidth={2.5}
                className={cn("transition-transform duration-200", isLangOpen && "rotate-180")}
              />
            </button>

            {isLangOpen && (
              <div
                className={cn(
                  "absolute top-[calc(100%+8px)] right-0 min-w-37.5 rounded-[14px] overflow-hidden z-50",
                  "border shadow-[0_8px_28px_rgba(0,0,0,.12)]",
                  "animate-[fade-down_0.18s_ease]",
                  isDark
                    ? "bg-woodsmoke-800 border-woodsmoke-700"
                    : "bg-white border-woodsmoke-200"
                )}
              >
                {LOCALES.map((locale) => (
                  <button
                    key={locale.code}
                    onClick={() => setLocale(locale.code)}
                    className={cn(
                      "flex items-center gap-2.5 w-full px-4 py-2.5 text-left",
                      "font-poppins font-semibold text-[0.8rem] border-none",
                      "transition-colors duration-200",
                      locale.code === currentLocale
                        ? isDark
                          ? "bg-amethyst-500/15 text-amethyst-300"
                          : "bg-amethyst-50 text-amethyst-500"
                        : isDark
                          ? "bg-transparent text-woodsmoke-100 hover:bg-amethyst-500/12 hover:text-amethyst-300"
                          : "bg-transparent text-woodsmoke-800 hover:bg-amethyst-50 hover:text-amethyst-500"
                    )}
                  >
                    {locale.flag}
                    {locale.label}
                    <span className={cn("ml-auto text-[0.68rem]", isDark ? "text-woodsmoke-500" : "text-woodsmoke-400")}>
                      {locale.short}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <a
            href="https://calendar.app.google/Gij4Kb5yDv9YU7Q29"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full whitespace-nowrap shrink-0",
              "font-poppins font-bold text-[0.78rem] text-white no-underline",
              "bg-linear-to-br from-amethyst-500 to-amethyst-700",
              "shadow-[0_4px_14px_rgba(211,47,47,.35)]",
              "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(211,47,47,.45)]"
            )}
          >
            <Send size={13} strokeWidth={1.75} className="shrink-0" />
            {translate(t, "portfolio2026.nav.letsTalk")}
          </a>

          {/* Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-1 text-amethyst-500"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <AlignJustify size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ─────────────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "fixed top-21.5 left-6 right-6 z-9998",
            "flex flex-col gap-3 rounded-[18px] p-6",
            "border backdrop-blur-2xl",
            "animate-[fade-down_0.18s_ease]",
            isDark
              ? "bg-woodsmoke-950/60 border-amethyst-500/25"
              : "bg-white/55 border-amethyst-500/18"
          )}
        >
          {NAV_LINKS.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={navHref(href)}
              onClick={closeMobileMenu}
              className={cn(
                "flex items-center gap-2 py-1.5 border-b font-semibold text-[0.9rem] no-underline",
                "transition-colors duration-200",
                isDark
                  ? "border-woodsmoke-700 text-woodsmoke-100 hover:text-amethyst-400"
                  : "border-woodsmoke-200 text-woodsmoke-800 hover:text-amethyst-500"
              )}
            >
              <Icon size={16} className="text-amethyst-500" strokeWidth={1.75} />
              {label}
            </a>
          ))}
          <a
            href="https://calendar.app.google/Gij4Kb5yDv9YU7Q29"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className={cn(
              "mt-1 flex items-center justify-center gap-2 py-2.5 rounded-xl",
              "font-poppins font-bold text-[0.88rem] text-white no-underline",
              "bg-linear-to-br from-amethyst-500 to-amethyst-700"
            )}
          >
            <Send size={14} strokeWidth={1.75} />
            {translate(t, "portfolio2026.nav.letsTalk")}
          </a>
        </div>
      )}
    </>
  );
}
