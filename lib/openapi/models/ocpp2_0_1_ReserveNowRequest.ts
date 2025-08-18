/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConnectorEnumType } from './ConnectorEnumType';
import type { CustomDataType } from './CustomDataType';
import type { IdTokenType } from './IdTokenType';
export type ocpp2_0_1_ReserveNowRequest = {
    customData?: CustomDataType;
    /**
     * Id of reservation.
     *
     */
    id: number;
    /**
     * Date and time at which the reservation expires.
     *
     */
    expiryDateTime: string;
    connectorType?: ConnectorEnumType;
    idToken: IdTokenType;
    /**
     * This contains ID of the evse to be reserved.
     *
     */
    evseId?: number;
    groupIdToken?: IdTokenType;
};

