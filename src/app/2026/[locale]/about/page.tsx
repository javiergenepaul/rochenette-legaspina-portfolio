"use client";
import { useLoadingStore } from "@/store";
import { useEffect } from "react";
import { WorkSection, EducationSection, CertificationSection } from "./sections";

export default function About2026() {
  const { setLoading } = useLoadingStore();
  useEffect(() => { setLoading(false); }, [setLoading]);

  return (
    <main className="pt-20">
      <WorkSection />
      <EducationSection />
      <CertificationSection />
    </main>
  );
}
