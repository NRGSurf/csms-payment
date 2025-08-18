/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthorizationStatusEnumType } from './AuthorizationStatusEnumType';
import type { CustomDataType } from './CustomDataType';
import type { IdTokenType } from './IdTokenType';
import type { MessageContentType } from './MessageContentType';
/**
 * ID_ Token
 * urn:x-oca:ocpp:uid:2:233247
 * Contains status information about an identifier.
 * It is advised to not stop charging for a token that expires during charging, as ExpiryDate is only used for caching purposes. If ExpiryDate is not given, the status has no end date.
 *
 */
export type IdTokenInfoType = {
    customData?: CustomDataType;
    status: AuthorizationStatusEnumType;
    /**
     * ID_ Token. Expiry. Date_ Time
     * urn:x-oca:ocpp:uid:1:569373
     * Date and Time after which the token must be considered invalid.
     *
     */
    cacheExpiryDateTime?: string;
    /**
     * Priority from a business point of view. Default priority is 0, The range is from -9 to 9. Higher values indicate a higher priority. The chargingPriority in &lt;&lt;transactioneventresponse,TransactionEventResponse&gt;&gt; overrules this one.
     *
     */
    chargingPriority?: number;
    /**
     * ID_ Token. Language1. Language_ Code
     * urn:x-oca:ocpp:uid:1:569374
     * Preferred user interface language of identifier user. Contains a language code as defined in &lt;&lt;ref-RFC5646,[RFC5646]&gt;&gt;.
     *
     *
     */
    language1?: string;
    /**
     * Only used when the IdToken is only valid for one or more specific EVSEs, not for the entire Charging Station.
     *
     *
     */
    evseId?: Array<number>;
    groupIdToken?: IdTokenType;
    /**
     * ID_ Token. Language2. Language_ Code
     * urn:x-oca:ocpp:uid:1:569375
     * Second preferred user interface language of identifier user. Don’t use when language1 is omitted, has to be different from language1. Contains a language code as defined in &lt;&lt;ref-RFC5646,[RFC5646]&gt;&gt;.
     *
     */
    language2?: string;
    personalMessage?: MessageContentType;
    note?: string;
    customerName?: string;
};

