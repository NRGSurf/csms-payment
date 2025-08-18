/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APNType } from './APNType';
import type { CustomDataType } from './CustomDataType';
import type { OCPPInterfaceEnumType } from './OCPPInterfaceEnumType';
import type { OCPPTransportEnumType } from './OCPPTransportEnumType';
import type { OCPPVersionEnumType } from './OCPPVersionEnumType';
import type { VPNType } from './VPNType';
/**
 * Communication_ Function
 * urn:x-oca:ocpp:uid:2:233304
 * The NetworkConnectionProfile defines the functional and technical parameters of a communication link.
 *
 */
export type NetworkConnectionProfileType = {
    customData?: CustomDataType;
    apn?: APNType;
    ocppVersion: OCPPVersionEnumType;
    ocppTransport: OCPPTransportEnumType;
    /**
     * Communication_ Function. OCPP_ Central_ System_ URL. URI
     * urn:x-oca:ocpp:uid:1:569357
     * URL of the CSMS(s) that this Charging Station  communicates with.
     *
     */
    ocppCsmsUrl: string;
    /**
     * Duration in seconds before a message send by the Charging Station via this network connection times-out.
     * The best setting depends on the underlying network and response times of the CSMS.
     * If you are looking for a some guideline: use 30 seconds as a starting point.
     *
     */
    messageTimeout: number;
    /**
     * This field specifies the security profile used when connecting to the CSMS with this NetworkConnectionProfile.
     *
     */
    securityProfile: number;
    ocppInterface: OCPPInterfaceEnumType;
    vpn?: VPNType;
};

