/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageConfirmationSchemaArray } from '../models/MessageConfirmationSchemaArray';
import type { ocpp2_0_1_CustomerInformationRequest } from '../models/ocpp2_0_1_CustomerInformationRequest';
import type { ocpp2_0_1_GetBaseReportRequest } from '../models/ocpp2_0_1_GetBaseReportRequest';
import type { ocpp2_0_1_GetLogRequest } from '../models/ocpp2_0_1_GetLogRequest';
import type { ocpp2_0_1_GetMonitoringReportRequest } from '../models/ocpp2_0_1_GetMonitoringReportRequest';
import type { ocpp2_0_1_GetReportRequest } from '../models/ocpp2_0_1_GetReportRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReportingService {
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201ReportingGetBaseReport({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_GetBaseReportRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/reporting/getBaseReport',
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
    public static postOcpp201ReportingGetReport({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_GetReportRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/reporting/getReport',
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
    public static postOcpp201ReportingGetMonitoringReport({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_GetMonitoringReportRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/reporting/getMonitoringReport',
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
    public static postOcpp201ReportingGetLog({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_GetLogRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/reporting/getLog',
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
    public static postOcpp201ReportingCustomerInformation({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_CustomerInformationRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/reporting/customerInformation',
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
