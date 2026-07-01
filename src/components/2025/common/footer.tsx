"use client";

import Link from "next/link";
import { getNavLinks, SOCIAL_LINKS, style } from "@/config";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { translate } from "@/lib";
import { useTranslation } from 'react-i18next';
import { LinkPreview } from "../ui/link-preview";
import { useTheme } from "next-themes";
import { Separator } from "../ui/separator";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [grabbingIcon, setGrabbingIcon] = useState<boolean>(false);

  const pathParts = pathname.split("/");
  const year = pathParts[1] ?? "2026";
  const locale = pathParts[2] ?? "en";
  const NAV_LINKS = getNavLinks(year, locale);

  return (
    <motion.footer
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        type: "spring",
        bounce: 0.5,
      }}
      className={twMerge(
        "mt-20 flex flex-col gap-8 pb-7",
        style.sectionContainerPaddingX
      )}
    >
      <motion.div
        drag
        dragSnapToOrigin
        className={twMerge(
          "h-12 w-12 rounded-full bg-amethyst-500",
          grabbingIcon ? "cursor-grabbing" : "cursor-grab"
        )}
        onDragStart={() => setGrabbingIcon(true)}
        onDragEnd={() => setGrabbingIcon(false)}
      />
      <div className="flex flex-col gap-10">
        <div
          id="social-links"
          className="flex sm:flex-row flex-col sm:justify-between gap-6 justify-start sm:items-center items-start"
        >
          <h3 className="xl:text-h2 lg:text-h3 sm:text-h4 text-h5 md:font-semibold sm:w-86.75 md:w-full font-semibold text-scorpion-500 dark:text-woodsmoke-50">
            {translate(t, "footer.slogan")}
          </h3>
          <ul className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link, index) => (
              <li className="w-11 h-11" key={index}>
                <AnimatedTooltip
                  key={index}
                  items={[
                    {
                      id: 1,
                      name: link.name,
                      designation: "",
                      image: link.image,
                      imageAlt: link.alt,
                      className:
                        "h-11 w-auto flex items-center justify-center object-contain",
                      leftClass: "left-[-30px]",
                      url: link.url,
                    },
                  ]}
                />
              </li>
            ))}
          </ul>
        </div>
        <Separator className="sm:hidden block bg-woodsmoke-200 dark:bg-woodsmoke-600" />
        <ul
          id="nav-link"
          className="flex justify-between sm:flex-row gap-2 flex-col sm:w-6/12 xl:w-4/12 md:w-5/12 sm:mx-auto"
        >
          <strong className="text-normal font-medium text-woodsmoke-600 dark:text-woodsmoke-50 pt-2 sm:hidden block">
            {translate(t, "navigation.menu")}
          </strong>
          {NAV_LINKS.map((link, index) => (
            <li key={index}>
              <Link
                href={link.to}
                className={twMerge(
                  "text-large transition-transform ease-in-out",
                  pathname === link.to
                    ? "text-amethyst-500 font-bold"
                    : "text-woodsmoke-500 hover:text-woodsmoke-800 dark:hover:text-woodsmoke-200 dark:text-woodsmoke-300 font-normal"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex md:flex-row flex-col items-center justify-center gap-2">
          <span
            id="copyright"
            className="text-center text-woodsmoke-400 dark:text-woodsmoke-300 xl:text-normal text-caption"
          >
            {translate(t, "footer.copyright")}
          </span>
          <span className="font-bold text-amethyst-500 dark:text-amethyst-500 xl:text-normal text-caption">
            <LinkPreview
              target="_blank"
              url="https://gene-paul-mar-javier.dev/"
              className="font-bold text-amethyst-500 dark:text-amethyst-500 xl:text-normal text-caption"
              theme={resolvedTheme}
            >
              {translate(t, "footer.developer")}
            </LinkPreview>
          </span>
        </div>
      </div>
    </motion.footer>
  );
}
