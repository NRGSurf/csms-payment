/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { NetworkConnectionProfileType } from './NetworkConnectionProfileType';
export type ocpp2_0_1_SetNetworkProfileRequest = {
    customData?: CustomDataType;
    /**
     * Slot in which the configuration should be stored.
     *
     */
    configurationSlot: number;
    connectionData: NetworkConnectionProfileType;
};

