/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSubscriptionSchema } from '../models/CreateSubscriptionSchema';
import type { SystemConfigSchema } from '../models/SystemConfigSchema';
import type { WebsocketRequestSchema } from '../models/WebsocketRequestSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OcpprouterService {
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static postDataOcpprouterSubscription({
        tenantId = 1,
        requestBody,
    }: {
        tenantId?: number,
        requestBody?: CreateSubscriptionSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data/ocpprouter/subscription',
            query: {
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
    public static getDataOcpprouterSubscription({
        stationId,
        tenantId = 1,
    }: {
        stationId: string,
        tenantId?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/ocpprouter/subscription',
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
    public static deleteDataOcpprouterSubscription({
        id,
        tenantId = 1,
    }: {
        id: number,
        tenantId?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data/ocpprouter/subscription',
            query: {
                'id': id,
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getDataOcpprouterWebsocket({
        id,
        tenantId,
    }: {
        id?: string,
        tenantId?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/ocpprouter/websocket',
            query: {
                'id': id,
                'tenantId': tenantId,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static postDataOcpprouterWebsocket({
        requestBody,
    }: {
        requestBody?: WebsocketRequestSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data/ocpprouter/websocket',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteDataOcpprouterWebsocket({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data/ocpprouter/websocket',
            query: {
                'id': id,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getDataOcpprouterSystemConfig(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/ocpprouter/systemConfig',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static putDataOcpprouterSystemConfig({
        requestBody,
    }: {
        requestBody?: SystemConfigSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/ocpprouter/systemConfig',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
