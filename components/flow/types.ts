import { boolean } from "zod";

export type AppStep = "pricing" | "payment" | "charging" | "receipt";

export type SessionStatus = "available" | "busy" | "maintenance";

export interface SessionData {
  stationId: string;
  stationName: string;
  stationStatus: SessionStatus;
  location: string;
  connector: string;

  sessionId: string;
  startTime: string | Date;
  endTime?: string | Date;

  totalEnergy: number; // kWh
  totalDuration: number; // seconds
  totalCost: number; // € (or your currency)
  pricePerKwh: number; // €/kWh
  pricePerSession: number; // €
  authorizationAmount: number; // €
}

export interface ChargingData {
  timeElapsed: number; // seconds
  energyDelivered: number; // kWh (so far)
  chargingSpeed: number; // kW (instantaneous or smoothed)
  runningCost: number; // € (so far)
}

export type StationInfo = {
  id?: string;
  name?: string;
  address?: string;
  location?: string;
  connectorId?: string | number;
  pricePerKwh?: number;
  pricePerSession?: number;
  protocol?: string;
  authorizationAmount?: number;
};

export type InvoiceForm = {
  fullName?: string;
  email: string;
  phone?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  vatId?: string;
  acceptTerms: boolean;
  waiveWithdrawal: boolean;
  emailConsent: boolean;
};

export enum FlowStep {
  Overview = 0,
  Billing = 1,
  Payment = 2,
  Done = 3,
}
