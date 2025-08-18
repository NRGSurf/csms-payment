/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChargingProfileCriterionType } from './ChargingProfileCriterionType';
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_GetChargingProfilesRequest = {
    customData?: CustomDataType;
    /**
     * Reference identification that is to be used by the Charging Station in the &lt;&lt;reportchargingprofilesrequest, ReportChargingProfilesRequest&gt;&gt; when provided.
     *
     */
    requestId: number;
    /**
     * For which EVSE installed charging profiles SHALL be reported. If 0, only charging profiles installed on the Charging Station itself (the grid connection) SHALL be reported. If omitted, all installed charging profiles SHALL be reported.
     *
     */
    evseId?: number;
    chargingProfile: ChargingProfileCriterionType;
};

