/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChargingProfileType } from './ChargingProfileType';
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_SetChargingProfileRequest = {
    customData?: CustomDataType;
    /**
     * For TxDefaultProfile an evseId=0 applies the profile to each individual evse. For ChargingStationMaxProfile and ChargingStationExternalConstraints an evseId=0 contains an overal limit for the whole Charging Station.
     *
     */
    evseId: number;
    chargingProfile: ChargingProfileType;
};

