import React from 'react';
import styles from './GlassCard.module.css';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'glowing';
}

const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className = '',
    variant = 'default'
}) => {
    return (
        <div className={`glass-panel ${styles.card} ${variant === 'glowing' ? 'glow-hover' : ''} ${className}`}>
            {children}
            <div className={styles.reflection} />
        </div>
    );
};

export default GlassCard;
