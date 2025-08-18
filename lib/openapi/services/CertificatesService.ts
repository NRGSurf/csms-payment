/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageConfirmationSchemaArray } from '../models/MessageConfirmationSchemaArray';
import type { ocpp2_0_1_CertificateSignedRequest } from '../models/ocpp2_0_1_CertificateSignedRequest';
import type { ocpp2_0_1_DeleteCertificateRequest } from '../models/ocpp2_0_1_DeleteCertificateRequest';
import type { ocpp2_0_1_GenerateCertificateChainSchema } from '../models/ocpp2_0_1_GenerateCertificateChainSchema';
import type { ocpp2_0_1_GetInstalledCertificateIdsRequest } from '../models/ocpp2_0_1_GetInstalledCertificateIdsRequest';
import type { ocpp2_0_1_InstallCertificateRequest } from '../models/ocpp2_0_1_InstallCertificateRequest';
import type { ocpp2_0_1_InstallRootCertificateSchema } from '../models/ocpp2_0_1_InstallRootCertificateSchema';
import type { ocpp2_0_1_SystemConfigSchema } from '../models/ocpp2_0_1_SystemConfigSchema';
import type { ocpp2_0_1_TlsCertificateSchema } from '../models/ocpp2_0_1_TlsCertificateSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CertificatesService {
    /**
     * @returns MessageConfirmationSchemaArray Default Response
     * @throws ApiError
     */
    public static postOcpp201CertificatesCertificateSigned({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_CertificateSignedRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/certificates/certificateSigned',
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
    public static postOcpp201CertificatesInstallCertificate({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_InstallCertificateRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/certificates/installCertificate',
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
    public static postOcpp201CertificatesGetInstalledCertificateIds({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_GetInstalledCertificateIdsRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/certificates/getInstalledCertificateIds',
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
    public static postOcpp201CertificatesDeleteCertificate({
        identifier,
        tenantId = 1,
        callbackUrl,
        requestBody,
    }: {
        identifier: (string | Array<string>),
        tenantId?: number,
        callbackUrl?: string,
        requestBody?: ocpp2_0_1_DeleteCertificateRequest,
    }): CancelablePromise<MessageConfirmationSchemaArray> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ocpp/2.0.1/certificates/deleteCertificate',
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
    public static putDataCertificatesTlsCertificates({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: ocpp2_0_1_TlsCertificateSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/certificates/tlsCertificates',
            query: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static postDataCertificatesCertificateChain({
        tenantId = 1,
        requestBody,
    }: {
        tenantId?: number,
        requestBody?: ocpp2_0_1_GenerateCertificateChainSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data/certificates/certificateChain',
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
    public static putDataCertificatesRootCertificate({
        requestBody,
    }: {
        requestBody?: ocpp2_0_1_InstallRootCertificateSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/certificates/rootCertificate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getDataCertificatesSystemConfig(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data/certificates/systemConfig',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static putDataCertificatesSystemConfig({
        requestBody,
    }: {
        requestBody?: ocpp2_0_1_SystemConfigSchema,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data/certificates/systemConfig',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
