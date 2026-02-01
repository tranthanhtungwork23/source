'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { Category } from '@/lib/get-posts';

interface NavProps {
    categories: Category[];
}

const Nav: React.FC<NavProps> = ({ categories }) => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className={styles.nav}>
            <Link
                href="/"
                className={`${styles.link} ${isActive('/') ? styles.active : ''}`}
            >
                HOME
            </Link>
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className={`${styles.link} ${isActive(`/category/${category.slug}`) ? styles.active : ''}`}
                >
                    {category.name.toUpperCase()}
                </Link>
            ))}
        </nav>
    );
};

export default Nav;
