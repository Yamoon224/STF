import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { apiFetch } from "@/lib/api";
import { getPageSections } from "@/lib/pageSections";
import type { CmsPage } from "@/lib/types";

export default async function BlogPage() {
  const [blogPosts, sections] = await Promise.all([
    apiFetch<CmsPage[]>("/cms/pages?type=article", { anonymous: true }),
    getPageSections("blog"),
  ]);

  const hero = sections.hero?.payload as { eyebrow?: string; title?: string; description?: string } | undefined;

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? "Blog & actualités"}
        title={hero?.title ?? "Les nouvelles de STF"}
        description={hero?.description ?? ""}
      />

      <section className="py-24">
        <Container className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 90}>
              <article className="h-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:border-border-default dark:bg-surface">
                {post.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.image_url} alt="" className="h-40 w-full object-cover" />
                ) : null}
                <div className="p-6">
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
                </div>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
