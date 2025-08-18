/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComponentVariableType } from './ComponentVariableType';
import type { CustomDataType } from './CustomDataType';
import type { MonitoringCriterionEnumType } from './MonitoringCriterionEnumType';
export type ocpp2_0_1_GetMonitoringReportRequest = {
    customData?: CustomDataType;
    componentVariable?: Array<ComponentVariableType>;
    /**
     * The Id of the request.
     *
     */
    requestId: number;
    /**
     * This field contains criteria for components for which a monitoring report is requested
     *
     */
    monitoringCriteria?: Array<MonitoringCriterionEnumType>;
};

