"use client";

import { getEducationExperience, LINK_URL, style } from "@/config";
import { translate } from "@/lib";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function EducationSection() {
  const { t, i18n } = useTranslation();
  const EDUCATION_EXPERIENCE = getEducationExperience(i18n.language);
  return (
    <section
      id="education-section"
      className={twMerge(
        "flex flex-col lg:gap-10 gap-8",
        style.sectionContainerPaddingX
      )}
    >
      <motion.h3 className="xl:text-h2 lg:text-h3 sm:text-h4 text-h5 font-semibold text-scorpion-600 dark:text-woodsmoke-50 text-center">
        {translate(t, "about.education.title")}
      </motion.h3>
      <div className="grid md:grid-cols-1 grid-cols-1 gap-6 xl:w-8/12 lg:w-9/12 w-full  mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            bounce: 0.2,
          }}
          onClick={() => window.open(LINK_URL.UC, "_blank")}
          className="bg-[#D2E3F9] border dark:border-woodsmoke-900 hover:dark:border-amethyst-50 border-[#D2E3F9] hover:border-amethyst-500 flex xl:flex-row lg:flex-row md:flex-col sm:flex-row xs:flex-col flex-col sm:items-start items-center gap-6 p-6 rounded-lg dark:bg-woodsmoke-900 shadow-content-card cursor-pointer"
        >
          <Image
            className="object-contain xl:h-36 xl:w-36 lg:h-28 lg:w-28 md:h-24 md:w-24 sm:h-20 sm:w-20 w-16 h-16 shadow-[0_0_14.98px_rgba(0,0,0,0.14)] rounded-2xl bg-scorpion-50 leading-4.75"
            src={EDUCATION_EXPERIENCE[0].image}
            alt={EDUCATION_EXPERIENCE[0].imageAlt}
          />
          <div className="flex flex-col gap-2 items-center md:items-start mt-6">
            <span className="xl:text-large text-normal font-bold text-scorpion-700 dark:text-woodsmoke-50">
              {EDUCATION_EXPERIENCE[0].title}
            </span>
            <span className="xl:text-large text-normal font-medium text-scorpion-600 dark:text-woodsmoke-50 leading-4.75">
              {EDUCATION_EXPERIENCE[0].subTitle}{" "}
              {`(${EDUCATION_EXPERIENCE[0].startDate?.format(
                "YYYY"
              )} - ${EDUCATION_EXPERIENCE[0].endDate?.format("YYYY")})`}
            </span>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              {EDUCATION_EXPERIENCE[0].description.map((item, index) => (
                <li
                  className="xl:text-large text-normal text-scorpion-500 dark:text-woodsmoke-300 leading-4.75 text-center xs:text-left"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
