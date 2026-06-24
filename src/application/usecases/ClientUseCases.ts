import type { InvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";

export class ClientUseCases {
  private readonly repository: InvoiceRepository;

  constructor(repository: InvoiceRepository) {
    this.repository = repository;
  }

  async getClients() {
    return await this.repository.getClients();
  }

  async getByClient(documento: string) {
    return await this.repository.getByClient(documento);
  }
}
