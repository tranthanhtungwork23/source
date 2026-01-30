import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts, getPostBySlug } from '@/lib/get-posts';
import GlassCard from '@/components/ui/GlassCard';
import styles from './page.module.css';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

// SSG: Generate static params for all posts
export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// SEO: Generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    if (!post) return {};

    return {
        title: `${post.title} | TechnoVerse`,
        description: post.excerpt.replace(/<[^>]*>/g, '').slice(0, 160), // Strip HTML tags
    };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
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
                        <span className={styles.date}>{post.date ? new Date(post.date).toLocaleDateString() : 'Futuristic Era'}</span>
                        <span className={styles.tag}>Technology</span>
                    </div>
                    <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title }} />

                    {post.featuredImage && (
                        <img
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            className={styles.featuredImage}
                        />
                    )}
                </header>

                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </GlassCard>
        </div>
    );
}
