import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "../../content/posts";

export const metadata: Metadata = {
  title: "Blog — Fotos de Alegria",
  description: "Photo stories and sets by Isai Alegria.",
  openGraph: {
    title: "Blog — Fotos de Alegria",
    description: "Photo stories and sets by Isai Alegria.",
    type: "website",
  },
};

export default function BlogPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="min-h-screen pt-20">
      <header className="container mx-auto px-4 pt-8 pb-8">
        <h1 className="text-4xl font-bold">Blog</h1>
      </header>

      <main className="container mx-auto px-4 pb-16">
        {sorted.length === 0 ? (
          <p className="text-center text-silver-soft text-lg mt-12">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-[var(--edge)] bg-film rounded-sm overflow-hidden hover:border-safelight/40 transition duration-300 focus:outline-none focus:ring-2 focus:ring-safelight"
              >
                <div className="relative w-full h-48">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/image/${post.shareLinkId}?${post.cover ? `filename=${encodeURIComponent(post.cover)}` : "asset=0"}&thumb=1`}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <time className="text-xs text-silver-faint">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="text-xl font-semibold mt-1 group-hover:text-safelight transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-silver-soft mt-2 line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
