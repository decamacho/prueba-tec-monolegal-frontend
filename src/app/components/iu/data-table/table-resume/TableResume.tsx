import { useNavigate } from 'react-router-dom';
import type { ResumeInvoice } from '../../../../hooks/dashboard/useDashboardLogic';
import styles from './TableResume.module.css';

export const TableResume = ({ latestInvoices }: { latestInvoices: ResumeInvoice[] }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.tableResume}>
      
      <div className={styles.tableResume__header}>
        <h3 className={styles.tableResume__title}>Últimas facturas</h3>
        <span 
          className={styles.tableResume__link} 
          onClick={() => navigate('/invoice')}
        >
          Ver todas
        </span>
      </div>

      <div className={styles.tableResume__list}>
        {latestInvoices.map((invoice) => (
          <div key={invoice.id} className={styles.tableResume__row}>
            
            <div className={styles.tableResume__clientInfo}>
              <span className={styles.tableResume__clientName}>
                {invoice.clientName}
              </span>
              <span className={styles.tableResume__invoiceId}>
                {invoice.id}
              </span>
            </div>
            
            <div className={styles.tableResume__financialInfo}>
              <span className={styles.tableResume__amount}>
                {invoice.amountFormatted}
              </span>
              
              <span className={`
                ${styles.tableResume__badge} 
                ${styles[`tableResume__badge--${invoice.cssClass}`]}
              `}>
                {invoice.visualStatus}
              </span>
            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
};