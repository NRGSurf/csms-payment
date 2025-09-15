// types/api.ts
import type {
  ChargingStationResponseSchema,
  TariffResponseSchema,
} from "@/lib/openapi";

// Single object:
export type ChargingStationDTO = ChargingStationResponseSchema;

// Arrays → element type:
export type TariffDTO = TariffResponseSchema[number];

// Nested array element:
export type PriceType = NonNullable<TariffDTO["pricePerKwhDaytime"]>[number];
