export type StationInfo = {
  id?: string;
  name?: string;
  address?: string;
  location?: string;
  connectorId?: string | number;
  pricePerKwh?: number;
  protocol?: string;
};

export type InvoiceForm = {
  fullName: string;
  email: string;
  phone?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  country?: string;
};

export enum FlowStep {
  Overview = 0,
  Billing = 1,
  Payment = 2,
  Done = 3,
}
