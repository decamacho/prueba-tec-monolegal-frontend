import { MailOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import tableStyles from '../data-table/table/Table.module.css';
import styles from './ReminderModal.module.css';

export interface FacturaModalItem {
  id: string;
  codigoFactura: string;
  nombreCliente: string;
  visualState: string;
  stateRemember: string;
}

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  facturas: FacturaModalItem[];
}

export const ReminderModal = ({ isOpen, onClose, onConfirm, facturas }: ReminderModalProps) => {
  if (!isOpen) return null;

  const isBulk = facturas.length > 1;
  const title = isBulk ? 'Envío masivo de recordatorios' : 'Enviar recordatorio';
  const subtitle = isBulk ? `${facturas.length} facturas seleccionadas` : '1 factura seleccionada';
  const buttonText = isBulk ? `Enviar ${facturas.length} correos` : 'Enviar 1 correo';

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.modal__header}>
          <div className={styles.modal__headerContent}>
            <div className={styles.modal__iconBox}>
              <MailOutlined />
            </div>
            <div className={styles.modal__titleGroup}>
              <h2 className={styles.modal__title}>{title}</h2>
              <span className={styles.modal__subtitle}>{subtitle}</span>
            </div>
          </div>
          <button className={styles.modal__closeBtn} onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>

        <div className={styles.modal__body}>
          <p className={styles.modal__instruction}>
            Se enviará un correo de recordatorio a los siguientes clientes:
          </p>
          
          <div className={styles.modal__list}>
            {facturas.map((fac) => {
              const estadoCss = fac.stateRemember.toLowerCase();
              return (
                <div key={fac.id} className={styles.invoiceItem}>
                  <div className={styles.invoiceItem__info}>
                    <span className={styles.invoiceItem__name}>{fac.nombreCliente}</span>
                  </div>
                  <span className={`${tableStyles.badge} ${tableStyles[`badge--${estadoCss}`]}`}>
                    {fac.visualState}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.modal__footer}>
          <button className={`${styles.btn} ${styles['btn--cancel']}`} onClick={onClose}>
            Cancelar
          </button>
          <button className={`${styles.btn} ${styles['btn--submit']}`} onClick={onConfirm}>
            <SendOutlined /> {buttonText}
          </button>
        </div>

      </div>
    </div>
  );
};