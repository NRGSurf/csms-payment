/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type processPaymentSchema = {
    stationId: string;
    paymentMethodNonce: string;
    currency?: string;
    amount?: number;
    slug?: string;
    invoice?: ({
        email?: string | null;
        fullName?: string | null;
        phone?: string | null;
        street?: string | null;
        postalCode?: string | null;
        city?: string | null;
        country?: string | null;
    } | null);
};

