/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RemoteStartTransactionRequestChargingProfileKind } from './RemoteStartTransactionRequestChargingProfileKind';
import type { RemoteStartTransactionRequestChargingProfilePurpose } from './RemoteStartTransactionRequestChargingProfilePurpose';
import type { RemoteStartTransactionRequestChargingRateUnit } from './RemoteStartTransactionRequestChargingRateUnit';
import type { RemoteStartTransactionRequestRecurrencyKind } from './RemoteStartTransactionRequestRecurrencyKind';
export type RemoteStartTransactionRequest = {
    connectorId?: number;
    idTag: string;
    chargingProfile?: {
        chargingProfileId: number;
        transactionId?: number;
        stackLevel: number;
        chargingProfilePurpose: RemoteStartTransactionRequestChargingProfilePurpose;
        chargingProfileKind: RemoteStartTransactionRequestChargingProfileKind;
        recurrencyKind?: RemoteStartTransactionRequestRecurrencyKind;
        validFrom?: string;
        validTo?: string;
        chargingSchedule: {
            duration?: number;
            startSchedule?: string;
            chargingRateUnit: RemoteStartTransactionRequestChargingRateUnit;
            chargingSchedulePeriod: Array<{
                startPeriod: number;
                limit: number;
                numberPhases?: number;
            }>;
            minChargingRate?: number;
        };
    };
};

