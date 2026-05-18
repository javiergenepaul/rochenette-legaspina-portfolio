"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Mail, Linkedin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// ─── Validation schema (mirrors 2025) ────────────────────────────────────────
const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must be at most 50 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name must be at most 50 characters." })
    .min(1, { message: "Last name is required." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(10, { message: "Email must be at least 10 characters." })
    .max(50, { message: "Email must be at most 50 characters." }),
  message: z
    .string()
    .max(250, { message: "Message must be at most 250 characters." })
    .min(1, { message: "Message is required." }),
});

type FormValues = z.infer<typeof FormSchema>;

// ─── Contact links ────────────────────────────────────────────────────────────
const CONTACT_LINKS = [
  {
    Icon: Mail,
    label: "Email",
    value: "rochenettelegaspina18@gmail.com",
    href: "mailto:rochenettelegaspina18@gmail.com",
    sub: "Best for project enquiries",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/rochenette-legaspina-677a64263",
    href: "https://www.linkedin.com/in/rochenette-legaspina-677a64263/",
    sub: "Connect professionally",
  },
] as const;

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ContactSection2026() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { firstName: "", lastName: "", email: "", message: "" },
  });

  function onSubmit(data: FormValues) {
    if (data.email && data.message) {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    }
  }

  return (
    <section
      id="contact"
      className="py-24 px-[7%] bg-woodsmoke-100 dark:bg-woodsmoke-900"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 text-amethyst-500 font-poppins font-bold text-[0.72rem] uppercase tracking-[2.5px] mb-2">
        <Send size={13} strokeWidth={1.75} />
        Contact
      </div>
      <h2
        className="font-poppins font-bold text-woodsmoke-900 dark:text-woodsmoke-50 mb-2"
        style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
      >
        Let&apos;s <span className="text-amethyst-500">Work Together</span>
      </h2>
      <p className="text-woodsmoke-500 dark:text-woodsmoke-400 text-[0.95rem] leading-[1.75] max-w-140 mb-12">
        Whether you have a project in mind or just want to connect — I&apos;d
        love to hear from you.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 items-start">
        {/* Left — contact links */}
        <div>
          <p className="text-woodsmoke-500 dark:text-woodsmoke-400 text-[0.92rem] leading-[1.75] mb-7">
            I&apos;m currently open to freelance projects, full-time roles, and
            collaborations in systems analysis, UI/UX design, and 3D
            visualization.
          </p>

          <div className="flex flex-col gap-3">
            {CONTACT_LINKS.map(({ Icon, label, value, href, sub }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-3.5 no-underline p-4 rounded-[14px] border",
                  "bg-white dark:bg-woodsmoke-800",
                  "border-woodsmoke-200 dark:border-woodsmoke-700",
                  "transition-all duration-300",
                  "hover:border-amethyst-500 hover:shadow-[0_12px_36px_rgba(211,47,47,.13)] hover:translate-x-1.5",
                )}
              >
                <div className="w-9 h-9 bg-amethyst-50 dark:bg-amethyst-500/15 rounded-[9px] flex items-center justify-center shrink-0">
                  <Icon
                    size={17}
                    className="text-amethyst-500"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <strong className="block text-[0.82rem] text-woodsmoke-900 dark:text-woodsmoke-50 font-semibold truncate">
                    {value}
                  </strong>
                  <small className="text-[0.73rem] text-woodsmoke-400">
                    {sub}
                  </small>
                </div>
                <ChevronRight
                  size={14}
                  className="text-woodsmoke-300 dark:text-woodsmoke-600 shrink-0"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div
          className={cn(
            "rounded-[20px] p-5 sm:p-8 border",
            "bg-white dark:bg-woodsmoke-800",
            "border-woodsmoke-200 dark:border-woodsmoke-700",
            "shadow-[0_4px_16px_rgba(0,0,0,.06)]",
          )}
        >
          <h3 className="font-poppins font-bold text-[0.97rem] text-woodsmoke-900 dark:text-woodsmoke-50 flex items-center gap-2 mb-6">
            <Send size={18} className="text-amethyst-500" strokeWidth={1.75} />
            Send a Message
          </h3>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3.5"
          >
            {/* First + Last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field
                label="First Name"
                placeholder="Your first name"
                type="text"
                maxLength={50}
                error={form.formState.errors.firstName?.message}
                {...form.register("firstName")}
              />
              <Field
                label="Last Name"
                placeholder="Your last name"
                type="text"
                maxLength={50}
                error={form.formState.errors.lastName?.message}
                {...form.register("lastName")}
              />
            </div>

            <Field
              label="Email"
              placeholder="your@email.com"
              type="email"
              maxLength={50}
              error={form.formState.errors.email?.message}
              {...form.register("email")}
            />

            <FieldArea
              label="Message"
              placeholder="Tell me about your project or idea…"
              maxLength={250}
              error={form.formState.errors.message?.message}
              {...form.register("message")}
            />

            <button
              type="submit"
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 rounded-xl",
                "font-poppins font-bold text-[0.88rem] text-white border-none cursor-pointer",
                "bg-linear-to-br from-amethyst-500 to-amethyst-700",
                "shadow-[0_4px_14px_rgba(211,47,47,.3)]",
                "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(211,47,47,.42)]",
              )}
            >
              <Send size={16} strokeWidth={1.75} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Field primitives ─────────────────────────────────────────────────────────

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, error, ...props },
  ref,
) {
  return (
    <div>
      <label className="block font-poppins font-bold text-[0.73rem] text-woodsmoke-900 dark:text-woodsmoke-100 mb-1.5 tracking-[0.3px]">
        {label}
      </label>
      <input
        ref={ref}
        {...props}
        className={cn(
          "w-full px-4 py-2.5 rounded-[10px] text-[0.83rem] font-roboto outline-none",
          "border-[1.5px] transition-all duration-200",
          "text-woodsmoke-900 dark:text-woodsmoke-50",
          "bg-woodsmoke-50 dark:bg-woodsmoke-900",
          "placeholder:text-woodsmoke-300 dark:placeholder:text-woodsmoke-600",
          error
            ? "border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,.15)]"
            : "border-woodsmoke-200 dark:border-woodsmoke-700 focus:border-amethyst-500 focus:shadow-[0_0_0_3px_rgba(211,47,47,.1)]",
        )}
      />
      {error && (
        <p className="mt-1 text-[0.7rem] text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
});

interface FieldAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FieldArea = React.forwardRef<HTMLTextAreaElement, FieldAreaProps>(
  function FieldArea({ label, error, ...props }, ref) {
    return (
      <div>
        <label className="block font-poppins font-bold text-[0.73rem] text-woodsmoke-900 dark:text-woodsmoke-100 mb-1.5 tracking-[0.3px]">
          {label}
        </label>
        <textarea
          ref={ref}
          rows={4}
          {...props}
          className={cn(
            "w-full px-4 py-2.5 rounded-[10px] text-[0.83rem] font-roboto outline-none resize-y",
            "border-[1.5px] transition-all duration-200",
            "text-woodsmoke-900 dark:text-woodsmoke-50",
            "bg-woodsmoke-50 dark:bg-woodsmoke-900",
            "placeholder:text-woodsmoke-300 dark:placeholder:text-woodsmoke-600",
            error
              ? "border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,.15)]"
              : "border-woodsmoke-200 dark:border-woodsmoke-700 focus:border-amethyst-500 focus:shadow-[0_0_0_3px_rgba(211,47,47,.1)]",
          )}
        />
        {error && (
          <p className="mt-1 text-[0.7rem] text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  },
);
