/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { EVSEType } from './EVSEType';
import type { OperationalStatusEnumType } from './OperationalStatusEnumType';
export type ocpp2_0_1_ChangeAvailabilityRequest = {
    customData?: CustomDataType;
    evse?: EVSEType;
    operationalStatus: OperationalStatusEnumType;
};

