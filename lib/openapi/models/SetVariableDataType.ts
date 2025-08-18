/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttributeEnumType } from './AttributeEnumType';
import type { ComponentType } from './ComponentType';
import type { CustomDataType } from './CustomDataType';
import type { VariableType } from './VariableType';
export type SetVariableDataType = {
    customData?: CustomDataType;
    attributeType?: AttributeEnumType;
    /**
     * Value to be assigned to attribute of variable.
     *
     * The Configuration Variable &lt;&lt;configkey-configuration-value-size,ConfigurationValueSize&gt;&gt; can be used to limit SetVariableData.attributeValue and VariableCharacteristics.valueList. The max size of these values will always remain equal.
     *
     */
    attributeValue: string;
    component: ComponentType;
    variable: VariableType;
};

