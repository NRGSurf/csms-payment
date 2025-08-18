/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_UnlockConnectorRequest = {
    customData?: CustomDataType;
    /**
     * This contains the identifier of the EVSE for which a connector needs to be unlocked.
     *
     */
    evseId: number;
    /**
     * This contains the identifier of the connector that needs to be unlocked.
     *
     */
    connectorId: number;
};

