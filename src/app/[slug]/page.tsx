import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPages, getPageBySlug } from '@/lib/get-pages';
import GlassCard from '@/components/ui/GlassCard';
import styles from './page.module.css';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

// SSG: Generate static params for all pages
export async function generateStaticParams() {
    const pages = await getPages();
    return pages.map((page) => ({
        slug: page.slug,
    }));
}

// SEO: Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);
    if (!page) return {};

    return {
        title: `${page.title} | TechnoVerse`,
        description: page.content.replace(/<[^>]*>/g, '').slice(0, 160), // Strip HTML tags
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.backLink}>
                ← Back to Home
            </Link>

            <GlassCard className={styles.articleCard} variant="default">
                <header className={styles.header}>
                    <div className={styles.meta}>
                        <span className={styles.date}>{page.date ? new Date(page.date).toLocaleDateString() : ''}</span>
                        {/* Pages might not have categories like Posts, so we can omit or check if "Page" makes sense */}
                        {/* <span className={styles.tag}>Page</span> */}
                    </div>
                    <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: page.title }} />

                    {page.featuredImage && (
                        <img
                            src={page.featuredImage.node.sourceUrl}
                            alt={page.title}
                            className={styles.featuredImage}
                        />
                    )}
                </header>

                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </GlassCard>
        </div>
    );
}
