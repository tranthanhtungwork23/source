import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { getCategories, getSiteSettings } from '@/lib/get-posts';
import Nav from './Nav';

const Header = async () => {
    const categories = await getCategories();
    const settings = await getSiteSettings();

    return (
        <header className={`${styles.header} glass-panel`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <span className="text-gradient" style={{ textTransform: 'uppercase' }}>
                        {settings.title}
                    </span>
                </div>

                <Nav categories={categories} />

                <div className={styles.actions}>
                    <button className={styles.iconBtn} aria-label="Search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button className={styles.iconBtn} aria-label="User">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
