/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StartChargingResponseSchema = {
    ok: boolean;
    protocol: 'ocpp1.6' | 'ocpp2.0.1';
    remoteStartStatus: 'Accepted' | 'Rejected' | 'Scheduled' | 'AlreadyStarted' | 'Unknown';
    state: 'start-sent' | 'charging' | 'failed';
    remoteStartId: string;
    transactionId?: string | null;
    message?: string;
};

