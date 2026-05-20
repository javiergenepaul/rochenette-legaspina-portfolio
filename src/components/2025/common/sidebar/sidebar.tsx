import Link from "next/link";
import React, { useState } from "react";
import { Drawer } from "vaul";
import { Button } from "@/components/2025/ui/button";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { getNavLinks, SOCIAL_LINKS } from "@/config";
import { Separator } from "@/components/2025/ui/separator";
import { translate } from "@/lib";
import { usePathname } from "next/navigation";
import { useTranslation } from 'react-i18next';
import { ThemeToggleSwitch } from "../theme-toggle-switch";

export default function Sidebar() {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const { t } = useTranslation();

  const pathParts = pathname.split("/");
  const year = pathParts[1] ?? "2026";
  const locale = pathParts[2] ?? "en";
  const NAV_LINKS = getNavLinks(year, locale);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Drawer.Root open={isOpen} direction="right">
      <Drawer.Trigger>
        <svg
          onClick={() => setIsOpen(!isOpen)}
          className="stroke-woodsmoke-600 dark:stroke-woodsmoke-50"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`Burger icon`}
        >
          <path
            d="M11 17H19M5 12H19M11 7H19"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => setIsOpen(!isOpen)}
          className="fixed inset-0 bg-[#0E0D0F]/40 dark:bg-transparent"
        />
        <Drawer.Content className="pb-24 bg-woodsmoke-50 dark:bg-woodsmoke-900 py-6 px-4 flex flex-col gap-10 h-screen w-[320px] fixed top-0 right-0 outline-none z-99999999999999 overflow-y-auto">
          <div className="flex justify-between items-center">
            <ThemeToggleSwitch
              checked={resolvedTheme === "dark"}
              onCheckedChange={(event: boolean) =>
                setTheme(event ? "dark" : "light")
              }
            />
            <Drawer.Close>
              <svg
                onClick={() => setIsOpen(!isOpen)}
                className="stroke-woodsmoke-600 dark:stroke-woodsmoke-50"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L12 12M12 12L18 6M12 12L6 6M12 12L18 18"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Drawer.Close>
          </div>
          <nav className="user-select-none">
            <ul className="flex flex-col gap-4">
              <Drawer.Title className="text-normal text-woodsmoke-900 dark:text-amethyst-50 mb-2">
                {translate(t, "navigation.menu")}
              </Drawer.Title>
              {NAV_LINKS.map((link, index) => (
                <li key={index} onClick={() => setIsOpen(!isOpen)}>
                  <Link
                    href={link.to}
                    className={twMerge(
                      "text-normal font-bold transition-transform ease-in-out",
                      pathname === link.to
                        ? "text-amethyst-500 -translate-y-0.5"
                        : "text-woodsmoke-500 hover:text-woodsmoke-800 dark:hover:text-woodsmoke-200 dark:text-woodsmoke-300 font-normal"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Separator className="bg-woodsmoke-200 dark:bg-woodsmoke-600" />
          <div className="space-y-4">
            <h3 className="text-normal font-bold text-woodsmoke-500 dark:text-woodsmoke-50">
              {translate(t, "about.letsTalk.title.1")}
            </h3>
            <h3 className="text-nowrap font-bold text-amethyst-500 dark:text-amethyst-400">
              {translate(t, "about.letsTalk.title.2")}
            </h3>
            <div className="flex justify-center gap-5">
              <Button
                variant={"outline"}
                className="w-full bg-transparent border-woodsmoke-500 dark:border-woodsmoke-300"
                onClick={() => {
                  window.open(
                    // "https://calendar.app.google/t3SJ1W9s6HMtSPiK9",
                    "https://calendar.app.google/Gij4Kb5yDv9YU7Q29",
                    "_blank"
                  );
                }}
              >
                <span className="text-caption text-woodsmoke-600 dark:text-woodsmoke-50">
                  {translate(t, "about.letsTalk.button.letsTalk")}
                </span>
              </Button>
            </div>
          </div>
          <Separator className="bg-woodsmoke-200 dark:bg-woodsmoke-600" />
          <div className="flex flex-col gap-4">
            {SOCIAL_LINKS.map((link, index) => (
              <Link
                className="flex gap-2 items-center"
                key={index}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="hidden dark:flex">{link.darkSidebarIcon}</span>
                <span className="flex dark:hidden">{link.sidebarIcon}</span>
                <span className="text-caption text-woodsmoke-500 dark:text-woodsmoke-300">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
