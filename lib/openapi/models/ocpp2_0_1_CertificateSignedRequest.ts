/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CertificateSigningUseEnumType } from './CertificateSigningUseEnumType';
import type { CustomDataType } from './CustomDataType';
export type ocpp2_0_1_CertificateSignedRequest = {
    customData?: CustomDataType;
    /**
     * The signed PEM encoded X.509 certificate. This can also contain the necessary sub CA certificates. In that case, the order of the bundle should follow the certificate chain, starting from the leaf certificate.
     *
     * The Configuration Variable &lt;&lt;configkey-max-certificate-chain-size,MaxCertificateChainSize&gt;&gt; can be used to limit the maximum size of this field.
     *
     */
    certificateChain: string;
    certificateType?: CertificateSigningUseEnumType;
};

