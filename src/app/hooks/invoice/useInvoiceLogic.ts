import { useState, useMemo } from "react";
import type { InvoiceSummary } from "../../../domain/entities/InvoiceSummary";
import type { FacturaModalItem } from "../../components/iu/modal/ReminderModal";
import { useInvoiceSummary, useProcessMasiveReminders, useProcessSingleReminder } from "./useInvoices";
export interface InvoiceView extends InvoiceSummary {
  stateRemember: "ninguno" | "primer" | "segundo" | "desactivado";
  visualState: string;
}

export const useInvoiceLogic = () => {
  const { data: dataInvoice = [], isLoading, isError } = useInvoiceSummary();
  const { mutate: sendMasiveReminders, isPending: isSendingMasive } = useProcessMasiveReminders();
  const { mutate: sendSingleReminder, isPending: isSendingSingle } = useProcessSingleReminder();

  const [stateFilter, setStateFilter] = useState("Todas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceForModal, setInvoiceForModal] = useState<FacturaModalItem[]>(
    [],
  );

  const isSending = isSendingMasive || isSendingSingle;

  const filters = [
    "Todas",
    "1er Recordatorio",
    "2do Recordatorio",
    "Desactivada",
  ];

  const transformInvoice: InvoiceView[] = useMemo(() => {
    return dataInvoice.map((invoice: InvoiceSummary) => {
      let visualState = "Pendiente";
      let stateRemember: InvoiceView["stateRemember"] = "ninguno";

      const stateReal = invoice.estadoActual?.toLowerCase() || "";

      if (stateReal.includes("primerrecordatorio")) {
        visualState = "1er Recordatorio";
        stateRemember = "primer";
      } else if (stateReal.includes("segundorecordatorio")) {
        visualState = "2do Recordatorio";
        stateRemember = "segundo";
      } else if (stateReal.includes("desactivado")) {
        visualState = "Desactivada";
        stateRemember = "desactivado";
      }

      return {
        ...invoice,
        visualState,
        stateRemember,
      };
    });
  }, [dataInvoice]);

  const filterInvoices = useMemo(() => {
    return transformInvoice.filter((invoice) => {
      if (stateFilter === "Todas") return true;
      return invoice.visualState.toLowerCase() === stateFilter.toLowerCase();
    });
  }, [transformInvoice, stateFilter]);

  const pendingInvoiceState = useMemo(() => {
    return filterInvoices.filter(
      (invoice) => invoice.estadoActual !== "desactivado",
    );
  }, [filterInvoices]);

  const reminderCount = pendingInvoiceState.length;

  const handleMasiveEmail = () => {
    setInvoiceForModal(pendingInvoiceState);
    setIsModalOpen(true);
  };

  const handleIndividualClick = (factura: InvoiceView) => {
    setInvoiceForModal([factura]);
    setIsModalOpen(true);
  };

  const handleConfirmSend = () => {
    if (invoiceForModal.length === 0) return;

    if (invoiceForModal.length === 1) {
      const invoiceId = invoiceForModal[0].id || '';

      sendSingleReminder(invoiceId, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    } else {
      sendMasiveReminders(undefined, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
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
    reminderCount,
    isSending,
    handlers: {
      onMasiveClick: handleMasiveEmail,
      onIndividualClick: handleIndividualClick,
      onConfirmSend: handleConfirmSend,
      onCloseModal: handleCloseModal,
    },
  };
};
