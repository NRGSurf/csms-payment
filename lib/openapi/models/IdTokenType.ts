/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdditionalInfoType } from './AdditionalInfoType';
import type { CustomDataType } from './CustomDataType';
import type { IdTokenEnumType } from './IdTokenEnumType';
/**
 * Contains a case insensitive identifier to use for the authorization and the type of authorization to support multiple forms of identifiers.
 *
 */
export type IdTokenType = {
    customData?: CustomDataType;
    additionalInfo?: Array<AdditionalInfoType>;
    /**
     * IdToken is case insensitive. Might hold the hidden id of an RFID tag, but can for example also contain a UUID.
     *
     */
    idToken: string;
    type: IdTokenEnumType;
};

