/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageConfirmationSchemaArray } from '../models/MessageConfirmationSchemaArray';
import type { ocpp2_0_1_CancelReservationRequest } from '../models/ocpp2_0_1_CancelReservationRequest';
import type { ocpp2_0_1_ClearCacheRequest } from '../models/ocpp2_0_1_ClearCacheRequest';
import type { ocpp2_0_1_GetLocalListVersionRequest } from '../models/ocpp2_0_1_GetLocalListVersionRequest';
import type { ocpp2_0_1_RequestStartTransactionRequest } from '../models/ocpp2_0_1_RequestStartTransactionRequest';
import type { ocpp2_0_1_RequestStopTransactionRequest } from '../models/ocpp2_0_1_RequestStopTransactionRequest';
import type { ocpp2_0_1_ReserveNowRequest } from '../models/ocpp2_0_1_ReserveNowRequest';
import type { ocpp2_0_1_SendLocalListRequest } from '../models/ocpp2_0_1_SendLocalListRequest';
import type { ocpp2_0_1_UnlockConnectorRequest } from '../models/ocpp2_0_1_UnlockConnectorRequest';
import type { RemoteStartTransactionRequest } from '../models/RemoteStartTransactionRequest';
import type { RemoteStopTransactionRequest } from '../models/RemoteStopTransactionRequest';
import type { SystemConfigSchema } from '../models/SystemConfigSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EvdriverService {
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201EvdriverRequestStartTransaction({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_RequestStartTransactionRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/evdriver/requestStartTransaction',
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
    public static postOcpp201EvdriverRequestStopTransaction({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_RequestStopTransactionRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/evdriver/requestStopTransaction',
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
    public static postOcpp201EvdriverCancelReservation({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_CancelReservationRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/evdriver/cancelReservation',
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
    public static postOcpp201EvdriverReserveNow({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_ReserveNowRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/evdriver/reserveNow',
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
    public static postOcpp201EvdriverUnlockConnector({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_UnlockConnectorRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/evdriver/unlockConnector',
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
    public static postOcpp201EvdriverClearCache({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_ClearCacheRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/evdriver/clearCache',
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
    public static postOcpp201EvdriverSendLocalList({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_SendLocalListRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/evdriver/sendLocalList',
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
    public static postOcpp201EvdriverGetLocalListVersion({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_GetLocalListVersionRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/evdriver/getLocalListVersion',
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
    public static postOcpp16EvdriverRemoteStartTransaction({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: RemoteStartTransactionRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/1.6/evdriver/remoteStartTransaction',
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
    public static postOcpp16EvdriverRemoteStopTransaction({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: RemoteStopTransactionRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/1.6/evdriver/remoteStopTransaction',
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
     * @returns any Default Response
     * @throws ApiError
     */
    public static getDataEvdriverLocalListVersion({
        stationId,
        tenantId = 1,
    }: {
        stationId: string,
        tenantId?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/evdriver/localListVersion',
            query: {
                'stationId': stationId,
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getDataEvdriverSystemConfig(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/evdriver/systemConfig',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static putDataEvdriverSystemConfig({
        requestBody,
    }: {
        requestBody?: SystemConfigSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/evdriver/systemConfig',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
