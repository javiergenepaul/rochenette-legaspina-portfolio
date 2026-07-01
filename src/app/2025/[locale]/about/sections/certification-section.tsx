"use client";

import { getCertificationExperience, style } from "@/config";
import { translate } from "@/lib";
import { useTranslation } from 'react-i18next';
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CertificationSection() {
  const { t, i18n } = useTranslation();
  const CERTIFICATION_EXPERIENCE = getCertificationExperience(i18n.language);
  return (
    <section
      id="certification-section"
      className={twMerge(
        "flex flex-col lg:gap-10 gap-8",
        style.sectionContainerPaddingX
      )}
    >
      <motion.h3
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          bounce: 0.5,
        }}
        className="xl:text-h2 lg:text-h3 sm:text-h4 text-h5 font-semibold text-scorpion-600 dark:text-woodsmoke-50 text-center"
      >
        {translate(t, "about.certificate.title")}
      </motion.h3>
      <div className="grid md:grid-cols-1 grid-cols-1 gap-6 xl:w-8/12 lg:w-9/12 w-full mx-auto">
        {CERTIFICATION_EXPERIENCE.map((cert, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              bounce: 0.2,
            }}
            key={index}
            className={`flex xl:flex-row lg:flex-row md:flex-col sm:flex-row xs:flex-col flex-col sm:items-start items-center gap-6 p-6 rounded-lg dark:bg-woodsmoke-900 shadow-content-card hover:border-amethyst-500 dark:border-woodsmoke-900 cursor-pointer hover:dark:border-amethyst-50 ${
              index === 0
                ? "bg-[#EFCFFC] border border-[#EFCFFC]"
                : "bg-[#FDEEBA] border border-[#FDEEBA]"
            }`}
          >
            <Image
              className="object-contain xl:h-36 xl:w-36 lg:h-28 lg:w-28 md:h-24 md:w-24 sm:h-20 sm:w-20 w-16 h-16 shadow-[0_0_14.98px_rgba(0,0,0,0.14)] rounded-2xl bg-scorpion-50 leading-4.75"
              src={cert.image}
              alt={cert.imageAlt}
            />
            <div className="flex flex-col gap-2 items-center md:items-start mt-6">
              <span className="xl:text-large text-normal font-bold text-scorpion-700 dark:text-woodsmoke-50">
                {cert.title}
              </span>
              <span className="xl:text-large text-normal font-medium text-scorpion-600 dark:text-woodsmoke-50 leading-4.75">
                {cert.subTitle}
              </span>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                {cert.description.map((item, descIndex) => (
                  <li
                    className="xl:text-large text-normal text-scorpion-500 dark:text-woodsmoke-300 leading-4.75 text-center xs:text-left"
                    key={descIndex}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
