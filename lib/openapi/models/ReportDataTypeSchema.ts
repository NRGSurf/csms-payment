/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComponentType } from './ComponentType';
import type { VariableAttributeType } from './VariableAttributeType';
import type { VariableCharacteristicsType } from './VariableCharacteristicsType';
import type { VariableType } from './VariableType';
export type ReportDataTypeSchema = {
    component: ComponentType;
    variable: VariableType;
    variableAttribute: Array<VariableAttributeType>;
    variableCharacteristics?: VariableCharacteristicsType;
};

