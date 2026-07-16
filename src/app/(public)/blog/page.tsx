import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { apiFetch } from "@/lib/api";
import type { CmsPage } from "@/lib/types";

export default async function BlogPage() {
  const blogPosts = await apiFetch<CmsPage[]>("/cms/pages?type=article", { anonymous: true });

  return (
    <>
      <PageHero
        eyebrow="Blog & actualités"
        title="Les nouvelles de STF"
        description="Articles, annonces, retours d'expérience, médias et galerie photos et vidéos autour des programmes STF."
      />

      <section className="py-20">
        <Container className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface"
            >
              <div className="flex items-center justify-between">
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
              <h2 className="mt-4 text-lg font-bold text-stf-navy dark:text-white">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-stf-blue">
                Lire l&apos;article →
              </span>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
