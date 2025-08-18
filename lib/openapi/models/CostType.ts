/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CostKindEnumType } from './CostKindEnumType';
import type { CustomDataType } from './CustomDataType';
/**
 * Cost
 * urn:x-oca:ocpp:uid:2:233258
 *
 */
export type CostType = {
    customData?: CustomDataType;
    costKind: CostKindEnumType;
    /**
     * Cost. Amount. Amount
     * urn:x-oca:ocpp:uid:1:569244
     * The estimated or actual cost per kWh
     *
     */
    amount: number;
    /**
     * Cost. Amount_ Multiplier. Integer
     * urn:x-oca:ocpp:uid:1:569245
     * Values: -3..3, The amountMultiplier defines the exponent to base 10 (dec). The final value is determined by: amount * 10 ^ amountMultiplier
     *
     */
    amountMultiplier?: number;
};

