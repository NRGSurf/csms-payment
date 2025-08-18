/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { ResetEnumType } from './ResetEnumType';
export type ocpp2_0_1_ResetRequest = {
    customData?: CustomDataType;
    type: ResetEnumType;
    /**
     * This contains the ID of a specific EVSE that needs to be reset, instead of the entire Charging Station.
     *
     */
    evseId?: number;
};

