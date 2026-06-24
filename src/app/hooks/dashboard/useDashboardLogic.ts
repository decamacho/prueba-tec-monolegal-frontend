import { useMemo } from "react";
import type { InvoiceSummary } from "../../../domain/entities/InvoiceSummary";
import { useInvoiceSummary } from "../invoice/useInvoices";
import { useClients } from "../client/useClients";

export interface ResumeInvoice {
  id: string;
  clientName: string;
  amountFormatted: string;
  visualStatus: string;
  cssClass: string;
}

export const useDashboardLogic = () => {
  const { data: invoices = [], isLoading: isLoadingInvoices } =
    useInvoiceSummary();
  const { data: clients = [], isLoading: isLoadingClients } = useClients();

  const metrics = useMemo(() => {
    let firstReminderInvoices = 0;
    let secondReminderInvoices = 0;
    let inactiveInvoices = 0;

    invoices.forEach((fac: InvoiceSummary) => {
      const status = fac.estadoActual?.toLowerCase() || "";

      if (status.includes("segundorecordatorio")) {
        secondReminderInvoices += 1;
      } else if (status.includes("primerrecordatorio")) {
        firstReminderInvoices += 1;
      } else if (status.includes("desactivado")) {
        inactiveInvoices += 1;
      }
    });

    return {
      firstReminderInvoices,
      secondReminderInvoices,
      inactiveInvoices,
      activeClients: clients.length,
    };
  }, [invoices, clients]);

  const today = new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const latestInvoices: ResumeInvoice[] = useMemo(() => {
    const recentInvoices = invoices.slice(0, 4);

    return recentInvoices.map((invoice: InvoiceSummary) => {
      let visualStatus = "1er Recordatorio";
      let cssClass = "primer";
      const backendStatus = invoice.estadoActual?.toLowerCase() || "";

      if (backendStatus.includes("primerrecordatorio")) {
        visualStatus = "1er Recordatorio";
        cssClass = "primer";
      } else if (backendStatus.includes("segundorecordatorio")) {
        visualStatus = "2do Recordatorio";
        cssClass = "segundo";
      } else if (backendStatus.includes("desactivado")) {
        visualStatus = "Desactivado";
        cssClass = "desactivado";
      }

      const amountFormatted = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(invoice.totalCobro);

      return {
        id: invoice.codigoFactura,
        clientName: invoice.nombreCliente,
        amountFormatted,
        visualStatus,
        cssClass,
      };
    });
  }, [invoices]);

  return {
    metrics: {
      ...metrics,
    },
    today,
    latestInvoices,
    isLoading: isLoadingInvoices || isLoadingClients,
  };
};
