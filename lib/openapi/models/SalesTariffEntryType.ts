/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConsumptionCostType } from './ConsumptionCostType';
import type { CustomDataType } from './CustomDataType';
import type { RelativeTimeIntervalType } from './RelativeTimeIntervalType';
/**
 * Sales_ Tariff_ Entry
 * urn:x-oca:ocpp:uid:2:233271
 *
 */
export type SalesTariffEntryType = {
    customData?: CustomDataType;
    relativeTimeInterval: RelativeTimeIntervalType;
    /**
     * Sales_ Tariff_ Entry. E_ Price_ Level. Unsigned_ Integer
     * urn:x-oca:ocpp:uid:1:569281
     * Defines the price level of this SalesTariffEntry (referring to NumEPriceLevels). Small values for the EPriceLevel represent a cheaper TariffEntry. Large values for the EPriceLevel represent a more expensive TariffEntry.
     *
     */
    ePriceLevel?: number;
    consumptionCost?: Array<ConsumptionCostType>;
};

