"use client";

import "./hero.css";

import { translate } from "@/lib";
import { useTranslation } from 'react-i18next';
import { twMerge } from "tailwind-merge";
import { style } from "@/config";
import { Button } from "@/components/2025/ui/button";
import OrbitComponent from "./components/orbit-component";
import { motion } from "framer-motion";
import { PATH } from "@/config/path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ResumeBuilderModal } from "@/components/resume/ResumeBuilderModal";

export default function HeroSection() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const year = pathParts[1] ?? "2026";
  const locale = pathParts[2] ?? "en";

  return (
    <section
      id="hero-section"
      className={twMerge(
        "h-full min-h-dvh flex flex-col xl:pt-44 sm:pt-20 pt-12 gap-20 items-center",
        style.sectionContainerPaddingX
      )}
    >
      <div className="flex md:flex-row flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            bounce: 0.5,
          }}
          className="md:basis-1/2 flex flex-col sm:items-start items-center justify-center h-full w-full"
        >
          <h1 className="font-bold sm:text-start text-center">
            <span className="text-amethyst-500 xl:text-h1 lg:text-h2 xs:text-h3 text-h4">
              {translate(t, "home.hero.slogan.title.1")}
            </span>
            <span className="text-woodsmoke-500 dark:text-woodsmoke-50 xl:text-h1 lg:text-h2 xs:text-h3 text-h4">
              {translate(t, "home.hero.slogan.title.2")}
            </span>
          </h1>
          <p className="lg:text-h5 md:text-large text-normal lg:font-medium font-normal mt-4 text-woodsmoke-500 dark:text-woodsmoke-300 sm:text-start text-center">
            {translate(t, "home.hero.slogan.subtitle")}
          </p>
          <div className="mt-16 flex sm:flex-row flex-col gap-3">
            <ResumeBuilderModal
              trigger={
                <Button className="sm:w-48 w-full xl:py-5 py-3.5 bg-amethyst-500 hover:bg-amethyst-400 focus:bg-amethyst-800">
                  <span className="text-amethyst-50 xl:text-large xs:text-normal text-button">
                    Build My Resume
                  </span>
                </Button>
              }
            />
            <Link href={PATH.ABOUT.getPath(year, locale)} passHref className="block sm:w-48 w-full">
              <Button
                variant="outline"
                className="w-full xl:py-5 py-3.5 border-amethyst-500/40 text-amethyst-500 hover:bg-amethyst-500/10"
              >
                <span className="xl:text-large xs:text-normal text-button">
                  {translate(t, "home.hero.slogan.button")}
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Orbbiting Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            bounce: 0.5,
          }}
          className="md:basis-1/2 basis-full"
        >
          {/* XL */}
          <OrbitComponent
            id={"orbit-XL"}
            height={"800px"}
            fixedHeight="750px"
            hiddenClass={"xl:flex lg:hidden hidden"}
            orbitProperties={{
              1: {
                iconSize: 50,
                radius: 65,
                speed: 2,
              },
              2: {
                iconSize: 40,
                radius: 170,
                speed: 1.2,
              },
              3: {
                iconSize: 60,
                radius: 270,
                speed: 1.4,
              },
              4: {
                iconSize: 70,
                radius: 355,
                speed: 1.6,
              },
            }}
          />

          {/* LG */}
          <OrbitComponent
            id={"orbit-LG"}
            height={"650px"}
            fixedHeight="650px"
            hiddenClass={"lg:flex xl:hidden hidden"}
            orbitProperties={{
              1: {
                iconSize: 40,
                radius: 60,
                speed: 2,
              },
              2: {
                radius: 140,
              },
              3: {
                iconSize: 45,
                radius: 200,
                speed: 1.4,
              },
              4: {
                iconSize: 50,
                radius: 260,
                speed: 1.6,
              },
            }}
          />

          {/* MD */}
          <OrbitComponent
            id={"orbit-MD"}
            height={"650px"}
            fixedHeight="650px"
            hiddenClass={"md:flex sm:hidden lg:hidden hidden"}
            orbitProperties={{
              1: {
                iconSize: 25,
                radius: 40,
                speed: 2,
              },
              2: {
                radius: 100,
              },
              3: {
                iconSize: 30,
                radius: 150,
                speed: 1.4,
              },
              4: {
                iconSize: 35,
                radius: 190,
                speed: 1.6,
              },
            }}
          />

          {/* SM */}
          <OrbitComponent
            id={"orbit-SM"}
            height={"650px"}
            fixedHeight="400px"
            hiddenClass={"sm:flex md:hidden lg:hidden hidden"}
            orbitProperties={{
              1: {
                iconSize: 40,
                radius: 50,
                speed: 2,
              },
              2: {
                radius: 100,
              },
              3: {
                iconSize: 45,
                radius: 150,
                speed: 1.4,
              },
              4: {
                iconSize: 50,
                radius: 190,
                speed: 1.6,
              },
            }}
          />

          <OrbitComponent
            id={"orbit-XS"}
            height={"650px"}
            fixedHeight="400px"
            hiddenClass={"xs:flex sm:hidden md:hidden lg:hidden hidden"}
            orbitProperties={{
              1: {
                iconSize: 30,
                radius: 50,
                speed: 2,
              },
              2: {
                radius: 100,
              },
              3: {
                iconSize: 35,
                radius: 150,
                speed: 1.4,
              },
              4: {
                iconSize: 40,
                radius: 190,
                speed: 1.6,
              },
            }}
          />

          <OrbitComponent
            id={"orbit-XS"}
            height={"650px"}
            fixedHeight="350px"
            hiddenClass={"flex xs:hidden sm:hidden md:hidden lg:hidden"}
            orbitProperties={{
              1: {
                iconSize: 30,
                radius: 30,
                speed: 2,
              },
              2: {
                radius: 80,
              },
              3: {
                iconSize: 30,
                radius: 125,
                speed: 1.4,
              },
              4: {
                iconSize: 30,
                radius: 165,
                speed: 1.6,
              },
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
