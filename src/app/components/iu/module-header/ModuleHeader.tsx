import styles from './ModuleHeader.module.css';

interface Props {
  title: string;
  subtitle?: string;
}

export const ModuleHeader = ({ title, subtitle }: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.header__info}>
        <h1 className={styles.header__title}>{title}</h1>
        {subtitle && <span className={styles.header__subtitle}>{subtitle}</span>}
      </div>
    </div>
  );
};