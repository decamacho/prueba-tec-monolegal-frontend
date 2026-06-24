import { useQuery } from "@tanstack/react-query";
import { invoiceRepository } from "../../../infrastructure/repositories/InvoiceRepository";
import { ClientUseCases } from "../../../application/usecases/ClientUseCases";

const clientUseCases = new ClientUseCases(invoiceRepository);

export const useClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => clientUseCases.getClients(),
  });
};

export const useInvoicesByClient = (documento: string) => {
  return useQuery({
    queryKey: ["invoiceSummary", documento],
    queryFn: () => clientUseCases.getByClient(documento),
    enabled: !!documento,
  });
};