// export type PriceType = {
//   dayOffset: number;
//   pricePerKwh: number;
//   validFrom: string; // "HH:MM"
//   validTo: string; // "HH:MM"
//   chargingTiming?: string | null;
// };

// export type TariffDTO = {
//   id: number;
//   stationId: string;
//   currency: string;
//   pricePerKwh: number | string;
//   pricePerKwhDaytime?: PriceType[] | null;
//   pricePerMin?: number | string | null;
//   pricePerSession?: number | string | null;
//   authorizationAmount?: number | string | null;
//   paymentFee?: number | string | null;
//   taxRate?: number | string | null;
//   createdAt: string;
//   updatedAt: string;
// };

// export type LocationDTO = {
//   id: number;
//   tenantId: number;
//   name: string;
//   address: string;
//   city: string;
//   postalCode: string;
//   state: string;
//   country: string;
//   coordinates?: any;
//   createdAt: string;
//   updatedAt: string;
// };

// export type ChargingStationDTO = {
//   id: string;
//   locationId: number | null;
//   isOnline: boolean;
//   protocol: string | null;
//   chargePointVendor?: string | null;
//   chargePointModel?: string | null;
//   // ...
//   location?: LocationDTO | null;
//   tariff?: TariffDTO | null;
//   currentPriceType?: PriceType | null;
//   currentPricePerKwh?: string | number | null;
//   createdAt: string;
//   updatedAt: string;
// };

export type TransactionDTO = {
  id: number;
  stationId: string;
  transactionId: string;
  isActive: boolean;
  chargingState: string;
  stoppedReason?: string | null;
  createdAt: string;
  updatedAt: string;
  evseDatabaseId?: number | null;
  timeSpentCharging?: number | null;
  totalKwh?: string | number | null;
  totalCost?: string | number | null;
  // ... other fields as needed
};
