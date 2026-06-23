import type { InvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";
import type { InvoiceSummary } from "../../domain/entities/InvoiceSummary";
import type { Client } from "../../domain/entities/Client";
import type { Item } from "../../domain/entities/Item";
import { httpClient } from "../http/apiInvoice";

export const invoiceRepository: InvoiceRepository = {
  getSummary: async (): Promise<InvoiceSummary[]> => {
    return await httpClient<InvoiceSummary[]>("/Invoice/summary");
  },

  getClients: async (): Promise<Client[]> => {
    return await httpClient<Client[]>("/Invoice/clients");
  },

  getByClient: async (documento: string): Promise<InvoiceSummary[]> => {
    return await httpClient<InvoiceSummary[]>(`/Invoice/client/${documento}`);
  },

  getItems: async (): Promise<Item[]> => {
    return await httpClient<Item[]>("/Invoice/items");
  },

  processBatchReminders: async (): Promise<void> => {
    await httpClient<void>("/Invoice/process-send-reminders/masive", {
      method: "POST",
    });
  },

  processSingleReminder: async (invoiceId: string): Promise<void> => {
    await httpClient<void>(`/Invoice/${invoiceId}/process-send-reminders`, {
      method: "POST",
    });
  },
};
