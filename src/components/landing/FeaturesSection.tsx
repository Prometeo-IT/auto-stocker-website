import { useTranslation } from "react-i18next";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const FEATURE_CARD_TITLE_CLASS =
  "!text-lg font-semibold leading-snug md:!text-xl";

const FEATURE_ITEM_KEYS = [
  "inventories",
  "catalog",
  "review",
  "clients",
  "sell",
  "invoices",
] as const;

export function FeaturesSection() {
  const { t } = useTranslation();
  return (
    <section
      id="features"
      className="scroll-mt-20 border-border border-t bg-gradient-to-b from-muted/40 to-background py-16 md:py-20"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-foreground mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
          {t("features.headline")}
        </h2>
        <h3 className="font-heading text-foreground mb-5 text-lg font-medium">{t("features.itemsIntro")}</h3>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_ITEM_KEYS.map((key) => (
            <Card key={key} size="sm">
              <CardHeader>
                <CardTitle className={FEATURE_CARD_TITLE_CLASS}>
                  {t(`features.items.${key}.title`)}
                </CardTitle>
                <CardDescription>{t(`features.items.${key}.text`)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <h3 className="font-heading text-foreground mb-5 text-lg font-medium">{t("features.audienceTitle")}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Card size="sm">
            <CardHeader>
              <CardTitle className={FEATURE_CARD_TITLE_CLASS}>
                {t("features.audience.managers.title")}
              </CardTitle>
              <CardDescription>{t("features.audience.managers.text")}</CardDescription>
            </CardHeader>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle className={FEATURE_CARD_TITLE_CLASS}>
                {t("features.audience.staff.title")}
              </CardTitle>
              <CardDescription>{t("features.audience.staff.text")}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
