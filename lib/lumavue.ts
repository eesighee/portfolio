export type LumaVueAsset = {
  AssetID: string;
  OriginalFilename: string;
  media_url: string;
  thumbnail_url: string;
  FileType: string;
  GalleryName: string;
};

type ShareLinkResponse = {
  gallery_name: string;
  assets: LumaVueAsset[];
  count: number;
};

export type ResolvedPhoto = {
  src: string;
  alt: string;
  caption?: string;
  thumbnailUrl: string;
};

const API_BASE = process.env.LUMAVUE_API_BASE_URL;

export async function fetchShareLinkAssets(
  linkId: string,
): Promise<LumaVueAsset[]> {
  if (!API_BASE) {
    throw new Error("LUMAVUE_API_BASE_URL is not configured");
  }

  const res = await fetch(`${API_BASE}/share/${linkId}/assets`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `LumaVue API error: ${res.status} ${res.statusText}`,
    );
  }

  const data: ShareLinkResponse = await res.json();
  return data.assets;
}

export function resolvePhotos(
  assets: LumaVueAsset[],
  captions?: Record<string, string>,
): ResolvedPhoto[] {
  return assets
    .filter((a) => a.FileType === "photo")
    .sort((a, b) =>
      a.OriginalFilename.localeCompare(b.OriginalFilename),
    )
    .map((a) => ({
      src: a.media_url,
      alt: a.OriginalFilename.replace(/\.[^.]+$/, "").replace(
        /[-_]/g,
        " ",
      ),
      caption: captions?.[a.OriginalFilename],
      thumbnailUrl: a.thumbnail_url,
    }));
}
