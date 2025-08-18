/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CostType } from './CostType';
import type { CustomDataType } from './CustomDataType';
/**
 * Consumption_ Cost
 * urn:x-oca:ocpp:uid:2:233259
 *
 */
export type ConsumptionCostType = {
    customData?: CustomDataType;
    /**
     * Consumption_ Cost. Start_ Value. Numeric
     * urn:x-oca:ocpp:uid:1:569246
     * The lowest level of consumption that defines the starting point of this consumption block. The block interval extends to the start of the next interval.
     *
     */
    startValue: number;
    cost: Array<CostType>;
};

