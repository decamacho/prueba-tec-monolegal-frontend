import { useState } from 'react';
import { SendOutlined, MailOutlined } from '@ant-design/icons';
import tableStyles from '../../components/iu/data-table/table/Table.module.css';
import styles from './Invoice.module.css';
import type { InvoiceSummary } from '../../../domain/entities/InvoiceSummary';
import { ModuleHeader } from '../../components/iu/module-header/ModuleHeader';
import { Table, type Column } from '../../components/iu/data-table/table/Table';
import { ReminderModal, type FacturaModalItem } from '../../components/iu/modal/ReminderModal';

interface FacturaView extends InvoiceSummary {
  fechaEmision: string;
  fechaVencimiento: string;
  estadoRecordatorio: 'ninguno' | 'primer' | 'segundo' | 'desactivado';
}

const mockFacturas: FacturaView[] = [
  { id: '1', codigoFactura: 'FAC-2024-001', nombreCliente: 'Distribuidora El Norte S.A.', emailContacto: 'contacto@elnorte.com', cantidadProductos: 5, totalCobro: 4850000, estadoActual: 'Pagada', fechaEmision: '12 jun 2024', fechaVencimiento: '12 jul 2024', estadoRecordatorio: 'desactivado' },
  { id: '2', codigoFactura: 'FAC-2024-002', nombreCliente: 'Comercial Andina Ltda.', emailContacto: 'ventas@andina.com', cantidadProductos: 2, totalCobro: 1230000, estadoActual: 'Pendiente', fechaEmision: '18 jun 2024', fechaVencimiento: '18 jul 2024', estadoRecordatorio: 'ninguno' },
  { id: '3', codigoFactura: 'FAC-2024-003', nombreCliente: 'Inversiones Patagonia', emailContacto: 'info@patagonia.com', cantidadProductos: 10, totalCobro: 7600000, estadoActual: 'Vencida', fechaEmision: '20 jun 2024', fechaVencimiento: '05 jul 2024', estadoRecordatorio: 'primer' },
  { id: '4', codigoFactura: 'FAC-2024-004', nombreCliente: 'Tech Solutions SpA', emailContacto: 'admin@tech.com', cantidadProductos: 1, totalCobro: 980000, estadoActual: 'Pendiente', fechaEmision: '22 jun 2024', fechaVencimiento: '22 jul 2024', estadoRecordatorio: 'segundo' },
  { id: '5', codigoFactura: 'FAC-2024-005', nombreCliente: 'Grupo Construye S.A.', emailContacto: 'pagos@construye.com', cantidadProductos: 4, totalCobro: 3400000, estadoActual: 'Pagada', fechaEmision: '23 jun 2024', fechaVencimiento: '23 jul 2024', estadoRecordatorio: 'desactivado' },
  { id: '6', codigoFactura: 'FAC-2024-006', nombreCliente: 'Alimentos del Sur Ltda.', emailContacto: 'gerencia@alsur.com', cantidadProductos: 3, totalCobro: 560000, estadoActual: 'Vencida', fechaEmision: '23 jun 2024', fechaVencimiento: '08 jul 2024', estadoRecordatorio: 'ninguno' }
];

export const Invoice = () => {
  const facturas = mockFacturas;
  const isLoading = false;
  
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const filtros = ['Todas', 'Pagada', 'Pendiente', 'Vencida'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [facturasParaModal, setFacturasParaModal] = useState<FacturaModalItem[]>([]);

  const facturasFiltradas = facturas.filter(fac => {
    if (filtroActivo === 'Todas') return true;
    return fac.estadoActual.toLowerCase() === filtroActivo.toLowerCase();
  });

  const facturasPendientesDeCobro = facturasFiltradas.filter(fac => fac.estadoActual !== 'Pagada');
  const cantidadRecordatorios = facturasPendientesDeCobro.length;

  const handleBulkClick = () => {
    setFacturasParaModal(facturasPendientesDeCobro);
    setIsModalOpen(true);
  };

  const handleIndividualClick = (factura: FacturaView) => {
    setFacturasParaModal([factura]);
    setIsModalOpen(true);
  };

  const handleConfirmSend = () => {
    console.log("Enviando correos a:", facturasParaModal.map(f => f.codigoFactura));
    setIsModalOpen(false);
    alert(`Se enviaron ${facturasParaModal.length} recordatorios con éxito.`);
  };

  const columns: Column<FacturaView>[] = [
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
      key: 'emision',
      title: 'Emisión',
      render: (fac) => <span className="text-gray-600">{fac.fechaEmision}</span> 
    },
    {
      key: 'vencimiento',
      title: 'Vencimiento',
      render: (fac) => <span className="text-gray-600">{fac.fechaVencimiento}</span> 
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
        const estadoCss = fac.estadoActual.toLowerCase();
        return (
          <span className={`${tableStyles.badge} ${tableStyles[`badge--${estadoCss}`]}`}>
            {fac.estadoActual}
          </span>
        );
      }
    },
    {
      key: 'recordatorio',
      title: 'Recordatorio',
      render: (fac) => {
        if (fac.estadoActual === 'Pagada' || fac.estadoRecordatorio === 'desactivado') {
          return <span className="text-gray-400 pl-6">—</span>;
        }
        return (
          <button 
            className={styles.invoice__btnRemember}
            onClick={() => handleIndividualClick(fac)}
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
        subtitle={`${facturasFiltradas.length} resultados`} 
      />

      <div className={styles.invoice__toolbar}>
        <div className={styles.invoice__filters}>
          {filtros.map(filtro => (
            <button
              key={filtro}
              onClick={() => setFiltroActivo(filtro)}
              className={`${styles.invoice__filterBtn} ${filtroActivo === filtro ? styles['invoice__filterBtn--active'] : ''}`}
            >
              {filtro}
            </button>
          ))}
        </div>

        <button 
          className={styles.invoice__btnMasive}
          onClick={handleBulkClick}
          disabled={cantidadRecordatorios === 0}
          style={{ opacity: cantidadRecordatorios === 0 ? 0.5 : 1, cursor: cantidadRecordatorios === 0 ? 'not-allowed' : 'pointer' }}
        >
          <SendOutlined /> Enviar recordatorios ({cantidadRecordatorios})
        </button>
      </div>

      <Table 
        columns={columns} 
        data={facturasFiltradas} 
        isLoading={isLoading} 
      />

      <ReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSend}
        facturas={facturasParaModal}
      />
    </div>
  );
};