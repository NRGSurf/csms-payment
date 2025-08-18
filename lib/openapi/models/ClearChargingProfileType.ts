/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChargingProfilePurposeEnumType } from './ChargingProfilePurposeEnumType';
import type { CustomDataType } from './CustomDataType';
/**
 * Charging_ Profile
 * urn:x-oca:ocpp:uid:2:233255
 * A ChargingProfile consists of a ChargingSchedule, describing the amount of power or current that can be delivered per time interval.
 *
 */
export type ClearChargingProfileType = {
    customData?: CustomDataType;
    /**
     * Identified_ Object. MRID. Numeric_ Identifier
     * urn:x-enexis:ecdm:uid:1:569198
     * Specifies the id of the EVSE for which to clear charging profiles. An evseId of zero (0) specifies the charging profile for the overall Charging Station. Absence of this parameter means the clearing applies to all charging profiles that match the other criteria in the request.
     *
     *
     */
    evseId?: number;
    chargingProfilePurpose?: ChargingProfilePurposeEnumType;
    /**
     * Charging_ Profile. Stack_ Level. Counter
     * urn:x-oca:ocpp:uid:1:569230
     * Specifies the stackLevel for which charging profiles will be cleared, if they meet the other criteria in the request.
     *
     */
    stackLevel?: number;
};

