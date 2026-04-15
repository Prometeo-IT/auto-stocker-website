import { useTranslation } from "react-i18next";

import { LegalDialogLink } from "@/components/landing/LegalDialogLink";

export function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-muted/40 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
        <p className="text-muted-foreground text-center text-sm sm:text-left">
          © {year} {t("footer.copyrightHolder")}.
          <span className="max-[360px]:block"> {t("footer.rights")}</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <LegalDialogLink
            label={t("footer.privacy")}
            title={t("legal.privacyTitle")}
            description={t("legal.privacyBody")}
          />
          <LegalDialogLink
            label={t("footer.terms")}
            title={t("legal.termsTitle")}
            description={t("legal.termsBody")}
          />
        </div>
      </div>
    </footer>
  );
}
