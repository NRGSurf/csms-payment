/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttributeEnumType } from './AttributeEnumType';
import type { ComponentType } from './ComponentType';
import type { CustomDataType } from './CustomDataType';
import type { VariableType } from './VariableType';
/**
 * Class to hold parameters for GetVariables request.
 *
 */
export type GetVariableDataType = {
    customData?: CustomDataType;
    attributeType?: AttributeEnumType;
    component: ComponentType;
    variable: VariableType;
};

