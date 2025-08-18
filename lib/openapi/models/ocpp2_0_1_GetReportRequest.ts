/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComponentCriterionEnumType } from './ComponentCriterionEnumType';
import type { ComponentVariableType } from './ComponentVariableType';
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_GetReportRequest = {
    customData?: CustomDataType;
    componentVariable?: Array<ComponentVariableType>;
    /**
     * The Id of the request.
     *
     */
    requestId: number;
    /**
     * This field contains criteria for components for which a report is requested
     *
     */
    componentCriteria?: Array<ComponentCriterionEnumType>;
};

