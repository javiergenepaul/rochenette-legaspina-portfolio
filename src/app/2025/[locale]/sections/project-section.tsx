import ProjectContainer from "./components/project-container";
import { style } from "@/config";
import { twMerge } from "tailwind-merge";
import { translate } from "@/lib";
import { useTranslation } from 'react-i18next';
import * as ASSETS from "@/assets";
import { StaticImageData } from "next/image";

export interface ProjectContainerInterface {
  title: string;
  description: string;
  img: StaticImageData;
  imgAlt: string;
  sectionId: string;
}

export default function ProjectSection() {
  const { t } = useTranslation();
  const PROJECTS: ProjectContainerInterface[] = [
    {
      title: translate(t, "home.project.projects.1.title"),
      description: translate(
        t,
        "home.project.projects.1.description"
      ),
      img: ASSETS.ScClaimsPreview,
      imgAlt: "SC Claims Preview",
      sectionId: "sc-claims",
    },
    {
      title: translate(t, "home.project.projects.2.title"),
      description: translate(
        t,
        "home.project.projects.2.description"
      ),
      img: ASSETS.YooPreview,
      imgAlt: "Yoo Preview",
      sectionId: "yoo",
    },
    {
      title: translate(t, "home.project.projects.3.title"),
      description: translate(
        t,
        "home.project.projects.3.description"
      ),
      img: ASSETS.IQMKPreview,
      imgAlt: "IQMK Preview",
      sectionId: "iqmk-app",
    },
    {
      title: translate(t, "home.project.projects.4.title"),
      description: translate(
        t,
        "home.project.projects.4.description"
      ),
      img: ASSETS.CountryScapePreview,
      imgAlt: "CountryScape Preview",
      sectionId: "countryscape",
    },
    {
      title: translate(t, "home.project.projects.5.title"),
      description: translate(
        t,
        "home.project.projects.5.description"
      ),
      img: ASSETS.ExodiaSpacecraft,
      imgAlt: "Exodia VR Spacecraft",
      sectionId: "exodia-3d",
    },
  ];

  return (
    <section
      id="project-section"
      className={twMerge(
        "h-full relative space-y-20",
        style.sectionContainerPaddingX
      )}
    >
      <h1 className="text-h2 text-woodsmoke-600 dark:text-woodsmoke-50 text-center font-bold">
        {translate(t, "home.project.title")}
      </h1>

      {PROJECTS.map((project, index) => (
        <ProjectContainer key={index} {...project} index={index} />
      ))}
    </section>
  );
}
