/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type processPaymentSchema = {
    slug: string;
    paymentMethodNonce: string;
    currency?: string;
    amount?: number;
    invoice?: ({
        email?: string | null;
        fullName?: string | null;
        phone?: string | null;
        street?: string | null;
        postalCode?: string | null;
        city?: string | null;
        country?: string | null;
        vatId?: string | null;
        emailConsent?: boolean;
        emailConsentVersion?: number | null;
    } | null);
};

