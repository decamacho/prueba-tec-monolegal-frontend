import { SearchOutlined, BellOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './ModuleHeader.module.css';

interface Props {
  title: string;
  subtitle?: string;
  onNewClick?: () => void;
}

export const ModuleHeader = ({ title, subtitle, onNewClick }: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.header__info}>
        <h1 className={styles.header__title}>{title}</h1>
        {subtitle && <span className={styles.header__subtitle}>{subtitle}</span>}
      </div>

      <div className={styles.header__actions}>
        <div className={styles.header__searchContainer}>
          <SearchOutlined className={styles.header__searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className={styles.header__searchInput}
          />
        </div>

        <div className={styles.header__notification}>
          <BellOutlined />
          <span className={styles.header__notificationBadge}></span>
        </div>

        <button className={styles.header__btnNew} onClick={onNewClick}>
          <PlusOutlined /> Nuevo
        </button>
      </div>
    </div>
  );
};