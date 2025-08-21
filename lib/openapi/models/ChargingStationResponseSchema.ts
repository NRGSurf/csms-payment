/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChargingStationResponseSchema = {
    id: string;
    isOnline?: boolean | null;
    protocol?: string | null;
    chargePointVendor?: string | null;
    chargePointModel?: string | null;
    chargePointSerialNumber?: string | null;
    chargeBoxSerialNumber?: string | null;
    firmwareVersion?: string | null;
    iccid?: string | null;
    imsi?: string | null;
    meterType?: string | null;
    meterSerialNumber?: string | null;
    locationId: number;
    createdAt: string;
    updatedAt: string;
    location?: Record<string, any> | null;
    tariff?: Record<string, any> | null;
    currentPriceType?: Record<string, any> | null;
};

