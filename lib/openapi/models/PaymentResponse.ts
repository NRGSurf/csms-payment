/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentResponse = Array<{
    id: number;
    qrEndpointId?: number | null;
    braintreeTransactionId?: string | null;
    status: string;
    amount: number;
    currency: string;
    paymentMethod?: string | null;
    paymentMethodToken?: string | null;
    cardBrand?: string | null;
    cardLast4?: string | null;
    paypalEmail?: string | null;
    customerFirstName?: string | null;
    customerLastName?: string | null;
    customerEmail?: string | null;
    customerPhone?: string | null;
    addressStreet?: string | null;
    addressPostalCode?: string | null;
    addressCity?: string | null;
    addressCountry?: string | null;
    rawGatewayResponse?: any | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}>;
