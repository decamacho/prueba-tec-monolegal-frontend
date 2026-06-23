import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InvoiceUseCases } from "../../../application/usecases/InvoiceUseCases";
import { invoiceRepository } from "../../../infrastructure/repositories/InvoiceRepository";

const invoiceUseCases = new InvoiceUseCases(invoiceRepository);

export const useInvoiceSummary = () => {
  return useQuery({
    queryKey: ["invoiceSummary"],
    queryFn: () => invoiceUseCases.getSummary(),
  });
};

export const useClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => invoiceUseCases.getClients(),
  });
};

export const useInvoicesByClient = (documento: string) => {
  return useQuery({
    queryKey: ["invoiceSummary", documento],
    queryFn: () => invoiceUseCases.getByClient(documento),
    enabled: !!documento,
  });
};

export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: () => invoiceUseCases.getItems(),
  });
};

export const useProcessBatchReminders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => invoiceUseCases.processBatchReminders(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoiceSummary"] });
    },
  });
};

export const useProcessSingleReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoiceId: string) =>
      invoiceUseCases.processSingleReminder(invoiceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoiceSummary"] });
    },
  });
};
