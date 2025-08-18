/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthorizationData } from './AuthorizationData';
import type { CustomDataType } from './CustomDataType';
import type { UpdateEnumType } from './UpdateEnumType';
export type ocpp2_0_1_SendLocalListRequest = {
    customData?: CustomDataType;
    localAuthorizationList?: Array<AuthorizationData>;
    /**
     * In case of a full update this is the version number of the full list. In case of a differential update it is the version number of the list after the update has been applied.
     *
     */
    versionNumber: number;
    updateType: UpdateEnumType;
};

