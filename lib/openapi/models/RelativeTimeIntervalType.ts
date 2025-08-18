/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
/**
 * Relative_ Timer_ Interval
 * urn:x-oca:ocpp:uid:2:233270
 *
 */
export type RelativeTimeIntervalType = {
    customData?: CustomDataType;
    /**
     * Relative_ Timer_ Interval. Start. Elapsed_ Time
     * urn:x-oca:ocpp:uid:1:569279
     * Start of the interval, in seconds from NOW.
     *
     */
    start: number;
    /**
     * Relative_ Timer_ Interval. Duration. Elapsed_ Time
     * urn:x-oca:ocpp:uid:1:569280
     * Duration of the interval, in seconds.
     *
     */
    duration?: number;
};

