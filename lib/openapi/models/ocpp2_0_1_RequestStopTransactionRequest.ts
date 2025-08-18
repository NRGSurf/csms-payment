/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_RequestStopTransactionRequest = {
    customData?: CustomDataType;
    /**
     * The identifier of the transaction which the Charging Station is requested to stop.
     *
     */
    transactionId: string;
};

