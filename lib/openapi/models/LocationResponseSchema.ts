/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LocationResponseSchema = Array<{
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
}>;
