/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
/**
 * Reference key to a component-variable.
 *
 */
export type VariableType = {
    customData?: CustomDataType;
    /**
     * Name of the variable. Name should be taken from the list of standardized variable names whenever possible. Case Insensitive. strongly advised to use Camel Case.
     *
     */
    name: string;
    /**
     * Name of instance in case the variable exists as multiple instances. Case Insensitive. strongly advised to use Camel Case.
     *
     */
    instance?: string;
};

