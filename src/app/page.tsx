import BentoGrid from '@/components/home/BentoGrid';
import Sidebar from '@/components/home/Sidebar';
import styles from './page.module.css';
import { getPosts } from '@/lib/get-posts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
    const posts = await getPosts();

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <section className={styles.mainFeed}>
                    <BentoGrid posts={posts} />
                </section>

                <aside className={styles.sidebarWrapper}>
                    <Sidebar />
                </aside>
            </div>
        </div>
    );
}
