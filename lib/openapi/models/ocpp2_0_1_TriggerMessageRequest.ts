/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { EVSEType } from './EVSEType';
import type { MessageTriggerEnumType } from './MessageTriggerEnumType';
export type ocpp2_0_1_TriggerMessageRequest = {
    customData?: CustomDataType;
    evse?: EVSEType;
    requestedMessage: MessageTriggerEnumType;
};

