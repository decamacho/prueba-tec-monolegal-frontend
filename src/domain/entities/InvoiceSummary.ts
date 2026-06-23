export interface InvoiceSummary {
  id: string;
  codigoFactura: string;
  nombreCliente: string;
  emailContacto: string;
  cantidadProductos: number;
  totalCobro: number;
  estadoActual: string;
}