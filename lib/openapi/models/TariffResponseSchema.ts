/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TariffResponseSchema = Array<{
    pricePerKwh?: string;
    pricePerMin?: string | null;
    pricePerSession?: string | null;
    authorizationAmount?: string | null;
    paymentFee?: string | null;
    taxRate?: string | null;
    id: number;
    stationId: string;
    currency: string;
    pricePerKwhDaytime?: Array<{
        dayOffset: number;
        pricePerKwh: number;
        validFrom: string;
        validTo: string;
        chargingTiming?: 'GOOD' | 'BAD' | null;
    }> | null;
    createdAt: string;
    updatedAt: string;
}>;
