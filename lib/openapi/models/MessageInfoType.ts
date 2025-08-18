/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComponentType } from './ComponentType';
import type { CustomDataType } from './CustomDataType';
import type { MessageContentType } from './MessageContentType';
import type { MessagePriorityEnumType } from './MessagePriorityEnumType';
import type { MessageStateEnumType } from './MessageStateEnumType';
/**
 * Message_ Info
 * urn:x-enexis:ecdm:uid:2:233264
 * Contains message details, for a message to be displayed on a Charging Station.
 *
 */
export type MessageInfoType = {
    customData?: CustomDataType;
    display?: ComponentType;
    /**
     * Identified_ Object. MRID. Numeric_ Identifier
     * urn:x-enexis:ecdm:uid:1:569198
     * Master resource identifier, unique within an exchange context. It is defined within the OCPP context as a positive Integer value (greater or equal to zero).
     *
     */
    id: number;
    priority: MessagePriorityEnumType;
    state?: MessageStateEnumType;
    /**
     * Message_ Info. Start. Date_ Time
     * urn:x-enexis:ecdm:uid:1:569256
     * From what date-time should this message be shown. If omitted: directly.
     *
     */
    startDateTime?: string;
    /**
     * Message_ Info. End. Date_ Time
     * urn:x-enexis:ecdm:uid:1:569257
     * Until what date-time should this message be shown, after this date/time this message SHALL be removed.
     *
     */
    endDateTime?: string;
    /**
     * During which transaction shall this message be shown.
     * Message SHALL be removed by the Charging Station after transaction has
     * ended.
     *
     */
    transactionId?: string;
    message: MessageContentType;
};

