// src/app/components/layout/Sidebar.tsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  AppstoreOutlined, 
  FileTextOutlined, 
  TeamOutlined, 
  MenuOutlined, 
  CloseOutlined 
} from '@ant-design/icons';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Resumen', icon: <AppstoreOutlined /> },
    { path: '/invoice', label: 'Facturas', icon: <FileTextOutlined /> },
    { path: '/client', label: 'Clientes', icon: <TeamOutlined /> },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false); 
  };

  return (
    <>
      <button 
        className={styles.sidebar__toggle} 
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú"
      >
        <MenuOutlined />
      </button>

      <div 
        className={`${styles.sidebar__overlay} ${isOpen ? styles['sidebar__overlay--open'] : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles['sidebar--open'] : ''}`}>
        <div className={styles.sidebar__logo}>
          <div className={styles.sidebar__logoGroup}>
            <span className={styles.sidebar__logoIcon}>M</span>
            Monolegal
          </div>
          
          <button 
            className={styles.sidebar__closeBtn}
            onClick={() => setIsOpen(false)}
          >
            <CloseOutlined />
          </button>
        </div>

        <nav className={styles.sidebar__menu}>
          <div className={styles.sidebar__menuTitle}>Módulos</div>
          
          {menuItems.map((item) => (
            <div
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`${styles.sidebar__menuItem} ${location.pathname === item.path ? styles['sidebar__menuItem--active'] : ''}`}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};