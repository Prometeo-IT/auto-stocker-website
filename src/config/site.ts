const env = import.meta.env;

/** Base URL for `releases/latest/download/<filename>` (no trailing slash). */
const releasesLatestDownloadBase =
  (env.VITE_RELEASES_DOWNLOAD_BASE as string | undefined) ??
  "https://github.com/Prometeo-IT/auto-stocker-app/releases/latest/download";

/**
 * Marketing site configuration. Override via `.env` (Vite `VITE_*` vars).
 */
export const SITE = {
  /** Direct asset URLs for the latest GitHub Release. */
  downloads: {
    windows: `${releasesLatestDownloadBase}/auto-stocker-windows.zip`,
    android: `${releasesLatestDownloadBase}/auto-stocker-android.apk`,
  },
  /** Optional demo or walkthrough video URL. */
  demoVideoUrl: env.VITE_DEMO_VIDEO_URL as string | undefined,
} as const;
