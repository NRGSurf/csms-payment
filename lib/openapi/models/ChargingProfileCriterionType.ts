/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChargingLimitSourceEnumType } from './ChargingLimitSourceEnumType';
import type { ChargingProfilePurposeEnumType } from './ChargingProfilePurposeEnumType';
import type { CustomDataType } from './CustomDataType';
/**
 * Charging_ Profile
 * urn:x-oca:ocpp:uid:2:233255
 * A ChargingProfile consists of ChargingSchedule, describing the amount of power or current that can be delivered per time interval.
 *
 */
export type ChargingProfileCriterionType = {
    customData?: CustomDataType;
    chargingProfilePurpose?: ChargingProfilePurposeEnumType;
    /**
     * Charging_ Profile. Stack_ Level. Counter
     * urn:x-oca:ocpp:uid:1:569230
     * Value determining level in hierarchy stack of profiles. Higher values have precedence over lower values. Lowest level is 0.
     *
     */
    stackLevel?: number;
    /**
     * List of all the chargingProfileIds requested. Any ChargingProfile that matches one of these profiles will be reported. If omitted, the Charging Station SHALL not filter on chargingProfileId. This field SHALL NOT contain more ids than set in &lt;&lt;configkey-charging-profile-entries,ChargingProfileEntries.maxLimit&gt;&gt;
     *
     *
     */
    chargingProfileId?: Array<number>;
    /**
     * For which charging limit sources, charging profiles SHALL be reported. If omitted, the Charging Station SHALL not filter on chargingLimitSource.
     *
     */
    chargingLimitSource?: Array<ChargingLimitSourceEnumType>;
};

