import React from 'react';
import styles from './Card.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconVariant?: 'primary' | 'warning' | 'danger' | 'success';
  trendValue?: string;
  trendIsPositive?: boolean;
  trendText?: string;
}

export const Card = ({ 
  title, 
  value, 
  icon, 
  iconVariant = 'primary',
}: StatCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h3 className={styles.card__title}>{title}</h3>
        <div className={`${styles.card__iconWrapper} ${styles[`card__iconWrapper--${iconVariant}`]}`}>
          {icon}
        </div>
      </div>
      
      <div className={styles.card__body}>
        <p className={styles.card__value}>{value}</p>
      </div>
    </div>
  );
};