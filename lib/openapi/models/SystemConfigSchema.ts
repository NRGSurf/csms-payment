/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SystemConfigSchema = {
    env: SystemConfigSchema.env;
    centralSystem: {
        host: string;
        port: number;
    };
    modules: {
        certificates?: {
            endpointPrefix: string;
            host?: string;
            port?: number;
            requests: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
            responses: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
        };
        evdriver: {
            endpointPrefix: string;
            host?: string;
            port?: number;
            requests: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
            responses: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
        };
        configuration: {
            heartbeatInterval: number;
            bootRetryInterval: number;
            ocpp2_0_1?: {
                unknownChargerStatus: SystemConfigSchema.unknownChargerStatus;
                getBaseReportOnPending: boolean;
                bootWithRejectedVariables: boolean;
                autoAccept: boolean;
            };
            ocpp1_6?: {
                unknownChargerStatus: SystemConfigSchema.unknownChargerStatus;
            };
            endpointPrefix: string;
            host?: string;
            port?: number;
            requests: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
            responses: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
        };
        monitoring: {
            endpointPrefix: string;
            host?: string;
            port?: number;
            requests: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
            responses: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
        };
        reporting: {
            endpointPrefix: string;
            host?: string;
            port?: number;
            requests: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
            responses: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
        };
        smartcharging?: {
            endpointPrefix: string;
            host?: string;
            port?: number;
            requests: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
            responses: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
        };
        tenant: {
            endpointPrefix: string;
            host?: string;
            port?: number;
            requests: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
            responses: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
        };
        transactions: {
            endpointPrefix: string;
            host?: string;
            port?: number;
            costUpdatedInterval?: number;
            sendCostUpdatedOnMeterValue?: boolean;
            requests: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
            responses: Array<('Authorize' | 'BootNotification' | 'CancelReservation' | 'ChangeAvailability' | 'ChangeConfiguration' | 'ClearCache' | 'ClearChargingProfile' | 'DataTransfer' | 'DiagnosticsStatusNotification' | 'FirmwareStatusNotification' | 'GetCompositeSchedule' | 'GetConfiguration' | 'GetDiagnostics' | 'GetLocalListVersion' | 'Heartbeat' | 'MeterValues' | 'RemoteStartTransaction' | 'RemoteStopTransaction' | 'ReserveNow' | 'Reset' | 'SendLocalList' | 'SetChargingProfile' | 'StartTransaction' | 'StatusNotification' | 'StopTransaction' | 'TriggerMessage' | 'UnlockConnector' | 'UpdateFirmware' | 'Authorize' | 'BootNotification' | 'CancelReservation' | 'CertificateSigned' | 'ChangeAvailability' | 'ClearCache' | 'ClearChargingProfile' | 'ClearDisplayMessage' | 'ClearedChargingLimit' | 'ClearVariableMonitoring' | 'CostUpdated' | 'CustomerInformation' | 'DataTransfer' | 'DeleteCertificate' | 'FirmwareStatusNotification' | 'Get15118EVCertificate' | 'GetBaseReport' | 'GetCertificateStatus' | 'GetChargingProfiles' | 'GetCompositeSchedule' | 'GetDisplayMessages' | 'GetInstalledCertificateIds' | 'GetLocalListVersion' | 'GetLog' | 'GetMonitoringReport' | 'GetReport' | 'GetTransactionStatus' | 'GetVariables' | 'Heartbeat' | 'InstallCertificate' | 'LogStatusNotification' | 'MeterValues' | 'NotifyChargingLimit' | 'NotifyCustomerInformation' | 'NotifyDisplayMessages' | 'NotifyEVChargingNeeds' | 'NotifyEVChargingSchedule' | 'NotifyEvent' | 'NotifyMonitoringReport' | 'NotifyReport' | 'PublishFirmware' | 'PublishFirmwareStatusNotification' | 'ReportChargingProfiles' | 'RequestStartTransaction' | 'RequestStopTransaction' | 'ReservationStatusUpdate' | 'ReserveNow' | 'Reset' | 'SecurityEventNotification' | 'SendLocalList' | 'SetChargingProfile' | 'SetDisplayMessage' | 'SetMonitoringBase' | 'SetMonitoringLevel' | 'SetNetworkProfile' | 'SetVariableMonitoring' | 'SetVariables' | 'SignCertificate' | 'StatusNotification' | 'TransactionEvent' | 'TriggerMessage' | 'UnlockConnector' | 'UnpublishFirmware' | 'UpdateFirmware')>;
            signedMeterValuesConfiguration?: {
                publicKeyFileId: string;
                signingMethod: SystemConfigSchema.signingMethod;
            };
        };
    };
    util: {
        cache: {
            memory?: boolean;
            redis?: {
                host: string;
                port: number;
            };
        };
        messageBroker: {
            kafka?: {
                topicPrefix?: string;
                topicName?: string;
                brokers: Array<string>;
                sasl: {
                    mechanism: string;
                    username: string;
                    password: string;
                };
            };
            amqp?: {
                url: string;
                exchange: string;
            };
        };
        authProvider: {
            oidc?: {
                jwksUri: string;
                issuer: string;
                audience: string;
                cacheTime?: number;
                rateLimit: boolean;
            };
            localByPass?: boolean;
        };
        swagger?: {
            path: string;
            logoPath: string;
            exposeData: boolean;
            exposeMessage: boolean;
        };
        networkConnection: {
            websocketServers: Array<{
                id: string;
                host: string;
                port: number;
                pingInterval: number;
                protocol: 'ocpp1.6' | 'ocpp2.0.1';
                securityProfile: number;
                allowUnknownChargingStations: boolean;
                tlsKeyFilePath?: string;
                tlsCertificateChainFilePath?: string;
                mtlsCertificateAuthorityKeyFilePath?: string;
                rootCACertificateFilePath?: string;
                tenantId: number;
            }>;
        };
        certificateAuthority: {
            v2gCA: {
                name: SystemConfigSchema.name;
                hubject?: {
                    baseUrl: string;
                    tokenUrl: string;
                    isoVersion: SystemConfigSchema.isoVersion;
                };
            };
            chargingStationCA: {
                name: SystemConfigSchema.name;
                acme?: {
                    env: SystemConfigSchema.env;
                    accountKeyFilePath: string;
                    email: string;
                };
            };
        };
    };
    logLevel: number;
    maxCallLengthSeconds: number;
    maxCachingSeconds: number;
    ocpiServer: {
        host: string;
        port: number;
    };
    userPreferences: {
        telemetryConsent?: boolean;
    };
    rbacRulesFileName?: string;
    rbacRulesDir?: string;
};
export namespace SystemConfigSchema {
    export enum env {
        DEVELOPMENT = 'development',
        PRODUCTION = 'production',
    }
    export enum unknownChargerStatus {
        ACCEPTED = 'Accepted',
        PENDING = 'Pending',
        REJECTED = 'Rejected',
    }
    export enum signingMethod {
        RSASSA_PKCS1_V1_5 = 'RSASSA-PKCS1-v1_5',
        ECDSA = 'ECDSA',
    }
    export enum name {
        HUBJECT = 'hubject',
    }
    export enum isoVersion {
        ISO15118_2 = 'ISO15118-2',
        ISO15118_20 = 'ISO15118-20',
    }
}

