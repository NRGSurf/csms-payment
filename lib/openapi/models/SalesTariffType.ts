/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomDataType } from './CustomDataType';
import type { SalesTariffEntryType } from './SalesTariffEntryType';
/**
 * Sales_ Tariff
 * urn:x-oca:ocpp:uid:2:233272
 * NOTE: This dataType is based on dataTypes from &lt;&lt;ref-ISOIEC15118-2,ISO 15118-2&gt;&gt;.
 *
 */
export type SalesTariffType = {
    customData?: CustomDataType;
    /**
     * Identified_ Object. MRID. Numeric_ Identifier
     * urn:x-enexis:ecdm:uid:1:569198
     * SalesTariff identifier used to identify one sales tariff. An SAID remains a unique identifier for one schedule throughout a charging session.
     *
     */
    id: number;
    /**
     * Sales_ Tariff. Sales. Tariff_ Description
     * urn:x-oca:ocpp:uid:1:569283
     * A human readable title/short description of the sales tariff e.g. for HMI display purposes.
     *
     */
    salesTariffDescription?: string;
    /**
     * Sales_ Tariff. Num_ E_ Price_ Levels. Counter
     * urn:x-oca:ocpp:uid:1:569284
     * Defines the overall number of distinct price levels used across all provided SalesTariff elements.
     *
     */
    numEPriceLevels?: number;
    salesTariffEntry: Array<SalesTariffEntryType>;
};

