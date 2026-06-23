import styles from './TableResume.module.css';

const mockFacturas = [
  { id: 'FAC-2024-001', cliente: 'Distribuidora El Norte S.A.', monto: '$4.850.000', estado: 'Pagada' },
  { id: 'FAC-2024-002', cliente: 'Comercial Andina Ltda.', monto: '$1.230.000', estado: 'Pendiente' },
  { id: 'FAC-2024-003', cliente: 'Inversiones Patagonia', monto: '$7.600.000', estado: 'Vencida' },
  { id: 'FAC-2024-004', cliente: 'Tech Solutions SpA', monto: '$980.000', estado: 'Pendiente' },
];

export const TableResume = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Últimas facturas</h3>
        <span className={styles.link}>Ver todas</span>
      </div>
      
      <div className={styles.list}>
        {mockFacturas.map((fac) => (
          <div key={fac.id} className={styles.row}>
            <div className={styles.clientInfo}>
              <span className={styles.clientName}>{fac.cliente}</span>
              <span className={styles.invoiceId}>{fac.id}</span>
            </div>
            <div className={styles.financialInfo}>
              <span className={styles.amount}>{fac.monto}</span>
              <span className={`${styles.badge} ${styles[`badge--${fac.estado.toLowerCase()}`]}`}>
                {fac.estado}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};