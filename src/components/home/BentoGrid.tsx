import React from 'react';
import Link from 'next/link';
import GlassCard from '../ui/GlassCard';
import styles from './BentoGrid.module.css';
import { Post } from '@/lib/get-posts';

interface BentoGridProps {
    posts: Post[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ posts }) => {
    // We map the posts to specific grid slots
    const [hero, tall, wide, small1, small2] = posts;

    return (
        <div className={styles.grid}>
            {/* 1. Featured Main Article - Full Width */}
            {hero && (
                <GlassCard className={`${styles.card} ${styles.hero}`} variant="glowing">
                    <div
                        className={styles.imageOverlay}
                        style={{ backgroundImage: `url(${hero.featuredImage?.node.sourceUrl || 'https://images.unsplash.com/photo-1614728853913-1e3258af70d7?q=80&w=2070&auto=format&fit=crop'})` }}
                    ></div>
                    <div className={styles.content}>
                        <span className={styles.tag}>FEATURED</span>
                        <Link href={`/posts/${hero.slug}`}>
                            <h2 className={styles.headline} dangerouslySetInnerHTML={{ __html: hero.title }} />
                        </Link>
                        <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: hero.excerpt }} />
                        <Link href={`/posts/${hero.slug}`} className={styles.readMore}>
                            READ MORE
                        </Link>
                    </div>
                </GlassCard>
            )}

            {/* 2. Vertical/Tall Article (Left) */}
            {tall && (
                <GlassCard className={`${styles.card} ${styles.tall}`} variant="glowing">
                    <div
                        className={styles.imageOverlay}
                        style={{ backgroundImage: `url(${tall.featuredImage?.node.sourceUrl || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop'})` }}
                    ></div>
                    <div className={styles.content}>
                        <Link href={`/posts/${tall.slug}`}>
                            <h3 className={styles.subHeadline} dangerouslySetInnerHTML={{ __html: tall.title }} />
                        </Link>
                        <Link href={`/posts/${tall.slug}`} className={styles.readMoreSm}>
                            READ MORE
                        </Link>
                    </div>
                </GlassCard>
            )}

            {/* 3. Wide Article (Top Right) */}
            {wide && (
                <GlassCard className={`${styles.card} ${styles.wide}`} variant="glowing">
                    <div
                        className={styles.imageOverlay}
                        style={{ backgroundImage: `url(${wide.featuredImage?.node.sourceUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'})` }}
                    ></div>
                    <div className={styles.content}>
                        <Link href={`/posts/${wide.slug}`}>
                            <h3 className={styles.subHeadline} dangerouslySetInnerHTML={{ __html: wide.title }} />
                        </Link>
                        <Link href={`/posts/${wide.slug}`} className={styles.readMoreSm}>
                            READ MORE
                        </Link>
                    </div>
                </GlassCard>
            )}

            {/* 4. Small Article 1 (Bot Middle) */}
            {small1 && (
                <GlassCard className={`${styles.card} ${styles.small1}`} variant="glowing">
                    <div
                        className={styles.imageOverlay}
                        style={{ backgroundImage: `url(${small1.featuredImage?.node.sourceUrl || 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1974&auto=format&fit=crop'})` }}
                    ></div>
                    <div className={styles.content}>
                        <Link href={`/posts/${small1.slug}`}>
                            <h3 className={styles.subHeadline} dangerouslySetInnerHTML={{ __html: small1.title }} />
                        </Link>
                        <Link href={`/posts/${small1.slug}`} className={styles.readMoreSm}>
                            READ MORE
                        </Link>
                    </div>
                </GlassCard>
            )}

            {/* 5. Small Article 2 (Bot Right) */}
            {small2 && (
                <GlassCard className={`${styles.card} ${styles.small2}`} variant="glowing">
                    <div
                        className={styles.imageOverlay}
                        style={{ backgroundImage: `url(${small2.featuredImage?.node.sourceUrl || 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1974&auto=format&fit=crop'})` }}
                    ></div>
                    <div className={styles.content}>
                        <Link href={`/posts/${small2.slug}`}>
                            <h3 className={styles.subHeadline} dangerouslySetInnerHTML={{ __html: small2.title }} />
                        </Link>
                        <Link href={`/posts/${small2.slug}`} className={styles.readMoreSm}>
                            READ MORE
                        </Link>
                    </div>
                </GlassCard>
            )}
        </div>
    );
};

export default BentoGrid;
