import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InvoiceUseCases } from "../../../application/usecases/InvoiceUseCases";
import { invoiceRepository } from "../../../infrastructure/repositories/InvoiceRepository";
import { message } from "antd";

const invoiceUseCases = new InvoiceUseCases(invoiceRepository);

export const useInvoiceSummary = () => {
  return useQuery({
    queryKey: ["invoiceSummary"],
    queryFn: () => invoiceUseCases.getSummary(),
  });
};

export const useProcessMasiveReminders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => invoiceUseCases.processBatchReminders(),
    onSuccess: () => {
      message.success("Recordatorio enviado con éxito.");
      queryClient.invalidateQueries({ queryKey: ["invoiceSummary"] });
    },
    onError: (error) => {
      console.error("Error sending masive reminders:", error);
      message.error("Hubo un error al procesar el envio masivo recordatorios.");
    },
  });
};

export const useProcessSingleReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoiceId: string) =>
      invoiceUseCases.processSingleReminder(invoiceId),
    onSuccess: () => {
      message.success("Recordatorio enviado con éxito.");
      queryClient.invalidateQueries({ queryKey: ["invoiceSummary"] });
    },
    onError: (error) => {
      console.error("Error sending single reminder:", error);
      message.error("Hubo un error al enviar el recordatorio.");
    },
  });
};
