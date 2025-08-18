/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CertificateHashDataType } from './CertificateHashDataType';
import type { CustomDataType } from './CustomDataType';
import type { IdTokenType } from './IdTokenType';
export type ocpp2_0_1_CustomerInformationRequest = {
    customData?: CustomDataType;
    customerCertificate?: CertificateHashDataType;
    idToken?: IdTokenType;
    /**
     * The Id of the request.
     *
     *
     */
    requestId: number;
    /**
     * Flag indicating whether the Charging Station should return NotifyCustomerInformationRequest messages containing information about the customer referred to.
     *
     */
    report: boolean;
    /**
     * Flag indicating whether the Charging Station should clear all information about the customer referred to.
     *
     */
    clear: boolean;
    /**
     * A (e.g. vendor specific) identifier of the customer this request refers to. This field contains a custom identifier other than IdToken and Certificate.
     * One of the possible identifiers (customerIdentifier, customerIdToken or customerCertificate) should be in the request message.
     *
     */
    customerIdentifier?: string;
};

