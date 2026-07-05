"use client";

import { Linkedin, Mail, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { translate } from "@/lib";

const SOCIAL = [
  { href: "mailto:rochenettelegaspina18@gmail.com",                        Icon: Mail,     label: "Email" },
  { href: "https://www.linkedin.com/in/rochenette-legaspina-677a64263/",   Icon: Linkedin, label: "LinkedIn" },
] as const;

export default function Footer2026() {
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <footer
      className={cn(
        "border-t text-center py-8 px-[7%] text-small",
        isDark
          ? "bg-woodsmoke-950 border-woodsmoke-700 text-woodsmoke-500"
          : "bg-woodsmoke-50 border-woodsmoke-200 text-woodsmoke-500"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="31" fill="#D32F2F"/>
          <text
            x="32" y="40"
            textAnchor="middle"
            fontFamily="'Poppins',system-ui"
            fontSize="20" fontWeight="500"
            fill="white" letterSpacing="-1"
          >RL</text>
        </svg>
        <span className="font-poppins font-semibold text-small text-woodsmoke-900 dark:text-woodsmoke-50">
          Rochenette Legaspina
        </span>
      </div>

      {/* Social links */}
      <div className="flex items-center justify-center gap-2 my-3">
        {SOCIAL.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              "w-8 h-8 rounded-lg border inline-flex items-center justify-center",
              "transition-all duration-300 hover:-translate-y-0.5",
              isDark
                ? "bg-woodsmoke-900 border-woodsmoke-700 text-woodsmoke-400 hover:border-amethyst-500 hover:text-amethyst-400 hover:bg-amethyst-500/10"
                : "bg-woodsmoke-100 border-woodsmoke-200 text-woodsmoke-400 hover:border-amethyst-500 hover:text-amethyst-500 hover:bg-amethyst-50"
            )}
          >
            <Icon size={15} strokeWidth={1.75} />
          </a>
        ))}
      </div>

      <p className="text-caption">
        © {new Date().getFullYear()} Rochenette Legaspina — {translate(t, "portfolio2026.footer.builtWith")}{" "}
        <Heart size={11} className="inline text-amethyst-500 fill-amethyst-500" />{" "}
        {translate(t, "portfolio2026.footer.andCoffee")}
      </p>
    </footer>
  );
}
