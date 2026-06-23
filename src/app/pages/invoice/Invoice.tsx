// src/app/pages/Invoice.tsx
import { SendOutlined, MailOutlined } from '@ant-design/icons';
import tableStyles from '../../components/iu/data-table/table/Table.module.css';
import styles from './Invoice.module.css';
import { ModuleHeader } from '../../components/iu/module-header/ModuleHeader';
import { Table, type Column } from '../../components/iu/data-table/table/Table';
import { ReminderModal } from '../../components/iu/modal/ReminderModal';
import { useInvoiceLogic, type InvoiceView } from '../../hooks/invoice/useInvoiceLogic';

export const Invoice = () => {
  const {
    filterInvoices,
    isLoading,
    isError,
    filters,
    stateFilter,
    setStateFilter,
    isModalOpen,
    invoiceForModal,
    cantidadRecordatorios,
    handlers,
  } = useInvoiceLogic();

  const columns: Column<InvoiceView>[] = [
    {
      key: 'codigo',
      title: 'Nº Factura',
      render: (fac) => <span className="font-medium text-gray-500">{fac.codigoFactura}</span>
    },
    {
      key: 'cliente',
      title: 'Cliente',
      render: (fac) => <span className="font-semibold">{fac.nombreCliente}</span>
    },
    {
      key: 'monto',
      title: 'Monto',
      render: (fac) => <span className="font-bold">${fac.totalCobro.toLocaleString('es-CO')}</span>
    },
    {
      key: 'estado',
      title: 'Estado',
      render: (fac) => {
        const estadoCss = fac.stateRemember.toLowerCase();
        return (
          <span className={`${tableStyles.badge} ${tableStyles[`badge--${estadoCss}`]}`}>
            {fac.visualState}
          </span>
        );
      }
    },
    {
      key: 'recordatorio',
      title: 'Recordatorio',
      render: (fac) => {
        if (fac.stateRemember === 'desactivado') {
          return <span className="text-gray-400 pl-6">—</span>;
        }
        return (
          <button 
            className={styles.invoice__btnRemember}
            onClick={() => handlers.onIndividualClick(fac)}
          >
            <MailOutlined /> Recordar
          </button>
        );
      }
    }
  ];

  return (
    <div className={styles.invoice}>
      <ModuleHeader
        title="Facturas" 
        subtitle={`${filterInvoices.length} resultados`} 
      />

      <div className={styles.invoice__toolbar}>
        <div className={styles.invoice__filters}>
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setStateFilter(filter)}
              className={`${styles.invoice__filterBtn} ${stateFilter === filter ? styles['invoice__filterBtn--active'] : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button 
          className={styles.invoice__btnMasive}
          onClick={handlers.onMasiveClick}
          disabled={cantidadRecordatorios === 0}
          style={{ opacity: cantidadRecordatorios === 0 ? 0.5 : 1, cursor: cantidadRecordatorios === 0 ? 'not-allowed' : 'pointer' }}
        >
          <SendOutlined /> Enviar recordatorios ({cantidadRecordatorios})
        </button>
      </div>

      <Table 
        columns={columns} 
        data={isError ? [] : filterInvoices} 
        isLoading={isLoading} 
      />

      <ReminderModal
        isOpen={isModalOpen}
        onClose={handlers.onCloseModal}
        onConfirm={handlers.onConfirmSend}
        facturas={invoiceForModal}
      />
    </div>
  );
};