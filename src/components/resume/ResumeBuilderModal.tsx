"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Download, FileText, SlidersHorizontal, Eye, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RESUME_SECTIONS,
  type ResumeCategory,
  type ResumeTheme,
  type ResumeMode,
} from "@/config/resumeData";
import { ResumePreview } from "./ResumePreview";
import { ResumeDocument } from "./pdf/ResumeDocument";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: { value: ResumeCategory; label: string }[] = [
  { value: "general", label: "General" },
  { value: "uiux",    label: "UI/UX"   },
  { value: "3d",      label: "3D"      },
  { value: "systems", label: "Systems" },
];

const THEMES: { value: ResumeTheme; label: string }[] = [
  { value: "simple", label: "Simple" },
  { value: "modern", label: "Modern" },
];

// ─── Small pieces ─────────────────────────────────────────────────────────────

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-amethyst-400 mb-2">
      {children}
    </p>
  );
}

function PillButton({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border",
        active
          ? "bg-amethyst-500 text-white border-amethyst-500"
          : "border-amethyst-500/30 text-amethyst-500 hover:border-amethyst-500/60 hover:bg-amethyst-500/5",
      )}
    >
      {children}
    </button>
  );
}

// ─── Settings panel ───────────────────────────────────────────────────────────

function SettingsPanel({
  category, setCategory,
  theme, setTheme,
  mode, setMode,
  visibleSections, toggleSection,
  isDownloading, onDownload,
}: {
  category: ResumeCategory;  setCategory: (v: ResumeCategory) => void;
  theme: ResumeTheme;        setTheme: (v: ResumeTheme) => void;
  mode: ResumeMode;          setMode: (v: ResumeMode) => void;
  visibleSections: string[]; toggleSection: (key: string) => void;
  isDownloading: boolean;    onDownload: () => void;
}) {
  const categorySections = RESUME_SECTIONS.filter((s) => s.categories.includes(category));

  return (
    <div className="flex flex-col gap-5 p-5 flex-1 overflow-y-auto">
      <div>
        <SidebarLabel>Category</SidebarLabel>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <PillButton key={c.value} active={category === c.value} onClick={() => setCategory(c.value)}>
              {c.label}
            </PillButton>
          ))}
        </div>
      </div>

      <div>
        <SidebarLabel>Theme</SidebarLabel>
        <div className="flex gap-2">
          {THEMES.map((t) => (
            <PillButton key={t.value} active={theme === t.value} onClick={() => setTheme(t.value)}>
              {t.label}
            </PillButton>
          ))}
        </div>
      </div>

      <div>
        <SidebarLabel>Mode</SidebarLabel>
        <div className="flex gap-2">
          {(["light", "dark"] as ResumeMode[]).map((m) => (
            <PillButton key={m} active={mode === m} onClick={() => setMode(m)}>
              {m === "light" ? "☀ Light" : "☾ Dark"}
            </PillButton>
          ))}
        </div>
      </div>

      <div>
        <SidebarLabel>Sections</SidebarLabel>
        <div className="flex flex-col gap-2">
          {categorySections.map((section) => {
            const checked = visibleSections.includes(section.key);
            return (
              <label key={section.key} className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative flex items-center justify-center shrink-0">
                  <input type="checkbox" checked={checked} onChange={() => toggleSection(section.key)} className="sr-only" />
                  <div className={cn(
                    "w-4 h-4 rounded border transition-all duration-150 flex items-center justify-center",
                    checked ? "bg-amethyst-500 border-amethyst-500" : "border-amethyst-500/40 group-hover:border-amethyst-500/70",
                  )}>
                    {checked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-amethyst-200 group-hover:text-white transition-colors">
                  {section.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <button
        onClick={onDownload}
        disabled={isDownloading}
        className={cn(
          "mt-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl",
          "bg-amethyst-500 hover:bg-amethyst-600 active:bg-amethyst-700 text-white font-bold text-sm",
          "transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed",
        )}
      >
        <Download size={15} />
        {isDownloading ? "Generating PDF…" : "Download PDF"}
      </button>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────

interface ResumeBuilderModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ResumeBuilderModal({ trigger, open: controlledOpen, onOpenChange }: ResumeBuilderModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen  = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = useCallback((val: boolean) => { setInternalOpen(val); onOpenChange?.(val); }, [onOpenChange]);

  const [category, setCategory]               = useState<ResumeCategory>("general");
  const [theme, setTheme]                     = useState<ResumeTheme>("modern");
  const [mode, setMode]                       = useState<ResumeMode>("light");
  const [visibleSections, setVisibleSections] = useState<string[]>(RESUME_SECTIONS.map((s) => s.key));
  const [isDownloading, setIsDownloading]     = useState(false);
  const [mobileTab, setMobileTab]             = useState<"settings" | "preview">("preview");
  const [atsWarningOpen, setAtsWarningOpen]   = useState(false);

  const toggleSection = useCallback((key: string) => {
    setVisibleSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }, []);

  // Warn once per builder session when the user lands on the Modern theme —
  // it's designed for visual polish, not for ATS parsing accuracy.
  const hasWarnedRef = useRef(false);
  useEffect(() => {
    if (!isOpen) {
      hasWarnedRef.current = false;
      return;
    }
    if (theme === "modern" && !hasWarnedRef.current) {
      setAtsWarningOpen(true);
      hasWarnedRef.current = true;
    }
  }, [isOpen, theme]);

  const handleThemeSelect = useCallback((value: ResumeTheme) => {
    setTheme(value);
    if (value === "modern") {
      setAtsWarningOpen(true);
      hasWarnedRef.current = true;
    }
  }, []);

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");

      const blob = await pdf(
        <ResumeDocument
          category={category}
          theme={theme}
          mode={mode}
          visibleSections={visibleSections}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rochenette-legaspina-${category}-resume.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  }, [category, theme, mode, visibleSections]);

  const settingsProps = {
    category, setCategory, theme, setTheme: handleThemeSelect, mode, setMode,
    visibleSections, toggleSection, isDownloading, onDownload: handleDownload,
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        {/* Backdrop — slightly lighter on mobile so the drawer stands out */}
        <Dialog.Overlay className="fixed inset-0 bg-black/60 md:bg-black/75 backdrop-blur-sm z-9999" />

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            // Base
            "fixed z-10000 flex flex-col bg-woodsmoke-950 overflow-hidden",
            // Mobile: bottom drawer — slides up, rounded top, 92dvh
            "inset-x-0 bottom-0 h-[92dvh] rounded-t-2xl",
            "data-[state=open]:animate-drawer-up data-[state=closed]:animate-drawer-down",
            // Desktop: full screen, no rounding, no animation
            "md:inset-0 md:h-auto md:rounded-none md:data-[state=open]:animate-none md:data-[state=closed]:animate-none",
          )}
        >
          {/* ── Mobile drag handle ───────────────────────────────────────── */}
          <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* ── Header bar ───────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-amethyst-500/20 shrink-0">
            <div className="flex items-center gap-2">
              <FileText size={15} className="text-amethyst-400" />
              <Dialog.Title className="text-sm font-bold text-white tracking-wide">
                Build My Resume
              </Dialog.Title>
            </div>

            {/* Desktop: icon-only X */}
            <Dialog.Close asChild>
              <button
                className="hidden md:flex text-amethyst-400 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </Dialog.Close>

            {/* Mobile: labelled "Close" text button — clear intent */}
            <Dialog.Close asChild>
              <button className="md:hidden text-xs font-semibold text-amethyst-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-amethyst-500/10">
                Close
              </button>
            </Dialog.Close>
          </div>

          {/* ── Body ─────────────────────────────────────────────────────── */}
          <div className="flex flex-1 overflow-hidden">
            {/* Desktop sidebar */}
            <aside className="hidden md:flex flex-col w-65 shrink-0 border-r border-amethyst-500/20 overflow-y-auto">
              <SettingsPanel {...settingsProps} />
            </aside>

            {/* Preview pane */}
            <div className={cn(
              "flex-1 overflow-hidden",
              "md:flex",
              mobileTab === "preview" ? "flex" : "hidden",
            )}>
              <ResumePreview
                category={category}
                theme={theme}
                mode={mode}
                visibleSections={visibleSections}
                onDownload={handleDownload}
              />
            </div>

            {/* Settings pane (mobile only) */}
            <div className={cn(
              "flex-1 overflow-hidden md:hidden",
              mobileTab === "settings" ? "flex flex-col" : "hidden",
            )}>
              <SettingsPanel {...settingsProps} />
            </div>
          </div>

          {/* ── Mobile bottom tab bar ────────────────────────────────────── */}
          <div className="md:hidden flex border-t border-amethyst-500/20 shrink-0">
            {([
              { id: "preview",  Icon: Eye,              label: "Preview"  },
              { id: "settings", Icon: SlidersHorizontal, label: "Settings" },
            ] as const).map(({ id, Icon, label }) => (
              <button
                key={id}
                onClick={() => setMobileTab(id)}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-semibold transition-colors",
                  mobileTab === id
                    ? "text-amethyst-400 border-t-2 border-amethyst-500 -mt-px"
                    : "text-white/40 hover:text-white/70",
                )}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>

      {/* ── ATS warning — Modern theme trades ATS-parsing accuracy for looks ── */}
      <Dialog.Root open={atsWarningOpen} onOpenChange={setAtsWarningOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10001" />
          <Dialog.Content
            aria-describedby="ats-warning-description"
            className={cn(
              "fixed z-10002 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[min(400px,calc(100vw-32px))] rounded-2xl bg-woodsmoke-950 border border-amber-500/30",
              "p-5 shadow-2xl",
            )}
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-amber-500/15 text-amber-400">
                <TriangleAlert size={18} />
              </div>
              <div className="flex-1">
                <Dialog.Title className="text-sm font-bold text-white">
                  Modern theme isn&apos;t 100% ATS-ready
                </Dialog.Title>
                <Dialog.Description id="ats-warning-description" className="mt-1.5 text-xs leading-relaxed text-amethyst-200">
                  Modern is built for looks and beauty, not automated screening — its two-column
                  layout can confuse some Applicant Tracking Systems. If this resume is going
                  through a system check, use{" "}
                  <strong className="text-white">Simple</strong>{" "}
                  instead — it&apos;s designed to be as close to 100% ATS-friendly as possible.
                </Dialog.Description>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => {
                  setTheme("simple");
                  setAtsWarningOpen(false);
                }}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-amethyst-500 hover:bg-amethyst-600 transition-colors"
              >
                Switch to Simple
              </button>
              <Dialog.Close asChild>
                <button className="px-3.5 py-2 rounded-lg text-xs font-semibold text-amethyst-300 hover:text-white border border-amethyst-500/30 hover:border-amethyst-500/60 transition-colors">
                  Keep Modern
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Dialog.Root>
  );
}
