/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegistrationStatusEnumType } from './RegistrationStatusEnumType';
import type { StatusInfoType } from './StatusInfoType';
/**
 * Boot configuration used to determine boot process for a charging station
 */
export type BootConfigSchema = {
    heartbeatInterval?: number;
    bootRetryInterval?: number;
    status: RegistrationStatusEnumType;
    statusInfo?: StatusInfoType;
    getBaseReportOnPending?: boolean;
    setVariableIds?: Array<number>;
    bootWithRejectedVariables?: boolean;
};

