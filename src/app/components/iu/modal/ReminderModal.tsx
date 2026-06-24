import { MailOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import tableStyles from '../data-table/table/Table.module.css';
import styles from './ReminderModal.module.css';
import { LoadMessage } from '../load-message/LoadMessage';

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
  isSending: boolean;
}

export const ReminderModal = ({ isOpen, onClose, onConfirm, facturas, isSending }: ReminderModalProps) => {
  if (!isOpen) return null;

  const isBulk = facturas.length > 1;
  const title = isBulk ? 'Envío masivo de recordatorios' : 'Enviar recordatorio';
  const subtitle = isBulk ? `${facturas.length} facturas seleccionadas` : '1 factura seleccionada';
  const buttonText = isBulk ? `Enviar ${facturas.length} correos` : 'Enviar 1 correo';

  return (
    <div className={styles.reminderModal} onClick={onClose}>
      <div className={styles.reminderModal__content} onClick={(e) => e.stopPropagation()}>

        <div className={styles.reminderModal__header}>
          <div className={styles.reminderModal__headerContent}>
            <div className={styles.reminderModal__iconBox}>
              <MailOutlined />
            </div>
            <div className={styles.reminderModal__titleGroup}>
              <h2 className={styles.reminderModal__title}>{title}</h2>
              <span className={styles.reminderModal__subtitle}>{subtitle}</span>
            </div>
          </div>
          <button className={styles.reminderModal__closeBtn} onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>

        <div className={styles.reminderModal__body}>
          {isSending ? (
            <LoadMessage message={'Enviando recordatorio(s)...'} />
          ) : (
            <>
              <p className={styles.reminderModal__instruction}>
                Se enviará un correo de recordatorio a los siguientes clientes:
              </p>

              <div className={styles.reminderModal__list}>
                {facturas.map((fac) => {
                  const estadoCss = fac.stateRemember.toLowerCase();
                  return (
                    <div key={fac.id} className={styles.invoiceItem}>
                      <div className={styles.invoiceItem__info}>
                        <span className={styles.invoiceItem__name}>{fac.nombreCliente}</span>
                      </div>
                      {/* Uso de la clase combinada desde Table.module.css */}
                      <span className={`${tableStyles.badge} ${tableStyles[`badge--${estadoCss}`]}`}>
                        {fac.visualState}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className={styles.reminderModal__footer}>
          <button
            className={`${styles.btn} ${styles['btn--cancel']}`}
            onClick={onClose}
            disabled={isSending}
          >
            Cancelar
          </button>
          <button
            className={`${styles.btn} ${styles['btn--submit']}`}
            onClick={onConfirm}
            disabled={isSending}
          >
            <SendOutlined /> {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};