/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TariffResponseSchema = Array<{
    id: number;
    stationId: string;
    currency: string;
    pricePerKwh?: number;
    pricePerSession?: string | null;
    authorizationAmount?: string | null;
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
