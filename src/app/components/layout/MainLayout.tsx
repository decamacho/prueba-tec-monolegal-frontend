import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { Sidebar } from './sidebar/Sidebar';

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.layout__main}>
        <section className={styles.layout__content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};