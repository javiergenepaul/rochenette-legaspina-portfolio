import Image from "next/image";
import { Award, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CERTIFICATION_EXPERIENCE } from "@/config";

export default function CertificationSection2026() {
  return (
    <section
      id="certifications"
      className="py-24 px-[7%] bg-woodsmoke-50 dark:bg-woodsmoke-900"
    >
      <div className="flex items-center gap-1.5 text-amethyst-500 font-poppins font-bold text-[0.72rem] uppercase tracking-[2.5px] mb-2">
        <Award size={13} strokeWidth={1.75} />
        Certifications
      </div>
      <h2
        className="font-poppins font-bold text-woodsmoke-900 dark:text-woodsmoke-50 mb-2"
        style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
      >
        Skills <span className="text-amethyst-500">Validated</span>
      </h2>
      <p className="text-woodsmoke-500 dark:text-woodsmoke-400 text-[0.95rem] leading-[1.75] max-w-140 mb-12">
        Professional certifications that complement my hands-on experience with structured learning.
      </p>

      <div className="flex flex-col gap-5 xl:w-10/12 lg:w-11/12 w-full mx-auto">
        {CERTIFICATION_EXPERIENCE.map((cert, index) => (
          <div
            key={index}
            className={cn(
              "flex sm:flex-row flex-col gap-5 p-6 rounded-[20px] border",
              "bg-[#FDEEBA] border-[#FDEEBA] dark:bg-woodsmoke-900 dark:border-woodsmoke-700",
              "shadow-[0_4px_16px_rgba(0,0,0,.06)]",
              "transition-all duration-300",
              "hover:shadow-[0_12px_36px_rgba(211,47,47,.13)] hover:-translate-y-0.5 hover:border-amethyst-100 dark:hover:border-amethyst-500/40"
            )}
          >
            {/* Logo */}
            <div className="shrink-0 flex items-start justify-center sm:justify-start">
              <div className="w-16 h-16 rounded-[14px] overflow-hidden shadow-[0_0_14.98px_rgba(0,0,0,0.14)] bg-woodsmoke-50 flex items-center justify-center">
                <Image
                  src={cert.image}
                  alt={cert.imageAlt}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1">
              <div>
                <h3 className="font-poppins font-bold text-[0.95rem] text-woodsmoke-900 dark:text-woodsmoke-50">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-1 text-amethyst-500 font-semibold text-[0.78rem] mt-0.5">
                  <Building2 size={12} strokeWidth={1.75} />
                  {cert.subTitle}
                </div>
              </div>

              <ul className="list-none flex flex-col gap-1 mt-1">
                {cert.description.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[0.8rem] text-woodsmoke-600 dark:text-woodsmoke-400 leading-[1.6]"
                  >
                    <span className="text-amethyst-500 mt-0.5 shrink-0 font-bold">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
