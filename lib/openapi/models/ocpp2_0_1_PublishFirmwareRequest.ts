/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_PublishFirmwareRequest = {
    customData?: CustomDataType;
    /**
     * This contains a string containing a URI pointing to a
     * location from which to retrieve the firmware.
     *
     */
    location: string;
    /**
     * This specifies how many times Charging Station must try
     * to download the firmware before giving up. If this field is not
     * present, it is left to Charging Station to decide how many times it wants to retry.
     *
     */
    retries?: number;
    /**
     * The MD5 checksum over the entire firmware file as a hexadecimal string of length 32.
     *
     */
    checksum: string;
    /**
     * The Id of the request.
     *
     */
    requestId: number;
    /**
     * The interval in seconds
     * after which a retry may be
     * attempted. If this field is not
     * present, it is left to Charging
     * Station to decide how long to wait
     * between attempts.
     *
     */
    retryInterval?: number;
};

