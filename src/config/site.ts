const env = import.meta.env;

const downloadsBaseUrl =
  (env.VITE_DOWNLOADS_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

/**
 * Marketing site configuration. Override via `.env` (Vite `VITE_*` vars).
 */
export const SITE = {
  /**
   * API origin for download links and manifest when the site is not served from
   * the same host as the Fresh server (e.g. Vite dev or static CDN). Empty =
   * same origin (production with `deno task dev` / deployed Fresh).
   */
  downloadsBaseUrl,
} as const;

export function downloadManifestUrl(): string {
  return downloadsBaseUrl
    ? `${downloadsBaseUrl}/downloads/manifest.json`
    : "/downloads/manifest.json";
}

/** Prefix same-origin paths when `downloadsBaseUrl` is set (cross-origin). */
export function downloadAssetHref(pathFromRoot: string): string {
  const path = pathFromRoot.startsWith("/") ? pathFromRoot : `/${pathFromRoot}`;
  return downloadsBaseUrl ? `${downloadsBaseUrl}${path}` : path;
}
