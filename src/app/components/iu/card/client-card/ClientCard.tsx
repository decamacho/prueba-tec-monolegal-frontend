import styles from './ClientCard.module.css';

export interface ClientCardProps {
  id: string;
  nombre: string;
  documento: string;
  contactoEmail: string;
  contactoTelefono: string;
  contactoDireccion: string;
  sumaFacturas: number;
  numeroFacturas: number;
}

export const ClientCard = (props: ClientCardProps) => {
  const initial = props.nombre.charAt(0).toUpperCase();

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__avatar}>{initial}</div>
        <div className={styles['card__title--group']}>
          <h3 className={styles.card__name}>{props.nombre}</h3>
          <span className={styles.card__id}>{props.documento}</span>
        </div>
      </div>

      <div className={styles.card__body}>
        <span className={styles['card__row--contact']}>{props.contactoEmail}</span>
        <span className={styles['card__row--contact']}>{props.contactoTelefono}</span>
        <span className={styles['card__row--contact']}>{props.contactoDireccion}</span>
      </div>

      <div className={styles.card__footer}>
        <div className={styles['card__stats--group']}>
          <div className={styles.card__stat}>
            <span className={styles['card__label--stat']}>Facturas</span>
            <span className={styles['card__value--stat']}>{props.numeroFacturas}</span>
          </div>

          <div className={styles.card__divider}></div>

          <div className={styles.card__stat}>
            <span className={styles['card__label--stat']}>Total compras</span>
            <span className={styles['card__value--stat']}>{props.sumaFacturas}</span>
          </div>
        </div>
      </div>
    </div>
  );
};