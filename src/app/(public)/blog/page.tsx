import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/lib/mock-data";

export default function BlogPage() {
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
            <article key={post.slug} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <Badge tone="neutral">{post.category}</Badge>
                <time className="text-xs text-slate-400">
                  {new Date(post.date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
              <h2 className="mt-4 text-lg font-bold text-stf-navy">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-stf-blue">
                Lire l'article →
              </span>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
