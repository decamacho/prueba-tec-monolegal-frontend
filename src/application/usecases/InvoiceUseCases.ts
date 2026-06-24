import type { InvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";

export class InvoiceUseCases {
  private readonly repository: InvoiceRepository;

  constructor(repository: InvoiceRepository) {
    this.repository = repository;
  }

  async getSummary() {
    return await this.repository.getSummary();
  }

  async processBatchReminders() {
    return await this.repository.processBatchReminders();
  }

  async processSingleReminder(invoiceId: string) {
    return await this.repository.processSingleReminder(invoiceId);
  }
}
