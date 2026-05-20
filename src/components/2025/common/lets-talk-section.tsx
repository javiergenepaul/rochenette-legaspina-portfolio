"use client";

import { Button } from "@/components/2025/ui/button";
import { style } from "@/config";
import { translate } from "@/lib";
import { useTranslation } from 'react-i18next';
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export default function LetsTalkSection() {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <section
      id="lets-talk-section"
      className={twMerge(
        "bg-amethyst-100 dark:bg-woodsmoke-900 xl:py-52 :G:py-40 py-20 flex justify-center items-center",
        style.sectionContainerPaddingX
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          bounce: 0.5,
        }}
        className="flex flex-col gap-16 items-center w-full "
      >
        <div className="flex flex-col">
          <h2 className="xl:text-h1 lg:text-h2 sm:text-h3 text-h4 font-bold text-scorpion-400 dark:text-woodsmoke-50 text-center">
            {translate(t, "about.letsTalk.title.1")}
          </h2>
          <h2 className="xl:text-h1 lg:text-h2 sm:text-h3 text-h4 font-bold text-amethyst-400 dark:text-amethyst-400 text-center">
            {translate(t, "about.letsTalk.title.2")}
          </h2>
        </div>
        <div className="flex md:gap-6 gap-5 md:flex-row flex-col items-center sm:w-6/12 xs:w-8/12 w-full">
          <Button
            className="xl:px-20 lg:px-14 md:px-20 w-full xl:py-5 sm:py-3.5 bg-amethyst-500 text-normal text-scorpion-50 hover:bg-amethyst-400 focus:bg-amethyst-800"
            variant={"default"}
            onClick={() => {
              window.open(
                "https://calendar.app.google/Gij4Kb5yDv9YU7Q29",
                "_blank"
              );
            }}
          >
            <span className="xl:text-large xs:text-normal text-button">
              {translate(t, "about.letsTalk.button.letsTalk")}
            </span>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
