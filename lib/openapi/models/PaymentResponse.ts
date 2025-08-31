/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentResponse = Array<{
    id: number;
    qrEndpointId?: number | null;
    status: string;
    amount: number;
    currency: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    transaction?: ({
        id: number;
        paymentId: number;
        provider: string;
        providerTransactionId?: string | null;
        methodType?: string | null;
        cardBrand?: string | null;
        cardLast4?: string | null;
        walletEmail?: string | null;
        rawProviderResponse?: any | null;
        createdAt: string;
        updatedAt: string;
    } | null);
    invoice?: ({
        id: number;
        paymentId: number;
        invoiceNumber?: string | null;
        customerFirstName?: string | null;
        customerLastName?: string | null;
        customerEmail?: string | null;
        customerPhone?: string | null;
        addressStreet?: string | null;
        addressPostalCode?: string | null;
        addressCity?: string | null;
        addressCountry?: string | null;
        vatId?: string | null;
        issuedAt?: string | null;
        sentAt?: string | null;
        pdfUrl?: string | null;
        createdAt: string;
        updatedAt: string;
    } | null);
}>;
