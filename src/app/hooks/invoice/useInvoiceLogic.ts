// src/app/pages/hooks/useInvoiceLogic.ts
import { useState, useMemo } from 'react';
import type { InvoiceSummary } from '../../../domain/entities/InvoiceSummary';
import type { FacturaModalItem } from '../../components/iu/modal/ReminderModal';
import { useInvoiceSummary } from './useInvoices';

export interface InvoiceView extends InvoiceSummary {
  stateRemember: 'ninguno' | 'primer' | 'segundo' | 'desactivado';
  visualState: string;
}

export const useInvoiceLogic = () => {

    const { data: dataInvoice = [], isLoading, isError } = useInvoiceSummary();

  const [stateFilter, setStateFilter] = useState('Todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceForModal, setInvoiceForModal] = useState<FacturaModalItem[]>([]);

  const filters = ['Todas', '1er Recordatorio', '2do Recordatorio', 'Desactivada'];

  const transformInvoice: InvoiceView[] = useMemo(() => {
    return dataInvoice.map((invoice: InvoiceSummary) => {
      let visualState = 'Pendiente';
      let stateRemember: InvoiceView['stateRemember'] = 'ninguno';

      const stateReal = invoice.estadoActual?.toLowerCase() || '';

    if (stateReal.includes('primerrecordatorio')) {
        visualState = '1er Recordatorio';
        stateRemember = 'primer';
      } else if (stateReal.includes('segundorecordatorio')) {
        visualState = '2do Recordatorio';
        stateRemember = 'segundo';
      } else if (stateReal.includes('desactivado')) {
        visualState = 'Desactivada';
        stateRemember = 'desactivado';
      }

      return {
        ...invoice,
        visualState,
        stateRemember
      };
    });
  }, [dataInvoice]);

  const filterInvoices = useMemo(() => {
    return transformInvoice.filter(invoice => {
      if (stateFilter === 'Todas') return true;
      return invoice.visualState.toLowerCase() === stateFilter.toLowerCase();
    });
  }, [transformInvoice, stateFilter]);

  const pendingInvoiceState = useMemo(() => {
    return filterInvoices.filter(invoice => invoice.visualState !== 'desactivado');
  }, [filterInvoices]);

  const cantidadRecordatorios = pendingInvoiceState.length;

  const handleMasiveEmail = () => {
    setInvoiceForModal(pendingInvoiceState);
    setIsModalOpen(true);
  };

  const handleIndividualClick = (factura: InvoiceView) => {
    setInvoiceForModal([factura]);
    setIsModalOpen(true);
  };

  const handleConfirmSend = () => {
    console.log("Enviando correos a:", invoiceForModal.map(f => f.codigoFactura));
    setIsModalOpen(false);
    alert(`Se enviaron ${invoiceForModal.length} recordatorios con éxito.`);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return {
    filterInvoices,
    isLoading,
    isError,
    filters,
    stateFilter,
    setStateFilter,
    isModalOpen,
    invoiceForModal,
    cantidadRecordatorios,
    handlers: {
      onMasiveClick: handleMasiveEmail,
      onIndividualClick: handleIndividualClick,
      onConfirmSend: handleConfirmSend,
      onCloseModal: handleCloseModal
    }
  };
};