import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { BlogDateFilter } from "@/components/ui/BlogDateFilter";
import { apiFetch } from "@/lib/api";
import { getPageSections } from "@/lib/pageSections";
import type { CmsPage } from "@/lib/types";

const PAGE_SIZE = 9;

function pageHref(page: number, year?: string) {
  const params = new URLSearchParams();
  if (year) params.set("year", year);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/blog${qs ? `?${qs}` : ""}`;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; year?: string }>;
}) {
  const { page, year } = await searchParams;

  const [allPosts, sections] = await Promise.all([
    apiFetch<CmsPage[]>("/cms/pages?type=article", { anonymous: true }),
    getPageSections("blog"),
  ]);

  const hero = sections.hero?.payload as { eyebrow?: string; title?: string; description?: string } | undefined;

  const years = Array.from(
    new Set(
      allPosts
        .filter((post) => post.published_at)
        .map((post) => new Date(post.published_at as string).getFullYear())
    )
  ).sort((a, b) => b - a);

  const filteredPosts = year
    ? allPosts.filter((post) => post.published_at && new Date(post.published_at).getFullYear() === Number(year))
    : allPosts;

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const blogPosts = filteredPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? "Blog & actualités"}
        title={hero?.title ?? "Les nouvelles de STF"}
        description={hero?.description ?? ""}
      />

      <section className="py-24">
        <Container>
          {years.length > 0 ? (
            <div className="mb-10 flex justify-end">
              <BlogDateFilter years={years} selected={year} />
            </div>
          ) : null}

          {blogPosts.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
              Aucune actualité pour cette période.
            </p>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 90}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block h-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:border-border-default dark:bg-surface"
                  >
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
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <div className="mt-14 flex items-center justify-center gap-6">
              {currentPage > 1 ? (
                <Link
                  href={pageHref(currentPage - 1, year)}
                  className="text-sm font-semibold text-stf-blue hover:underline"
                >
                  ← Précédent
                </Link>
              ) : (
                <span className="text-sm font-semibold text-slate-300 dark:text-slate-600">← Précédent</span>
              )}

              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {currentPage}/{totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={pageHref(currentPage + 1, year)}
                  className="text-sm font-semibold text-stf-blue hover:underline"
                >
                  Suivant →
                </Link>
              ) : (
                <span className="text-sm font-semibold text-slate-300 dark:text-slate-600">Suivant →</span>
              )}
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
