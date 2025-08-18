/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageConfirmationSchemaArray } from '../models/MessageConfirmationSchemaArray';
import type { ocpp2_0_1_ClearChargingProfileRequest } from '../models/ocpp2_0_1_ClearChargingProfileRequest';
import type { ocpp2_0_1_ClearedChargingLimitRequest } from '../models/ocpp2_0_1_ClearedChargingLimitRequest';
import type { ocpp2_0_1_GetChargingProfilesRequest } from '../models/ocpp2_0_1_GetChargingProfilesRequest';
import type { ocpp2_0_1_GetCompositeScheduleRequest } from '../models/ocpp2_0_1_GetCompositeScheduleRequest';
import type { ocpp2_0_1_SetChargingProfileRequest } from '../models/ocpp2_0_1_SetChargingProfileRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SmartchargingService {
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201SmartchargingClearChargingProfile({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_ClearChargingProfileRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/smartcharging/clearChargingProfile',
            query: {
                'identifier': identifier,
                'tenantId': tenantId,
                'callbackUrl': callbackUrl,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201SmartchargingGetChargingProfiles({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_GetChargingProfilesRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/smartcharging/getChargingProfiles',
            query: {
                'identifier': identifier,
                'tenantId': tenantId,
                'callbackUrl': callbackUrl,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201SmartchargingSetChargingProfile({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_SetChargingProfileRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/smartcharging/setChargingProfile',
            query: {
                'identifier': identifier,
                'tenantId': tenantId,
                'callbackUrl': callbackUrl,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201SmartchargingClearedChargingLimit({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_ClearedChargingLimitRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/smartcharging/clearedChargingLimit',
            query: {
                'identifier': identifier,
                'tenantId': tenantId,
                'callbackUrl': callbackUrl,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201SmartchargingGetCompositeSchedule({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_GetCompositeScheduleRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/smartcharging/getCompositeSchedule',
            query: {
                'identifier': identifier,
                'tenantId': tenantId,
                'callbackUrl': callbackUrl,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
