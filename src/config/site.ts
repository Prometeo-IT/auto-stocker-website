/** Path on the Fresh host for app release manifest JSON (same origin as the site). */
export const DOWNLOAD_MANIFEST_PATH = "/downloads/manifest.json";

export function downloadLatestAssetPath(filename: string): string {
  return `/downloads/latest/${encodeURIComponent(filename)}`;
}
