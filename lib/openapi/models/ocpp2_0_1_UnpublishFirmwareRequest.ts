/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_UnpublishFirmwareRequest = {
    customData?: CustomDataType;
    /**
     * The MD5 checksum over the entire firmware file as a hexadecimal string of length 32.
     *
     */
    checksum: string;
};

