import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Download, Globe, Menu } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { cn } from "@/lib/utils";

const NAV_IDS = [
  { id: "preview", key: "nav.preview" },
  { id: "solutions", key: "nav.solutions" },
  { id: "capabilities", key: "nav.capabilities" },
] as const;

const base = import.meta.env.BASE_URL;

function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <nav className={cn("flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6", className)}>
      {NAV_IDS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          onClick={onNavigate}
        >
          {t(item.key)}
        </a>
      ))}
    </nav>
  );
}

function LanguageMenu({ className }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const resolved = i18n.resolvedLanguage ?? i18n.language;
  const value = resolved.startsWith("es") ? "es-ES" : "en-US";
  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          aria-label={t("lang.switchTo")}
          aria-haspopup="menu"
        >
          <Globe className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="bottom"
          sideOffset={6}
          alignOffset={0}
          className="border-border/80 min-w-0 w-max max-w-[9rem] rounded-md border p-0.5 py-0.5 text-xs shadow-md"
        >
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={(lng) => {
              if (lng === "es-ES" || lng === "en-US") {
                void i18n.changeLanguage(lng);
              }
            }}
          >
            <DropdownMenuRadioItem value="es-ES" className="h-7 gap-2 py-0 pr-6 pl-2 text-xs">
              {t("lang.es")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="en-US" className="h-7 gap-2 py-0 pr-6 pl-2 text-xs">
              {t("lang.en")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function SiteHeader() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-background/80 supports-backdrop-filter:backdrop-blur-md sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <a href="#hero" className="flex items-center gap-2">
          <img
            src={`${base}autostocker-logo.svg`}
            width={36}
            height={36}
            alt=""
            className="size-9 shrink-0"
          />
          <span className="font-heading text-foreground text-sm font-semibold">{t("site.name")}</span>
        </a>

        <div className="hidden md:flex md:items-center md:gap-3">
          <NavLinks className="flex-row gap-5" />
          <LanguageMenu />
        </div>

        <div className="flex items-center gap-2">
          <LanguageMenu className="md:hidden" />
          <a href="#download" className={cn(buttonVariants({ size: "sm" }), "inline-flex shrink-0")}>
            <Download />
            {t("cta.install")}
          </a>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "outline", size: "icon-sm" }), "md:hidden")}
              aria-label={t("a11y.openMenu")}
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="gap-6">
              <SheetHeader>
                <SheetTitle className="text-left">{t("site.name")}</SheetTitle>
              </SheetHeader>
              <NavLinks
                className="!flex-col !items-start gap-3 px-4 pb-4 text-left"
                onNavigate={() => setMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
