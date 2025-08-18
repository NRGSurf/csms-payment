/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { VPNEnumType } from './VPNEnumType';
/**
 * VPN
 * urn:x-oca:ocpp:uid:2:233268
 * VPN Configuration settings
 *
 */
export type VPNType = {
    customData?: CustomDataType;
    /**
     * VPN. Server. URI
     * urn:x-oca:ocpp:uid:1:569272
     * VPN Server Address
     *
     */
    server: string;
    /**
     * VPN. User. User_ Name
     * urn:x-oca:ocpp:uid:1:569273
     * VPN User
     *
     */
    user: string;
    /**
     * VPN. Group. Group_ Name
     * urn:x-oca:ocpp:uid:1:569274
     * VPN group.
     *
     */
    group?: string;
    /**
     * VPN. Password. Password
     * urn:x-oca:ocpp:uid:1:569275
     * VPN Password.
     *
     */
    password: string;
    /**
     * VPN. Key. VPN_ Key
     * urn:x-oca:ocpp:uid:1:569276
     * VPN shared secret.
     *
     */
    key: string;
    type: VPNEnumType;
};

