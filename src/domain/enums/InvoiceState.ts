export const INVOICE_STATES = {
  FIRST_REMINDER: "primerrecordatorio",
  SECOND_REMINDER: "segundorecordatorio",
  INACTIVE: "desactivado",
} as const;

export type InvoiceStateKey = typeof INVOICE_STATES[keyof typeof INVOICE_STATES];

export const STATUS_MAP = {
  [INVOICE_STATES.FIRST_REMINDER]: { visual: "1er Recordatorio", remember: "primer" },
  [INVOICE_STATES.SECOND_REMINDER]: { visual: "2do Recordatorio", remember: "segundo" },
  [INVOICE_STATES.INACTIVE]: { visual: "Desactivada", remember: "desactivado" },
} as const;

export type InvoiceStateMap = typeof STATUS_MAP[keyof typeof STATUS_MAP];
