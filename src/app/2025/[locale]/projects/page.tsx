"use client";

import React, { useEffect } from "react";
import { ProjectFormat } from "./component";
import { getProjects, style } from "@/config";
import ProjectHeader from "./component/project-header";
import { LetstalkSection } from "@/components/2025";
import { twMerge } from "tailwind-merge";
import { useLoadingStore } from "@/store";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { setLoading } = useLoadingStore();
  const { i18n } = useTranslation();
  const PROJECTS = getProjects(i18n.language);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="flex flex-col">
      <ProjectHeader />
      <div
        className={twMerge(
          "flex flex-col pb-10",
          style.sectionContainerPaddingX
        )}
      >
        {PROJECTS.map((project, index) => (
          <ProjectFormat
            key={index}
            {...project}
            index={index}
            maxLength={PROJECTS.length}
          />
        ))}
      </div>
      <LetstalkSection />
    </div>
  );
}
