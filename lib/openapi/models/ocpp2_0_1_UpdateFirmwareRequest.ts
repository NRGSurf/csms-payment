/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { FirmwareType } from './FirmwareType';
export type ocpp2_0_1_UpdateFirmwareRequest = {
    customData?: CustomDataType;
    /**
     * This specifies how many times Charging Station must try to download the firmware before giving up. If this field is not present, it is left to Charging Station to decide how many times it wants to retry.
     *
     */
    retries?: number;
    /**
     * The interval in seconds after which a retry may be attempted. If this field is not present, it is left to Charging Station to decide how long to wait between attempts.
     *
     */
    retryInterval?: number;
    /**
     * The Id of this request
     *
     */
    requestId: number;
    firmware: FirmwareType;
};

