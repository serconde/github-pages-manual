export enum OrderLineStatus {
  Validated = "Validado",
  Pending = "Pendiente",
}

export interface OrderLine {
  selected: boolean;
  status: OrderLineStatus;
  description: string;
  amount: number;
}

export interface OrderHeader {
  reference: string;
  provider: string;
  date: string; 
  total: string;
  status: string;
  valid: boolean;
}