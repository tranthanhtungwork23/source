import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { getSiteSettings } from '@/lib/get-posts';

const Footer = async () => {
    const settings = await getSiteSettings();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Brand Column */}
                <div className={styles.column}>
                    <div className="text-gradient font-bold text-xl mb-4" style={{ fontFamily: "'Orbitron', sans-serif", textTransform: 'uppercase' }}>
                        {settings.title}
                    </div>
                    <p className={styles.brandDesc}>
                        {settings.description}
                    </p>
                    <div className={styles.social}>
                        {/* Placeholder Social Icons */}
                        <a href="#" className={styles.socialLink} aria-label="Twitter">Twitter</a>
                        <a href="#" className={styles.socialLink} aria-label="Github">Github</a>
                        <a href="#" className={styles.socialLink} aria-label="Discord">Discord</a>
                    </div>
                </div>

                {/* Quick Links Column */}
                <div className={styles.column}>
                    <h3>EXPLORE</h3>
                    <ul className={styles.links}>
                        <li><Link href="/category/news">News</Link></li>
                        <li><Link href="/category/blockchain-web3">Blockchain & Web3</Link></li>
                        <li><Link href="/category/cybersecurity">Cybersecurity</Link></li>
                        <li><Link href="/category/metaverse">Metaverse</Link></li>
                        <li><Link href="/category/robotics">Robotics</Link></li>
                    </ul>
                </div>

                {/* Legal/Info Column */}
                <div className={styles.column}>
                    <h3>COMPANY</h3>
                    <ul className={styles.links}>
                        <li><Link href="#">About Us</Link></li>
                        <li><Link href="#">Contact</Link></li>
                        <li><Link href="#">Privacy Policy</Link></li>
                        <li><Link href="#">Terms of Service</Link></li>
                        <li><Link href="#">Advertise</Link></li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} {settings.title}. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
