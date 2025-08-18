/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
/**
 * Firmware
 * urn:x-enexis:ecdm:uid:2:233291
 * Represents a copy of the firmware that can be loaded/updated on the Charging Station.
 *
 */
export type FirmwareType = {
    customData?: CustomDataType;
    /**
     * Firmware. Location. URI
     * urn:x-enexis:ecdm:uid:1:569460
     * URI defining the origin of the firmware.
     *
     */
    location: string;
    /**
     * Firmware. Retrieve. Date_ Time
     * urn:x-enexis:ecdm:uid:1:569461
     * Date and time at which the firmware shall be retrieved.
     *
     */
    retrieveDateTime: string;
    /**
     * Firmware. Install. Date_ Time
     * urn:x-enexis:ecdm:uid:1:569462
     * Date and time at which the firmware shall be installed.
     *
     */
    installDateTime?: string;
    /**
     * Certificate with which the firmware was signed.
     * PEM encoded X.509 certificate.
     *
     */
    signingCertificate?: string;
    /**
     * Firmware. Signature. Signature
     * urn:x-enexis:ecdm:uid:1:569464
     * Base64 encoded firmware signature.
     *
     */
    signature?: string;
};

