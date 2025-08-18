/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WebsocketRequestSchema = {
    id: string;
    host: string;
    port: number;
    pingInterval: number;
    protocol: string;
    securityProfile: number;
    allowUnknownChargingStations: boolean;
    tlsKeyFilePath?: string;
    tlsCertificateChainFilePath?: string;
    mtlsCertificateAuthorityKeyFilePath?: string;
    rootCACertificateFilePath?: string;
};

