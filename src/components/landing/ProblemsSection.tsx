import { useTranslation } from "react-i18next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";

const PROBLEM_KEYS = ["chaos", "mismatch", "slow"] as const;

export function ProblemsSection() {
  const { t } = useTranslation();
  return (
    <section id="problems" className="scroll-mt-20 bg-gradient-to-b from-muted/40 to-background py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-foreground mb-8 text-2xl font-semibold tracking-tight md:text-3xl">
          {t("problems.title")}
        </h2>
        <Accordion defaultValue={["p-0"]} className="w-full rounded-xl border px-2">
          {PROBLEM_KEYS.map((key, i) => (
            <AccordionItem key={key} value={`p-${i}`}>
              <AccordionTrigger>{t(`problems.items.${key}.title`)}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {t(`problems.items.${key}.description`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
