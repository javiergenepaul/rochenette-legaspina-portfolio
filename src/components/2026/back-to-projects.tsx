"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { translate } from "@/lib";

export default function BackToProjects({ locale }: { locale: string }) {
  const { t } = useTranslation();
  return (
    <a
      href={`/2026/${locale}#projects`}
      className="inline-flex items-center gap-2 mb-8 text-[0.82rem] font-poppins font-semibold text-amethyst-500 hover:text-amethyst-700 dark:text-amethyst-300 dark:hover:text-amethyst-400 transition-colors duration-200 group"
    >
      <span className="w-7 h-7 rounded-full bg-amethyst-50 dark:bg-amethyst-500/15 border border-amethyst-100 dark:border-amethyst-500/25 flex items-center justify-center group-hover:bg-amethyst-500 group-hover:border-amethyst-500 group-hover:text-white transition-all duration-200">
        <ArrowLeft size={13} strokeWidth={2.5} />
      </span>
      {translate(t, "portfolio2026.projectDetail.backToProjects")}
    </a>
  );
}
