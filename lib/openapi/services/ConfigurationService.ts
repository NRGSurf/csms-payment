/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BootConfigSchema } from '../models/BootConfigSchema';
import type { ChangeAvailabilityRequest } from '../models/ChangeAvailabilityRequest';
import type { ChangeConfigurationRequest } from '../models/ChangeConfigurationRequest';
import type { GetConfigurationRequest } from '../models/GetConfigurationRequest';
import type { MessageConfirmationSchemaArray } from '../models/MessageConfirmationSchemaArray';
import type { ocpp2_0_1_ChangeAvailabilityRequest } from '../models/ocpp2_0_1_ChangeAvailabilityRequest';
import type { ocpp2_0_1_ClearDisplayMessageRequest } from '../models/ocpp2_0_1_ClearDisplayMessageRequest';
import type { ocpp2_0_1_GetDisplayMessagesRequest } from '../models/ocpp2_0_1_GetDisplayMessagesRequest';
import type { ocpp2_0_1_PublishFirmwareRequest } from '../models/ocpp2_0_1_PublishFirmwareRequest';
import type { ocpp2_0_1_ResetRequest } from '../models/ocpp2_0_1_ResetRequest';
import type { ocpp2_0_1_SetDisplayMessageRequest } from '../models/ocpp2_0_1_SetDisplayMessageRequest';
import type { ocpp2_0_1_SetNetworkProfileRequest } from '../models/ocpp2_0_1_SetNetworkProfileRequest';
import type { ocpp2_0_1_TriggerMessageRequest } from '../models/ocpp2_0_1_TriggerMessageRequest';
import type { ocpp2_0_1_UnpublishFirmwareRequest } from '../models/ocpp2_0_1_UnpublishFirmwareRequest';
import type { ocpp2_0_1_UpdateFirmwareRequest } from '../models/ocpp2_0_1_UpdateFirmwareRequest';
import type { ResetRequest } from '../models/ResetRequest';
import type { SystemConfigSchema } from '../models/SystemConfigSchema';
import type { TriggerMessageRequest } from '../models/TriggerMessageRequest';
import type { UpdateChargingStationPasswordRequestSchema } from '../models/UpdateChargingStationPasswordRequestSchema';
import type { UpdateFirmwareRequest } from '../models/UpdateFirmwareRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConfigurationService {
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201ConfigurationSetNetworkProfile({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_SetNetworkProfileRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/configuration/setNetworkProfile',
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
    public static postOcpp201ConfigurationClearDisplayMessage({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_ClearDisplayMessageRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/configuration/clearDisplayMessage',
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
    public static postOcpp201ConfigurationGetDisplayMessages({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_GetDisplayMessagesRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/configuration/getDisplayMessages',
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
    public static postOcpp201ConfigurationPublishFirmware({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_PublishFirmwareRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/configuration/publishFirmware',
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
    public static postOcpp201ConfigurationSetDisplayMessage({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_SetDisplayMessageRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/configuration/setDisplayMessage',
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
    public static postOcpp201ConfigurationUnpublishFirmware({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_UnpublishFirmwareRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/configuration/unpublishFirmware',
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
    public static postOcpp201ConfigurationUpdateFirmware({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_UpdateFirmwareRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/configuration/updateFirmware',
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
    public static postOcpp201ConfigurationReset({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_ResetRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/configuration/reset',
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
    public static postOcpp201ConfigurationChangeAvailability({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_ChangeAvailabilityRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/configuration/changeAvailability',
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
    public static postOcpp201ConfigurationTriggerMessage({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_TriggerMessageRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/configuration/triggerMessage',
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
    public static postOcpp16ConfigurationTriggerMessage({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: TriggerMessageRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/1.6/configuration/triggerMessage',
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
    public static postOcpp16ConfigurationChangeConfiguration({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ChangeConfigurationRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/1.6/configuration/changeConfiguration',
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
    public static postOcpp16ConfigurationGetConfiguration({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: GetConfigurationRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/1.6/configuration/getConfiguration',
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
    public static postOcpp16ConfigurationReset({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ResetRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/1.6/configuration/reset',
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
    public static postOcpp16ConfigurationChangeAvailability({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ChangeAvailabilityRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/1.6/configuration/changeAvailability',
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
    public static postOcpp16ConfigurationUpdateFirmware({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: UpdateFirmwareRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/1.6/configuration/updateFirmware',
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
    public static putDataConfigurationBoot({
        stationId,
        tenantId = 1,
        requestBody,
    }: {
        stationId: string,
        tenantId?: number,
        requestBody?: BootConfigSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/configuration/boot',
            query: {
                'stationId': stationId,
                'tenantId': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getDataConfigurationBoot({
        stationId,
        tenantId = 1,
    }: {
        stationId: string,
        tenantId?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/configuration/boot',
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
    public static deleteDataConfigurationBoot({
        stationId,
        tenantId = 1,
    }: {
        stationId: string,
        tenantId?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data/configuration/boot',
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
    public static postDataConfigurationPassword({
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: UpdateChargingStationPasswordRequestSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data/configuration/password',
            query: {
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
    public static getDataConfigurationServerNetworkProfile({
        stationId,
        tenantId = 1,
    }: {
        stationId: string,
        tenantId?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/configuration/serverNetworkProfile',
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
    public static deleteDataConfigurationServerNetworkProfile({
        stationId,
        configurationSlot,
        tenantId = 1,
    }: {
        stationId: string,
        configurationSlot: Array<number>,
        tenantId?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data/configuration/serverNetworkProfile',
            query: {
                'stationId': stationId,
                'configurationSlot': configurationSlot,
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getDataConfigurationSystemConfig(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/configuration/systemConfig',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static putDataConfigurationSystemConfig({
        requestBody,
    }: {
        requestBody?: SystemConfigSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/configuration/systemConfig',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
