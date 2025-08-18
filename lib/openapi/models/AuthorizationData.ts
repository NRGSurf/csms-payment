/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { IdTokenInfoType } from './IdTokenInfoType';
import type { IdTokenType } from './IdTokenType';
/**
 * Contains the identifier to use for authorization.
 *
 */
export type AuthorizationData = {
    customData?: CustomDataType;
    idToken: IdTokenType;
    idTokenInfo?: IdTokenInfoType;
};

