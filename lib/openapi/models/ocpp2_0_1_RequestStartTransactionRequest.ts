/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChargingProfileType } from './ChargingProfileType';
import type { CustomDataType } from './CustomDataType';
import type { IdTokenType } from './IdTokenType';
export type ocpp2_0_1_RequestStartTransactionRequest = {
    customData?: CustomDataType;
    /**
     * Number of the EVSE on which to start the transaction. EvseId SHALL be &gt; 0
     *
     */
    evseId?: number;
    groupIdToken?: IdTokenType;
    idToken: IdTokenType;
    /**
     * Id given by the server to this start request. The Charging Station might return this in the &lt;&lt;transactioneventrequest, TransactionEventRequest&gt;&gt;, letting the server know which transaction was started for this request. Use to start a transaction.
     *
     */
    remoteStartId: number;
    chargingProfile?: ChargingProfileType;
};

