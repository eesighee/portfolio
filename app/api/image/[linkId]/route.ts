import { NextRequest, NextResponse } from "next/server";
import { fetchShareLinkAssets } from "../../../../lib/lumavue";

/**
 * Redirects to a fresh signed media URL for a given LumaVue share-link.
 *
 * Query params:
 *   asset    – index into the sorted photo array (default "0")
 *   filename – original filename to look up (overrides asset index)
 *   thumb    – if "1", return the thumbnail URL instead of the full-size URL
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ linkId: string }> },
) {
  const { linkId } = await params;
  const filename = req.nextUrl.searchParams.get("filename");
  const idx = Number(req.nextUrl.searchParams.get("asset") ?? "0");
  const thumb = req.nextUrl.searchParams.get("thumb") === "1";

  try {
    const assets = await fetchShareLinkAssets(linkId);
    const photos = assets
      .filter((a) => a.FileType === "photo")
      .sort((a, b) => a.OriginalFilename.localeCompare(b.OriginalFilename));

    const asset = filename
      ? photos.find((a) => a.OriginalFilename === filename)
      : photos[idx];

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    const url = thumb ? asset.thumbnail_url : asset.media_url;
    return NextResponse.redirect(url, 307);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch assets" },
      { status: 502 },
    );
  }
}
