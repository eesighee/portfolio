import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts } from "../../../content/posts";
import { fetchShareLinkAssets, resolvePhotos } from "../../../lib/lumavue";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const assets = await fetchShareLinkAssets(post.shareLinkId);
  const photos = resolvePhotos(assets, post.captions);
  const ogImage = photos[0]?.thumbnailUrl;

  return {
    title: `${post.title} — Fotos de Alegria`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      ...(ogImage && { images: [{ url: ogImage }] }),
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const assets = await fetchShareLinkAssets(post.shareLinkId);
  const photos = resolvePhotos(assets, post.captions);

  return (
    <div
      className="min-h-screen text-[var(--text-light)] pt-20"
      style={{
        backgroundImage: `
          radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px),
          linear-gradient(135deg, #121212 0%, #3A3A3A 50%, #121212 100%)
        `,
        backgroundSize: "12px 12px, 100% 100%",
        backgroundAttachment: "scroll, fixed",
      }}
    >
      <main className="container mx-auto px-4 pb-16 max-w-4xl pt-8">
        <time className="text-sm text-[var(--accent)]">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-[var(--accent)] mb-16">
          {post.description}
        </p>

        <div className="w-16 h-px bg-[var(--gold)]/40 mx-auto mb-12" />

        <div className="space-y-8 md:space-y-16">
          {photos.map((photo, i) => (
            <figure key={i} className="border border-white/10 rounded-sm p-3 bg-[var(--secondary-dark)]">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="rounded-sm"
                />
              </div>
              {photo.caption && (
                <figcaption className="mt-4 text-center text-sm text-[var(--accent)]">
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </main>
    </div>
  );
}
