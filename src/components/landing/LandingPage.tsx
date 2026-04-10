import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { CapabilitiesSection } from "@/components/landing/CapabilitiesSection.tsx";
import { DownloadSection } from "@/components/landing/DownloadSection.tsx";
import { HeroSection } from "@/components/landing/HeroSection.tsx";
import { ProblemsSection } from "@/components/landing/ProblemsSection.tsx";
import { ScreenshotsSection } from "@/components/landing/ScreenshotsSection.tsx";
import { SiteFooter } from "@/components/landing/SiteFooter.tsx";
import { SiteHeader } from "@/components/landing/SiteHeader.tsx";

export function LandingPage() {
  const { i18n } = useTranslation();
  const orderedSections = [HeroSection, ScreenshotsSection, ProblemsSection, CapabilitiesSection, DownloadSection] as const;

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="bg-background min-h-screen">
      <SiteHeader />
      <main>
        {orderedSections.map((SectionComponent) => (
          <SectionComponent key={SectionComponent.name} />
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
