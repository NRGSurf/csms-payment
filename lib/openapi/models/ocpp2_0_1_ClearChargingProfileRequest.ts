/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClearChargingProfileType } from './ClearChargingProfileType';
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_ClearChargingProfileRequest = {
    customData?: CustomDataType;
    /**
     * The Id of the charging profile to clear.
     *
     */
    chargingProfileId?: number;
    chargingProfileCriteria?: ClearChargingProfileType;
};

