/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChargingProfileKindEnumType } from './ChargingProfileKindEnumType';
import type { ChargingProfilePurposeEnumType } from './ChargingProfilePurposeEnumType';
import type { ChargingScheduleType } from './ChargingScheduleType';
import type { CustomDataType } from './CustomDataType';
import type { RecurrencyKindEnumType } from './RecurrencyKindEnumType';
/**
 * Charging_ Profile
 * urn:x-oca:ocpp:uid:2:233255
 * A ChargingProfile consists of ChargingSchedule, describing the amount of power or current that can be delivered per time interval.
 *
 */
export type ChargingProfileType = {
    customData?: CustomDataType;
    /**
     * Identified_ Object. MRID. Numeric_ Identifier
     * urn:x-enexis:ecdm:uid:1:569198
     * Id of ChargingProfile.
     *
     */
    id: number;
    /**
     * Charging_ Profile. Stack_ Level. Counter
     * urn:x-oca:ocpp:uid:1:569230
     * Value determining level in hierarchy stack of profiles. Higher values have precedence over lower values. Lowest level is 0.
     *
     */
    stackLevel: number;
    chargingProfilePurpose: ChargingProfilePurposeEnumType;
    chargingProfileKind: ChargingProfileKindEnumType;
    recurrencyKind?: RecurrencyKindEnumType;
    /**
     * Charging_ Profile. Valid_ From. Date_ Time
     * urn:x-oca:ocpp:uid:1:569234
     * Point in time at which the profile starts to be valid. If absent, the profile is valid as soon as it is received by the Charging Station.
     *
     */
    validFrom?: string;
    /**
     * Charging_ Profile. Valid_ To. Date_ Time
     * urn:x-oca:ocpp:uid:1:569235
     * Point in time at which the profile stops to be valid. If absent, the profile is valid until it is replaced by another profile.
     *
     */
    validTo?: string;
    chargingSchedule: Array<ChargingScheduleType>;
    /**
     * SHALL only be included if ChargingProfilePurpose is set to TxProfile. The transactionId is used to match the profile to a specific transaction.
     *
     */
    transactionId?: string;
};

