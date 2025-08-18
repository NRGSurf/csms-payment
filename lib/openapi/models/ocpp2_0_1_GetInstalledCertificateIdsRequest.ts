/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { GetCertificateIdUseEnumType } from './GetCertificateIdUseEnumType';
export type ocpp2_0_1_GetInstalledCertificateIdsRequest = {
    customData?: CustomDataType;
    /**
     * Indicates the type of certificates requested. When omitted, all certificate types are requested.
     *
     */
    certificateType?: Array<GetCertificateIdUseEnumType>;
};

