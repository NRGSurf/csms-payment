/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { MessagePriorityEnumType } from './MessagePriorityEnumType';
import type { MessageStateEnumType } from './MessageStateEnumType';
export type ocpp2_0_1_GetDisplayMessagesRequest = {
    customData?: CustomDataType;
    /**
     * If provided the Charging Station shall return Display Messages of the given ids. This field SHALL NOT contain more ids than set in &lt;&lt;configkey-number-of-display-messages,NumberOfDisplayMessages.maxLimit&gt;&gt;
     *
     *
     */
    id?: Array<number>;
    /**
     * The Id of this request.
     *
     */
    requestId: number;
    priority?: MessagePriorityEnumType;
    state?: MessageStateEnumType;
};

