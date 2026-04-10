import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SITE } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { cn } from "@/lib/utils";
import {
  Download,
  Globe,
  Menu,
  Monitor,
  Smartphone,
} from "lucide-react";

const NAV_IDS = [
  { id: "screenshots", key: "nav.screenshots" },
  { id: "problems", key: "nav.problems" },
  { id: "capabilities", key: "nav.capabilities" },
] as const;

const PROBLEM_KEYS = ["chaos", "mismatch", "slow"] as const;

const CAPABILITY_KEYS = [
  "inventories",
  "catalog",
  "review",
  "clients",
  "sell",
  "invoices",
] as const;

const DOWNLOAD_PLATFORMS = [
  {
    key: "windows" as const,
    href: SITE.downloads.windows,
    filename: "auto-stocker-windows.zip",
    icon: Monitor,
  },
  {
    key: "android" as const,
    href: SITE.downloads.android,
    filename: "auto-stocker-android.apk",
    icon: Smartphone,
  },
];

const APP_SCREENSHOTS = [
  { id: "inventory", captionKey: "screenshots.captions.inventory", altKey: "screenshots.alts.inventory" },
  { id: "sales", captionKey: "screenshots.captions.sales", altKey: "screenshots.alts.sales" },
  { id: "invoice", captionKey: "screenshots.captions.invoice", altKey: "screenshots.alts.invoice" },
  { id: "dashboard", captionKey: "screenshots.captions.dashboard", altKey: "screenshots.alts.dashboard" },
  {
    id: "dashboard-phone",
    captionKey: "screenshots.captions.dashboardPhone",
    altKey: "screenshots.alts.dashboardPhone",
  },
  { id: "low-stock", captionKey: "screenshots.captions.lowStock", altKey: "screenshots.alts.lowStock" },
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
            <DropdownMenuRadioItem
              value="es-ES"
              className="h-7 gap-2 py-0 pr-6 pl-2 text-xs"
            >
              {t("lang.es")}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="en-US"
              className="h-7 gap-2 py-0 pr-6 pl-2 text-xs"
            >
              {t("lang.en")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function SiteHeader() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-background/80 supports-backdrop-filter:backdrop-blur-md sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <a href="#positioning" className="flex items-center gap-2">
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
          <a
            href="#download"
            className={cn(buttonVariants({ size: "sm" }), "inline-flex shrink-0")}
          >
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

function HeroSection() {
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
        <p className="text-primary mb-4 text-sm font-medium tracking-wide uppercase">
          {t("site.tagline")}
        </p>
        <p className="text-muted-foreground mb-8 max-w-2xl text-lg leading-relaxed">
          {t("hero.sub")}
        </p>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <a
            href="#download"
            className={cn(buttonVariants({ size: "lg" }), "inline-flex font-bold")}
          >
            <Download strokeWidth={2.5} />
            {t("cta.get")}
          </a>
        </div>
      </div>
    </section>
  );
}

function ScreenshotsSection() {
  const { t } = useTranslation();
  const inventoryShot = APP_SCREENSHOTS.find((item) => item.id === "inventory");
  const phoneShot = APP_SCREENSHOTS.find((item) => item.id === "dashboard-phone");

  if (!inventoryShot || !phoneShot) {
    return null;
  }

  return (
    <section id="screenshots" className="scroll-mt-20 border-b bg-muted/20 py-14 md:py-18">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-foreground mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
          {t("multiplatform.title")}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl leading-relaxed">{t("multiplatform.description")}</p>
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <Dialog>
            <DialogTrigger className="block w-full text-left">
              <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-transform hover:-translate-y-0.5">
                <img
                  src={`${base}screenshots/desktop/${inventoryShot.id}.png`}
                  width={1920}
                  height={1080}
                  alt={t(inventoryShot.altKey)}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
              <p className="text-muted-foreground mt-2 text-center text-xs font-medium">
                {t(inventoryShot.captionKey)}
              </p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl">
              <DialogHeader className="sr-only">
                <DialogTitle>{t(inventoryShot.captionKey)}</DialogTitle>
                <DialogDescription>{t(inventoryShot.altKey)}</DialogDescription>
              </DialogHeader>
              <img
                src={`${base}screenshots/desktop/${inventoryShot.id}.png`}
                width={1920}
                height={1080}
                alt={t(inventoryShot.altKey)}
                className="max-h-[80vh] w-full rounded-md object-contain"
              />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger className="block w-full text-left">
              <div className="mx-auto w-full max-w-[200px]">
                <div className="relative rounded-[2rem] border border-border/70 bg-card shadow-sm">
                  <div
                    className="pointer-events-none absolute top-1.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-foreground/20"
                    aria-hidden
                  />
                  <img
                    src={`${base}screenshots/phone/dashboard.png`}
                    width={1170}
                    height={1992}
                    alt={t(phoneShot.altKey)}
                    loading="lazy"
                    className="mx-auto aspect-[9/18] w-[100%] rounded-[1.5rem] object-contain"
                  />
                </div>
              </div>
              <p className="text-muted-foreground mt-2 text-center text-xs font-medium">
                {t(phoneShot.captionKey)}
              </p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader className="sr-only">
                <DialogTitle>{t(phoneShot.captionKey)}</DialogTitle>
                <DialogDescription>{t(phoneShot.altKey)}</DialogDescription>
              </DialogHeader>
              <img
                src={`${base}screenshots/phone/dashboard.png`}
                width={1170}
                height={1992}
                alt={t(phoneShot.altKey)}
                className="max-h-[80vh] w-full rounded-md object-contain"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}

function RolesSection() {
  const { t } = useTranslation();
  return (
    <section className="scroll-mt-20 py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-foreground mb-5 text-lg font-medium">{t("hero.rolesTitle")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
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
      </div>
    </section>
  );
}

function ProblemsSection() {
  const { t } = useTranslation();
  return (
    <section id="problems" className="scroll-mt-20 py-16 md:py-20">
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

function CapabilitiesSection() {
  const { t } = useTranslation();
  return (
    <section
      id="capabilities"
      className="scroll-mt-20 border-border border-t bg-muted/30 py-16 md:py-20"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-foreground mb-8 text-2xl font-semibold tracking-tight md:text-3xl">
          {t("capabilities.title")}
        </h2>
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

function DownloadSection() {
  const { t } = useTranslation();
  return (
    <section id="download" className="scroll-mt-20 border-t bg-muted/20 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-foreground mb-4 text-2xl font-semibold tracking-tight md:text-3xl">
          {t("download.title")}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-3xl leading-relaxed">{t("download.intro")}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {DOWNLOAD_PLATFORMS.map(({ key, href, filename, icon: Icon }) => (
            <Card key={key} size="sm" className="flex flex-col">
              <CardHeader className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="text-muted-foreground size-5 shrink-0" aria-hidden />
                  <CardTitle className="text-lg">{t(`download.platforms.${key}`)}</CardTitle>
                </div>
                <CardDescription>{t(`download.platforms.${key}Hint`)}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <a
                  href={href}
                  download={filename}
                  className={cn(buttonVariants({ size: "default" }), "inline-flex w-full justify-center sm:w-auto")}
                >
                  <Download />
                  {t("download.button")}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-muted/30 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
        <p className="text-muted-foreground text-sm">
          © {year} {t("footer.copyrightHolder")}. {t("footer.rights")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Dialog>
            <DialogTrigger className={cn(buttonVariants({ variant: "link", size: "sm" }), "h-auto p-0")}>
              {t("footer.privacy")}
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{t("legal.privacyTitle")}</DialogTitle>
                <DialogDescription className="text-foreground/90 pt-2">
                  {t("legal.privacyBody")}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className={cn(buttonVariants({ variant: "link", size: "sm" }), "h-auto p-0")}>
              {t("footer.terms")}
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{t("legal.termsTitle")}</DialogTitle>
                <DialogDescription className="text-foreground/90 pt-2">
                  {t("legal.termsBody")}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="bg-background min-h-screen">
      <SiteHeader />
      <main>
        <HeroSection />
        <ScreenshotsSection />
        <RolesSection />
        <ProblemsSection />
        <CapabilitiesSection />
        <DownloadSection />
      </main>
      <SiteFooter />
    </div>
  );
}
