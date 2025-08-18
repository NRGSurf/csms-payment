/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChargingRateUnitEnumType } from './ChargingRateUnitEnumType';
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_GetCompositeScheduleRequest = {
    customData?: CustomDataType;
    /**
     * Length of the requested schedule in seconds.
     *
     *
     */
    duration: number;
    chargingRateUnit?: ChargingRateUnitEnumType;
    /**
     * The ID of the EVSE for which the schedule is requested. When evseid=0, the Charging Station will calculate the expected consumption for the grid connection.
     *
     */
    evseId: number;
};

