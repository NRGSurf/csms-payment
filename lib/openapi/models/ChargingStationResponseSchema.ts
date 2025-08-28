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
    location?: {
        id: number;
        name: string;
        address?: string | null;
        city?: string | null;
        postalCode?: string | null;
        state?: string | null;
        country?: string | null;
        coordinates?: {
            crs?: {
                type?: string;
                properties?: {
                    name: string;
                } | null;
            } | null;
            type: string;
            coordinates: Array<number>;
        } | null;
        createdAt: string;
        updatedAt: string;
        chargingPool?: Array<{
            id: string;
            isOnline: boolean;
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
        }> | null;
    };
    tariff?: {
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
    };
    currentPriceType?: {
        dayOffset: number;
        pricePerKwh: number | string;
        validFrom: string;
        validTo: string;
        chargingTiming?: 'GOOD' | 'BAD' | null;
    };
};

