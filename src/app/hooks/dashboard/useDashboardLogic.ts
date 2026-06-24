import { useMemo } from "react";
import type { InvoiceSummary } from "../../../domain/entities/InvoiceSummary";
import { useInvoiceSummary } from "../invoice/useInvoices";
import { useClients } from "../client/useClients";
import { INVOICE_STATES, STATUS_MAP } from "../../../domain/enums/InvoiceState";

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

      if (status.includes(INVOICE_STATES.SECOND_REMINDER)) {
        secondReminderInvoices += 1;
      } else if (status.includes(INVOICE_STATES.FIRST_REMINDER)) {
        firstReminderInvoices += 1;
      } else if (status.includes(INVOICE_STATES.INACTIVE)) {
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
    return invoices.slice(0, 4).map((invoice: InvoiceSummary) => {
      const backendStatus = invoice.estadoActual?.toLowerCase() || "";

      const stateKey = Object.values(INVOICE_STATES).find((state) =>
        backendStatus.includes(state),
      );

      const config = stateKey
        ? STATUS_MAP[stateKey]
        : { visual: "Desconocido", remember: "default" };

      const amountFormatted = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(invoice.totalCobro);

      return {
        id: invoice.codigoFactura,
        clientName: invoice.nombreCliente,
        amountFormatted,
        visualStatus: config.visual,
        cssClass: config.remember,
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
