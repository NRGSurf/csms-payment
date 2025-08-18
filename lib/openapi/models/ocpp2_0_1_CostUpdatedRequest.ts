/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_CostUpdatedRequest = {
    customData?: CustomDataType;
    /**
     * Current total cost, based on the information known by the CSMS, of the transaction including taxes. In the currency configured with the configuration Variable: [&lt;&lt;configkey-currency, Currency&gt;&gt;]
     *
     *
     */
    totalCost: number;
    /**
     * Transaction Id of the transaction the current cost are asked for.
     *
     *
     */
    transactionId: string;
};

