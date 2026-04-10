import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DownloadSection } from "@/components/landing/DownloadSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { SolutionsSection } from "@/components/landing/SolutionsSection";
import { ScreenshotsSection } from "@/components/landing/ScreenshotsSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";

export function LandingPage() {
  const { i18n } = useTranslation();
  const orderedSections = [HeroSection, ScreenshotsSection, SolutionsSection, FeaturesSection, DownloadSection] as const;

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
