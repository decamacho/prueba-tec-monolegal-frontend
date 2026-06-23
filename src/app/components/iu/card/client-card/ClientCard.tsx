import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './ClientCard.module.css';

export interface ClientCardProps {
  id: string;
  nombre: string;
  documento: string;
  contactoNombre: string;
  contactoEmail: string;
  contactoTelefono: string;
  totalFacturas: number;
  totalCompras: string;
  onVerDetalle?: (id: string) => void;
}

export const ClientCard = (props: ClientCardProps) => {
  const initial = props.nombre.charAt(0).toUpperCase();

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__avatar}>{initial}</div>
        <div className={styles.card__titleGroup}>
          <h3 className={styles.card__name}>{props.nombre}</h3>
          <span className={styles.card__id}>{props.documento}</span>
        </div>
      </div>

      <div className={styles.card__body}>
        <span className={styles.card__contactRow}>
          Contacto: <span className={styles.card__contactLabel}>{props.contactoNombre}</span>
        </span>
        <span className={styles.card__contactRow}>{props.contactoEmail}</span>
        <span className={styles.card__contactRow}>{props.contactoTelefono}</span>
      </div>

      <div className={styles.card__footer}>
        <div className={styles.card__statsGroup}>
          <div className={styles.card__stat}>
            <span className={styles.card__statLabel}>Facturas</span>
            <span className={styles.card__statValue}>{props.totalFacturas}</span>
          </div>
          
          <div className={styles.card__divider}></div>
          
          <div className={styles.card__stat}>
            <span className={styles.card__statLabel}>Total compras</span>
            <span className={styles.card__statValue}>{props.totalCompras}</span>
          </div>
        </div>

        <button 
          className={styles.card__link} 
          onClick={() => props.onVerDetalle && props.onVerDetalle(props.id)}
        >
          Ver detalle <ArrowRightOutlined style={{ fontSize: '10px' }} />
        </button>
      </div>
    </div>
  );
};