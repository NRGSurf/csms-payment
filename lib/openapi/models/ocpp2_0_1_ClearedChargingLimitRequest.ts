/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChargingLimitSourceEnumType } from './ChargingLimitSourceEnumType';
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_ClearedChargingLimitRequest = {
    customData?: CustomDataType;
    chargingLimitSource: ChargingLimitSourceEnumType;
    /**
     * EVSE Identifier.
     *
     */
    evseId?: number;
};

