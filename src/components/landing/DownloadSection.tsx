import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Download, Monitor, Smartphone } from "lucide-react";

import {
  downloadAssetHref,
  downloadManifestUrl,
} from "@/config/site";
import { buttonVariants } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const DOWNLOAD_ASSET_I18N: Record<
  string,
  { titleKey: string; hintKey: string }
> = {
  "auto-stocker-windows.zip": {
    titleKey: "download.platforms.windows",
    hintKey: "download.platforms.windowsHint",
  },
  "auto-stocker-android.apk": {
    titleKey: "download.platforms.androidApk",
    hintKey: "download.platforms.androidApkHint",
  },
};

type DownloadPlatform = {
  key: keyof typeof DOWNLOAD_ASSET_I18N;
  filename: string;
  icon: typeof Download;
};

type AppReleaseManifestAsset = {
  name?: string;
  href?: string;
  url?: string;
  downloadUrl?: string;
  browser_download_url?: string;
};

type AppReleaseManifestJson = {
  tag?: string;
  assets?: AppReleaseManifestAsset[];
  files?: AppReleaseManifestAsset[];
};

const DOWNLOAD_PLATFORMS: DownloadPlatform[] = [
  { key: "auto-stocker-windows.zip", filename: "auto-stocker-windows.zip", icon: Monitor },
  { key: "auto-stocker-android.apk", filename: "auto-stocker-android.apk", icon: Smartphone },
];

export function DownloadSection() {
  const { t } = useTranslation();
  const [manifest, setManifest] = useState<AppReleaseManifestJson | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(false);
    void fetch(downloadManifestUrl())
      .then((res) => {
        if (!res.ok) throw new Error("manifest");
        return res.json() as Promise<AppReleaseManifestJson>;
      })
      .then((data) => {
        if (!cancelled) setManifest(data);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const assets = manifest?.assets ?? manifest?.files ?? [];

  return (
    <section
      id="download"
      className="scroll-mt-20 border-t bg-gradient-to-b from-muted/40 to-background py-16 md:py-20"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-foreground mb-4 text-2xl font-semibold tracking-tight md:text-3xl">
          {t("download.title")}
        </h2>
        {manifest?.tag ? (
          <p className="text-muted-foreground mb-1 text-sm">{t("download.versionLine", { tag: manifest.tag })}</p>
        ) : null}
        <p className="text-muted-foreground mb-8 max-w-3xl leading-relaxed">{t("download.intro")}</p>
        {loading ? <p className="text-muted-foreground mb-4 text-sm">{t("download.loading")}</p> : null}
        {loadError ? <p className="mb-4 text-sm text-red-600">{t("download.loadError")}</p> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          {DOWNLOAD_PLATFORMS.map(({ key, filename, icon: Icon }) => {
            const i18nKeys = DOWNLOAD_ASSET_I18N[key];
            const matched = assets.find((asset) => asset.name === filename);
            const href =
              matched?.href ??
              matched?.downloadUrl ??
              matched?.browser_download_url ??
              matched?.url ??
              downloadAssetHref(`/downloads/${filename}`);
            return (
              <Card key={key} size="sm" className="flex flex-col">
                <CardHeader className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="text-muted-foreground size-5 shrink-0" aria-hidden />
                    <CardTitle className="text-lg">{t(i18nKeys.titleKey)}</CardTitle>
                  </div>
                  <CardDescription>{t(i18nKeys.hintKey)}</CardDescription>
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
            );
          })}
        </div>
        {!loading && !loadError && assets.length === 0 ? (
          <p className="text-muted-foreground mt-4 text-sm">{t("download.empty")}</p>
        ) : null}
      </div>
    </section>
  );
}
