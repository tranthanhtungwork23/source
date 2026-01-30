import React from 'react';
import GlassCard from '../ui/GlassCard';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const trendingTopics = [
        { name: 'METAVERSE', icon: '🌌' },
        { name: 'BLOCKCHAIN & WEB3', icon: '⛓️' },
        { name: 'SPACE EXPLORATION', icon: '🚀' },
        { name: 'CYBERSECURITY', icon: '🛡️' },
        { name: 'ROBOTICS', icon: '🤖' },
        { name: 'NANOTECH', icon: '🧬' },
    ];

    const discussions = [
        { user: 'User_X', text: 'This quantum breakthrough is insane! The implications for AI...' },
        { user: 'CyberPunk', text: 'Neuralink needs more regulation before mass adoption.' },
        { user: 'TechGuru', text: 'Just pre-ordered the new holo-lens. Waiting for shipping!' },
    ];

    return (
        <aside className={styles.sidebar}>
            <GlassCard className={styles.section} variant="default">
                <h3 className={styles.title}>TRENDING TOPICS</h3>
                <div className={styles.topics}>
                    {trendingTopics.map((topic, idx) => (
                        <div key={idx} className={styles.topicItem}>
                            <span className={styles.topicIcon}>{topic.icon}</span>
                            <span>{topic.name}</span>
                        </div>
                    ))}
                </div>
            </GlassCard>

            <GlassCard className={styles.section} variant="default">
                <h3 className={styles.title}>LATEST DISCUSSIONS</h3>
                <div className={styles.discussions}>
                    {discussions.map((d, idx) => (
                        <div key={idx} className={styles.discussionItem}>
                            <div className={styles.avatar}></div>
                            <div>
                                <div className={styles.username}>{d.user}</div>
                                <div className={styles.comment}>{d.text}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </aside>
    );
};

export default Sidebar;
