/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChargingRateUnitEnumType } from './ChargingRateUnitEnumType';
import type { ChargingSchedulePeriodType } from './ChargingSchedulePeriodType';
import type { CustomDataType } from './CustomDataType';
import type { SalesTariffType } from './SalesTariffType';
/**
 * Charging_ Schedule
 * urn:x-oca:ocpp:uid:2:233256
 * Charging schedule structure defines a list of charging periods, as used in: GetCompositeSchedule.conf and ChargingProfile.
 *
 */
export type ChargingScheduleType = {
    customData?: CustomDataType;
    /**
     * Identifies the ChargingSchedule.
     *
     */
    id: number;
    /**
     * Charging_ Schedule. Start_ Schedule. Date_ Time
     * urn:x-oca:ocpp:uid:1:569237
     * Starting point of an absolute schedule. If absent the schedule will be relative to start of charging.
     *
     */
    startSchedule?: string;
    /**
     * Charging_ Schedule. Duration. Elapsed_ Time
     * urn:x-oca:ocpp:uid:1:569236
     * Duration of the charging schedule in seconds. If the duration is left empty, the last period will continue indefinitely or until end of the transaction if chargingProfilePurpose = TxProfile.
     *
     */
    duration?: number;
    chargingRateUnit: ChargingRateUnitEnumType;
    chargingSchedulePeriod: Array<ChargingSchedulePeriodType>;
    /**
     * Charging_ Schedule. Min_ Charging_ Rate. Numeric
     * urn:x-oca:ocpp:uid:1:569239
     * Minimum charging rate supported by the EV. The unit of measure is defined by the chargingRateUnit. This parameter is intended to be used by a local smart charging algorithm to optimize the power allocation for in the case a charging process is inefficient at lower charging rates. Accepts at most one digit fraction (e.g. 8.1)
     *
     */
    minChargingRate?: number;
    salesTariff?: SalesTariffType;
};

