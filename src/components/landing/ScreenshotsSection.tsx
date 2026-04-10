import { useTranslation } from "react-i18next";

import { ScreenshotPreviewDialog } from "@/components/landing/ScreenshotPreviewDialog";

const APP_SCREENSHOTS = [
  { id: "inventory", captionKey: "screenshots.captions.inventory", altKey: "screenshots.alts.inventory" },
  { id: "dashboard-phone", captionKey: "screenshots.captions.dashboardPhone", altKey: "screenshots.alts.dashboardPhone" },
] as const;

const base = import.meta.env.BASE_URL;

export function ScreenshotsSection() {
  const { t } = useTranslation();
  const inventoryShot = APP_SCREENSHOTS.find((item) => item.id === "inventory");
  const phoneShot = APP_SCREENSHOTS.find((item) => item.id === "dashboard-phone");

  if (!inventoryShot || !phoneShot) {
    return null;
  }

  return (
    <section
      id="screenshots"
      className="scroll-mt-20 border-b bg-gradient-to-b from-muted/40 to-background py-14 md:py-18"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-foreground mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
          {t("multiplatform.title")}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl leading-relaxed">{t("multiplatform.description")}</p>
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <ScreenshotPreviewDialog
            src={`${base}screenshots/desktop/${inventoryShot.id}.png`}
            alt={t(inventoryShot.altKey)}
            caption={t(inventoryShot.captionKey)}
            dialogMaxWidthClass="sm:max-w-5xl"
          />

          <ScreenshotPreviewDialog
            src={`${base}screenshots/phone/dashboard.png`}
            alt={t(phoneShot.altKey)}
            caption={t(phoneShot.captionKey)}
            isPhone
            dialogMaxWidthClass="sm:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
