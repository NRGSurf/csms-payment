/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { EVSEType } from './EVSEType';
/**
 * A physical or logical component
 *
 */
export type ComponentType = {
    customData?: CustomDataType;
    evse?: EVSEType;
    /**
     * Name of the component. Name should be taken from the list of standardized component names whenever possible. Case Insensitive. strongly advised to use Camel Case.
     *
     */
    name: string;
    /**
     * Name of instance in case the component exists as multiple instances. Case Insensitive. strongly advised to use Camel Case.
     *
     */
    instance?: string;
};

