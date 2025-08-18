/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { HashAlgorithmEnumType } from './HashAlgorithmEnumType';
export type CertificateHashDataType = {
    customData?: CustomDataType;
    hashAlgorithm: HashAlgorithmEnumType;
    /**
     * Hashed value of the Issuer DN (Distinguished Name).
     *
     *
     */
    issuerNameHash: string;
    /**
     * Hashed value of the issuers public key
     *
     */
    issuerKeyHash: string;
    /**
     * The serial number of the certificate.
     *
     */
    serialNumber: string;
};

