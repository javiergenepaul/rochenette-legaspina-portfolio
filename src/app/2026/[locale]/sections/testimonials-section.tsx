import { MessageCircle, Star, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "../data/portfolio-data";

export default function TestimonialsSection2026() {
  return (
    <section
      id="testimonials"
      className="py-24 px-[7%] bg-woodsmoke-100 dark:bg-woodsmoke-900"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 text-amethyst-500 dark:text-amethyst-400 font-poppins font-bold text-[0.72rem] uppercase tracking-[2.5px] mb-2">
        <MessageCircle size={13} strokeWidth={1.75} />
        Reviews
      </div>
      <h2
        className="font-poppins font-bold text-woodsmoke-900 dark:text-woodsmoke-50 mb-2"
        style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
      >
        What People <span className="text-amethyst-500">Say</span>
      </h2>
      <p className="text-woodsmoke-500 dark:text-woodsmoke-400 text-[0.95rem] leading-[1.75] max-w-140 mb-12">
        Feedback from colleagues, clients, and mentors I&apos;ve had the
        pleasure of working with.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {TESTIMONIALS.map(
          ({ text, name, role, initials, avatarColor, stars }) => (
            <div
              key={name}
              className={cn(
                "relative flex flex-col gap-4 p-6 rounded-[20px] border overflow-hidden",
                "bg-white dark:bg-woodsmoke-800",
                "border-woodsmoke-200 dark:border-woodsmoke-700",
                "shadow-[0_4px_16px_rgba(0,0,0,.06)]",
                "transition-all duration-300",
                "hover:shadow-[0_12px_36px_rgba(211,47,47,.13)] hover:-translate-y-1",
                "hover:border-amethyst-100 dark:hover:border-amethyst-500/35",
              )}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-amethyst-500 to-amethyst-300" />

              {/* Quote mark */}
              <span className="text-[2.2rem] text-amethyst-500/22 leading-none font-serif font-bold select-none">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className="text-amethyst-500 fill-amethyst-500"
                    strokeWidth={0}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-[0.87rem] text-woodsmoke-500 dark:text-woodsmoke-400 leading-[1.75] italic flex-1">
                {text}
              </p>

              {/* Footer */}
              <div className="flex items-center gap-3 mt-1">
                <div
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white text-[0.8rem] font-poppins font-extrabold",
                    avatarColor,
                  )}
                >
                  {initials}
                </div>
                <div>
                  <strong className="block text-[0.85rem] text-woodsmoke-900 dark:text-woodsmoke-50 font-poppins font-bold">
                    {name}
                  </strong>
                  <span className="flex items-center gap-1 text-[0.74rem] text-woodsmoke-400">
                    <Building2
                      size={11}
                      className="text-amethyst-300"
                      strokeWidth={1.75}
                    />
                    {role}
                  </span>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
