/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageConfirmationSchemaArray } from '../models/MessageConfirmationSchemaArray';
import type { ocpp2_0_1_ClearVariableMonitoringRequest } from '../models/ocpp2_0_1_ClearVariableMonitoringRequest';
import type { ocpp2_0_1_GetVariablesRequest } from '../models/ocpp2_0_1_GetVariablesRequest';
import type { ocpp2_0_1_SetMonitoringBaseRequest } from '../models/ocpp2_0_1_SetMonitoringBaseRequest';
import type { ocpp2_0_1_SetMonitoringLevelRequest } from '../models/ocpp2_0_1_SetMonitoringLevelRequest';
import type { ocpp2_0_1_SetVariableMonitoringRequest } from '../models/ocpp2_0_1_SetVariableMonitoringRequest';
import type { ocpp2_0_1_SetVariablesRequest } from '../models/ocpp2_0_1_SetVariablesRequest';
import type { ReportDataTypeSchema } from '../models/ReportDataTypeSchema';
import type { SystemConfigSchema } from '../models/SystemConfigSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MonitoringService {
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201MonitoringSetVariableMonitoring({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_SetVariableMonitoringRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/monitoring/setVariableMonitoring',
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
    public static postOcpp201MonitoringClearVariableMonitoring({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_ClearVariableMonitoringRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/monitoring/clearVariableMonitoring',
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
    public static postOcpp201MonitoringSetMonitoringLevel({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_SetMonitoringLevelRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/monitoring/setMonitoringLevel',
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
    public static postOcpp201MonitoringSetMonitoringBase({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_SetMonitoringBaseRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/monitoring/setMonitoringBase',
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
    public static postOcpp201MonitoringSetVariables({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_SetVariablesRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/monitoring/setVariables',
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
    public static postOcpp201MonitoringGetVariables({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_GetVariablesRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/monitoring/getVariables',
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
    public static putDataMonitoringVariableAttribute({
        stationId,
        tenantId = 1,
        setOnCharger,
        requestBody,
    }: {
        stationId: string,
        tenantId?: number,
        setOnCharger?: boolean,
        requestBody?: ReportDataTypeSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/monitoring/variableAttribute',
            query: {
                'tenantId': tenantId,
                'stationId': stationId,
                'setOnCharger': setOnCharger,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getDataMonitoringVariableAttribute({
        stationId,
        tenantId = 1,
        type,
        value,
        status,
        componentEvseId,
        componentEvseConnectorId,
        componentName,
        componentInstance,
        variableName,
        variableInstance,
    }: {
        stationId: string,
        tenantId?: number,
        type?: string,
        value?: string,
        status?: string,
        componentEvseId?: number,
        componentEvseConnectorId?: number,
        componentName?: string,
        componentInstance?: string,
        variableName?: string,
        variableInstance?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/monitoring/variableAttribute',
            query: {
                'stationId': stationId,
                'tenantId': tenantId,
                'type': type,
                'value': value,
                'status': status,
                'component_evse_id': componentEvseId,
                'component_evse_connectorId': componentEvseConnectorId,
                'component_name': componentName,
                'component_instance': componentInstance,
                'variable_name': variableName,
                'variable_instance': variableInstance,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteDataMonitoringVariableAttribute({
        stationId,
        tenantId = 1,
        type,
        value,
        status,
        componentEvseId,
        componentEvseConnectorId,
        componentName,
        componentInstance,
        variableName,
        variableInstance,
    }: {
        stationId: string,
        tenantId?: number,
        type?: string,
        value?: string,
        status?: string,
        componentEvseId?: number,
        componentEvseConnectorId?: number,
        componentName?: string,
        componentInstance?: string,
        variableName?: string,
        variableInstance?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data/monitoring/variableAttribute',
            query: {
                'stationId': stationId,
                'tenantId': tenantId,
                'type': type,
                'value': value,
                'status': status,
                'component_evse_id': componentEvseId,
                'component_evse_connectorId': componentEvseConnectorId,
                'component_name': componentName,
                'component_instance': componentInstance,
                'variable_name': variableName,
                'variable_instance': variableInstance,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getDataMonitoringSystemConfig(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/monitoring/systemConfig',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static putDataMonitoringSystemConfig({
        requestBody,
    }: {
        requestBody?: SystemConfigSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/monitoring/systemConfig',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
