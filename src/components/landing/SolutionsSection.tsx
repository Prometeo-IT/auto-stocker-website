import { useTranslation } from "react-i18next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

const SOLUTION_ITEM_KEYS = [
  "inventoryScattered",
  "unclearAvailability",
  "duplicatePartListings",
  "unloggedMovement",
] as const;

export function SolutionsSection() {
  const { t } = useTranslation();
  return (
    <section id="solutions" className="scroll-mt-20 bg-gradient-to-b from-muted/40 to-background py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-foreground mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
          {t("solutions.title")}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl leading-relaxed">{t("solutions.sub")}</p>
        <Accordion defaultValue={["p-0"]} className="w-full rounded-xl border px-2">
          {SOLUTION_ITEM_KEYS.map((key, i) => (
            <AccordionItem key={key} value={`p-${i}`}>
              <AccordionTrigger>{t(`solutions.items.${key}.title`)}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {t(`solutions.items.${key}.description`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
