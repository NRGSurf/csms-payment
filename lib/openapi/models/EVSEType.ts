/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
/**
 * EVSE
 * urn:x-oca:ocpp:uid:2:233123
 * Electric Vehicle Supply Equipment
 *
 */
export type EVSEType = {
    customData?: CustomDataType;
    /**
     * Identified_ Object. MRID. Numeric_ Identifier
     * urn:x-enexis:ecdm:uid:1:569198
     * EVSE Identifier. This contains a number (&gt; 0) designating an EVSE of the Charging Station.
     *
     */
    id: number;
    /**
     * An id to designate a specific connector (on an EVSE) by connector index number.
     *
     */
    connectorId?: number;
};

