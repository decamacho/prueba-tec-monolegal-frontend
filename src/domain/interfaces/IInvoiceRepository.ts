import type { InvoiceSummary } from "../entities/InvoiceSummary";
import type { Client } from "../entities/Client";
import type { Item } from "../entities/Item";

export interface InvoiceRepository {
  // Consultas GET
  getSummary(): Promise<InvoiceSummary[]>;
  getClients(): Promise<Client[]>;
  getItems(): Promise<Item[]>;
  getByClient(documento: string): Promise<InvoiceSummary[]>;

  // Acciones POST
  processBatchReminders(): Promise<void>;
  processSingleReminder(invoiceId: string): Promise<void>;
}
