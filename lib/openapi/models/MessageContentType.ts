/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { MessageFormatEnumType } from './MessageFormatEnumType';
/**
 * Message_ Content
 * urn:x-enexis:ecdm:uid:2:234490
 * Contains message details, for a message to be displayed on a Charging Station.
 *
 *
 */
export type MessageContentType = {
    customData?: CustomDataType;
    format: MessageFormatEnumType;
    /**
     * Message_ Content. Language. Language_ Code
     * urn:x-enexis:ecdm:uid:1:570849
     * Message language identifier. Contains a language code as defined in &lt;&lt;ref-RFC5646,[RFC5646]&gt;&gt;.
     *
     */
    language?: string;
    /**
     * Message_ Content. Content. Message
     * urn:x-enexis:ecdm:uid:1:570852
     * Message contents.
     *
     *
     */
    content: string;
};

