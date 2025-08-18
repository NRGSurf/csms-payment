/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { InstallCertificateUseEnumType } from './InstallCertificateUseEnumType';
export type ocpp2_0_1_InstallCertificateRequest = {
    customData?: CustomDataType;
    certificateType: InstallCertificateUseEnumType;
    /**
     * A PEM encoded X.509 certificate.
     *
     */
    certificate: string;
};

