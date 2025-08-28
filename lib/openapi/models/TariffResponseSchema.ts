/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TariffResponseSchema = Array<{
    id: number;
    stationId: string;
    currency: string;
    pricePerKwh?: number | string;
    pricePerMin?: number | string | null;
    pricePerSession?: number | string | null;
    authorizationAmount?: number | string | null;
    paymentFee?: number | string | null;
    taxRate?: number | string | null;
    pricePerKwhDaytime?: Array<{
        dayOffset: number;
        pricePerKwh: number | string;
        validFrom: string;
        validTo: string;
        chargingTiming?: 'GOOD' | 'BAD' | null;
    }> | null;
    createdAt: string;
    updatedAt: string;
}>;
