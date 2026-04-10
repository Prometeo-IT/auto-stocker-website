import { useTranslation } from "react-i18next";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const CAPABILITY_KEYS = [
  "inventories",
  "catalog",
  "review",
  "clients",
  "sell",
  "invoices",
] as const;

export function CapabilitiesSection() {
  const { t } = useTranslation();
  return (
    <section
      id="capabilities"
      className="scroll-mt-20 border-border border-t bg-gradient-to-b from-muted/40 to-background py-16 md:py-20"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-foreground mb-8 text-2xl font-semibold tracking-tight md:text-3xl">
          {t("capabilities.title")}
        </h2>
        <h3 className="font-heading text-foreground mb-5 text-lg font-medium">{t("hero.rolesTitle")}</h3>
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t("hero.roles.managers.title")}</CardTitle>
              <CardDescription>{t("hero.roles.managers.text")}</CardDescription>
            </CardHeader>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t("hero.roles.staff.title")}</CardTitle>
              <CardDescription>{t("hero.roles.staff.text")}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITY_KEYS.map((key) => (
            <Card key={key} size="sm">
              <CardHeader>
                <CardTitle>{t(`capabilities.items.${key}.title`)}</CardTitle>
                <CardDescription>{t(`capabilities.items.${key}.text`)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h3 className="font-heading text-foreground mb-3 text-base font-medium">
            {t("capabilities.extrasTitle")}
          </h3>
          <ul className="text-muted-foreground list-inside list-disc space-y-2 text-sm">
            <li>{t("capabilities.extras.0")}</li>
            <li>{t("capabilities.extras.1")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
