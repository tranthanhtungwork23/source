import { notFound } from 'next/navigation';
import BentoGrid from '@/components/home/BentoGrid';
import Sidebar from '@/components/home/Sidebar';
import styles from './page.module.css';
import { getCategoryBySlug } from '@/lib/get-posts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getCategoryBySlug(slug);
    if (!data) return {};

    return {
        title: `${data.name} | TechnoVerse`,
        description: `Explore the latest news and updates in ${data.name}.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getCategoryBySlug(slug);

    if (!data) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{data.name}</h1>
            </header>

            <div className={styles.contentWrapper}>
                <section className={styles.mainFeed}>
                    <BentoGrid posts={data.posts} />
                </section>

                <aside className={styles.sidebarWrapper}>
                    <Sidebar />
                </aside>
            </div>
        </div>
    );
}
