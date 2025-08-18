/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { ReportBaseEnumType } from './ReportBaseEnumType';
export type ocpp2_0_1_GetBaseReportRequest = {
    customData?: CustomDataType;
    /**
     * The Id of the request.
     *
     */
    requestId: number;
    reportBase: ReportBaseEnumType;
};

