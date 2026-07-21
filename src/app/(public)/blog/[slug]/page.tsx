import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ApiError, apiFetch } from "@/lib/api";
import type { CmsPage } from "@/lib/types";

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: CmsPage;
  try {
    post = await apiFetch<CmsPage>(`/cms/pages/${slug}`, { anonymous: true });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  if (post.type !== "article") notFound();

  const gallery = post.images ?? [];

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <Reveal>
          <Link href="/blog" className="text-sm font-semibold text-stf-blue hover:underline">
            ← Toutes les actualités
          </Link>
        </Reveal>

        {post.image_url ? (
          <Reveal delay={60}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image_url}
              alt=""
              className="mt-6 h-64 w-full rounded-2xl object-cover sm:h-80"
            />
          </Reveal>
        ) : null}

        <Reveal delay={100}>
          <div className="mt-6 flex items-center justify-between">
            <Badge tone="neutral">{post.category}</Badge>
            {post.published_at ? (
              <time className="text-xs text-slate-400 dark:text-slate-500">
                {new Date(post.published_at).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            ) : null}
          </div>
          <h1 className="mt-4 text-3xl font-bold text-stf-navy dark:text-white">{post.title}</h1>
          {post.body ? (
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {post.body}
            </p>
          ) : null}
        </Reveal>

        {gallery.length > 0 ? (
          <Reveal delay={140} className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stf-orange">Galerie photos</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {gallery.map((image) =>
                image.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={image.id}
                    src={image.image_url}
                    alt=""
                    className="h-32 w-full rounded-xl object-cover sm:h-36"
                  />
                ) : null
              )}
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
