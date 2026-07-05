"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { BookOpen, User2, Key } from "lucide-react";
import { cn } from "@/lib/utils";
import { translate } from "@/lib";
import { getBooks } from "../data/portfolio-data";

const COVER_GRADIENTS = [
  "linear-gradient(135deg,#D32F2F,#E57373)",
  "linear-gradient(135deg,#7B1FA2,#D32F2F)",
  "linear-gradient(135deg,#D32F2F,#e65100)",
  "linear-gradient(135deg,#880E4F,#D32F2F)",
  "linear-gradient(135deg,#b71c1c,#AD1457)",
];

export default function BooksSection2026() {
  const locale = usePathname().split("/")[2] ?? "en";
  const BOOKS = getBooks(locale);
  const { t } = useTranslation();
  return (
    <section
      id="books"
      className="py-24 px-[7%] bg-white dark:bg-woodsmoke-800"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 text-amethyst-500 dark:text-amethyst-400 font-poppins font-bold text-[0.72rem] uppercase tracking-[2.5px] mb-2">
        <BookOpen size={13} strokeWidth={1.75} />
        {translate(t, "portfolio2026.books.eyebrow")}
      </div>
      <h2
        className="font-poppins font-bold text-woodsmoke-900 dark:text-woodsmoke-50 mb-2"
        style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
      >
        {translate(t, "portfolio2026.books.headingPre")} <span className="text-amethyst-500">{translate(t, "portfolio2026.books.headingHighlight")}</span>
      </h2>
      <p className="text-woodsmoke-500 dark:text-woodsmoke-400 text-[0.95rem] leading-[1.75] max-w-140 mb-12">
        {translate(t, "portfolio2026.books.intro")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BOOKS.filter(b => !b.hidden).map(({ title, author, tag, insight, takeaway }, i) => (
          <div
            key={title}
            className={cn(
              "flex flex-col rounded-[22px] overflow-hidden border",
              "bg-woodsmoke-50 dark:bg-woodsmoke-900",
              "border-woodsmoke-200 dark:border-woodsmoke-700",
              "shadow-[0_4px_16px_rgba(0,0,0,.06)]",
              "transition-all duration-300 group",
              "hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(211,47,47,.13)]"
            )}
          >
            {/* Cover */}
            <div
              className="h-37 relative flex items-center justify-center overflow-hidden"
              style={{ background: COVER_GRADIENTS[i % COVER_GRADIENTS.length] }}
            >
              {/* Book spine effect */}
              <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-black/18" />
              <BookOpen
                size={52}
                className="text-white/75 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                strokeWidth={1.25}
              />
            </div>

            {/* Body */}
            <div className="flex flex-col gap-2 p-5 flex-1">
              {/* Tag */}
              <div className="inline-flex items-center gap-1 bg-amethyst-50 dark:bg-amethyst-500/15 text-amethyst-500 dark:text-amethyst-300 text-[0.67rem] font-poppins font-bold uppercase tracking-[1.2px] px-2.5 py-1 rounded-full w-fit">
                <BookOpen size={11} strokeWidth={2} />
                {tag}
              </div>

              <h3 className="font-poppins font-bold text-[0.97rem] text-woodsmoke-900 dark:text-woodsmoke-50 leading-[1.3]">
                {title}
              </h3>

              <div className="flex items-center gap-1 text-amethyst-500 dark:text-amethyst-400 font-poppins font-semibold text-[0.78rem]">
                <User2 size={13} strokeWidth={1.75} />
                {author}
              </div>

              <p
                className="text-[0.82rem] text-woodsmoke-500 dark:text-woodsmoke-400 leading-[1.72] flex-1"
                dangerouslySetInnerHTML={{ __html: insight.replace(/<em>/g, '<em class="text-amethyst-500 dark:text-amethyst-300 not-italic font-semibold">') }}
              />

              <div className="pt-3 mt-1 border-t border-woodsmoke-200 dark:border-woodsmoke-700">
                <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-poppins font-semibold text-woodsmoke-400">
                  <Key size={12} className="text-amethyst-500" strokeWidth={2} />
                  {takeaway}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
