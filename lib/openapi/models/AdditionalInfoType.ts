/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
/**
 * Contains a case insensitive identifier to use for the authorization and the type of authorization to support multiple forms of identifiers.
 *
 */
export type AdditionalInfoType = {
    customData?: CustomDataType;
    /**
     * This field specifies the additional IdToken.
     *
     */
    additionalIdToken: string;
    /**
     * This defines the type of the additionalIdToken. This is a custom type, so the implementation needs to be agreed upon by all involved parties.
     *
     */
    type: string;
};

