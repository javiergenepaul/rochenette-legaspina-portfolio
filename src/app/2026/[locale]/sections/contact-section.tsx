"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Send, Mail, Linkedin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { translate } from "@/lib";
import { useToast } from "@/hooks/use-toast";
import type { TFunction } from "i18next";

// ─── Validation schema (mirrors 2025) ────────────────────────────────────────
function buildFormSchema(t: TFunction) {
  return z.object({
    firstName: z
      .string()
      .min(2, { message: translate(t, "portfolio2026.contact.errorFirstNameMin") })
      .max(50, { message: translate(t, "portfolio2026.contact.errorFirstNameMax") }),
    lastName: z
      .string()
      .min(2, { message: translate(t, "portfolio2026.contact.errorLastNameMin") })
      .max(50, { message: translate(t, "portfolio2026.contact.errorLastNameMax") })
      .min(1, { message: translate(t, "portfolio2026.contact.errorLastNameRequired") }),
    email: z
      .string()
      .email({ message: translate(t, "portfolio2026.contact.errorEmailInvalid") })
      .min(10, { message: translate(t, "portfolio2026.contact.errorEmailMin") })
      .max(50, { message: translate(t, "portfolio2026.contact.errorEmailMax") }),
    message: z
      .string()
      .max(250, { message: translate(t, "portfolio2026.contact.errorMessageMax") })
      .min(1, { message: translate(t, "portfolio2026.contact.errorMessageRequired") }),
  });
}

type FormValues = z.infer<ReturnType<typeof buildFormSchema>>;

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ContactSection2026() {
  const { toast } = useToast();
  const { t } = useTranslation();

  const CONTACT_LINKS = [
    {
      Icon: Mail,
      label: translate(t, "portfolio2026.contact.emailLabel"),
      value: "rochenettelegaspina18@gmail.com",
      href: "mailto:rochenettelegaspina18@gmail.com",
      sub: translate(t, "portfolio2026.contact.emailSub"),
    },
    {
      Icon: Linkedin,
      label: translate(t, "portfolio2026.contact.linkedinLabel"),
      value: "linkedin.com/in/rochenette-legaspina-677a64263",
      href: "https://www.linkedin.com/in/rochenette-legaspina-677a64263/",
      sub: translate(t, "portfolio2026.contact.linkedinSub"),
    },
  ] as const;

  const form = useForm<FormValues>({
    resolver: zodResolver(buildFormSchema(t)),
    defaultValues: { firstName: "", lastName: "", email: "", message: "" },
  });

  function onSubmit(data: FormValues) {
    if (data.email && data.message) {
      toast({
        title: translate(t, "portfolio2026.contact.toastTitle"),
        description: translate(t, "portfolio2026.contact.toastDescription"),
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
      <div className="flex items-center gap-1.5 text-amethyst-500 dark:text-amethyst-400 font-poppins font-bold text-[0.72rem] uppercase tracking-[2.5px] mb-2">
        <Send size={13} strokeWidth={1.75} />
        {translate(t, "portfolio2026.contact.eyebrow")}
      </div>
      <h2
        className="font-poppins font-bold text-woodsmoke-900 dark:text-woodsmoke-50 mb-2"
        style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", lineHeight: 1.2 }}
      >
        {translate(t, "portfolio2026.contact.headingPre")} <span className="text-amethyst-500">{translate(t, "portfolio2026.contact.headingHighlight")}</span>
      </h2>
      <p className="text-woodsmoke-500 dark:text-woodsmoke-400 text-[0.95rem] leading-[1.75] max-w-140 mb-12">
        {translate(t, "portfolio2026.contact.intro")}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 items-start">
        {/* Left — contact links */}
        <div>
          <p className="text-woodsmoke-500 dark:text-woodsmoke-400 text-[0.92rem] leading-[1.75] mb-7">
            {translate(t, "portfolio2026.contact.openTo")}
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
            {translate(t, "portfolio2026.contact.formTitle")}
          </h3>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3.5"
          >
            {/* First + Last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Field
                label={translate(t, "portfolio2026.contact.firstNameLabel")}
                placeholder={translate(t, "portfolio2026.contact.firstNamePlaceholder")}
                type="text"
                maxLength={50}
                error={form.formState.errors.firstName?.message}
                {...form.register("firstName")}
              />
              <Field
                label={translate(t, "portfolio2026.contact.lastNameLabel")}
                placeholder={translate(t, "portfolio2026.contact.lastNamePlaceholder")}
                type="text"
                maxLength={50}
                error={form.formState.errors.lastName?.message}
                {...form.register("lastName")}
              />
            </div>

            <Field
              label={translate(t, "portfolio2026.contact.emailFieldLabel")}
              placeholder={translate(t, "portfolio2026.contact.emailPlaceholder")}
              type="email"
              maxLength={50}
              error={form.formState.errors.email?.message}
              {...form.register("email")}
            />

            <FieldArea
              label={translate(t, "portfolio2026.contact.messageLabel")}
              placeholder={translate(t, "portfolio2026.contact.messagePlaceholder")}
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
              {translate(t, "portfolio2026.contact.sendButton")}
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
