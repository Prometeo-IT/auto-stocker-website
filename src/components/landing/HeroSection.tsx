import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { t } = useTranslation();
  return (
    <section
      id="positioning"
      className="scroll-mt-20 border-b bg-gradient-to-b from-muted/40 to-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="font-heading text-foreground mb-5 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          {t("hero.headline")}
        </h1>
        <p className="text-primary mb-4 text-sm font-medium tracking-wide uppercase">{t("site.tagline")}</p>
        <p className="text-muted-foreground mb-8 max-w-2xl text-lg leading-relaxed">{t("hero.sub")}</p>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <a href="#download" className={cn(buttonVariants({ size: "lg" }), "inline-flex font-bold")}>
            <Download strokeWidth={2.5} />
            {t("cta.get")}
          </a>
        </div>
      </div>
    </section>
  );
}
