// pages/[slug].tsx
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { StartFlow } from "@/components/StartFlow";

import { OpenAPI } from "@/lib/openapi/core/OpenAPI";
import { TransactionsService } from "@/lib/openapi/services/TransactionsService";
import type { QREndpointResponse } from "@/lib/openapi/models/QREndpointResponse";

type PageProps =
  | { ok: true; data: QREndpointResponse; tokenId?: string }
  | { ok: false; status: number; message?: string };

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  ctx
) => {
  const slug = ctx.params?.slug as string | undefined;
  if (!slug)
    return { props: { ok: false, status: 400, message: "Missing slug" } };

  // 👇 read token from query on the server so SSR & CSR match
  const tokenQ = (ctx.query.tokenID ?? ctx.query.tokenId) as
    | string
    | string[]
    | undefined;
  const tokenId = Array.isArray(tokenQ) ? tokenQ[0] : tokenQ;

  // OpenAPI config
  const base = process.env.CITRINE_API_BASE_URL ?? "http://localhost:8080";
  (OpenAPI as any).BASE = base;
  const token = process.env.CITRINE_API_TOKEN;
  if (token) (OpenAPI as any).HEADERS = { Authorization: `Bearer ${token}` };

  try {
    const data = await TransactionsService.getDataTransactionsQREndpoint({
      slug,
    });
    if (!data?.stationId) {
      return {
        props: { ok: false, status: 404, message: "QR code not found" },
      };
    }
    return {
      props: {
        ok: true,
        data,
        ...(tokenId ? { tokenId } : {}),
      } as any,
    };
  } catch {
    return {
      props: { ok: false, status: 502, message: "Failed to resolve QR slug" },
    };
  }
};

export default function QRSlugPage(props: PageProps) {
  if (!props.ok) {
    return (
      <>
        <Head>
          <title>QR not found</title>
        </Head>
        <main className="mx-auto max-w-xl p-6">
          <h1 className="text-xl font-semibold">QR code not found</h1>
          <p className="mt-2 text-sm opacity-80">
            {props.message ?? `Error ${props.status}`}
          </p>
        </main>
      </>
    );
  }

  const { data, tokenId } = props;

  return (
    <>
      <Head>
        <title>{`Station ${data.stationId}`}</title>
      </Head>
      <StartFlow
        stationId={data.stationId!}
        {...(typeof (data as any).evseId === "number"
          ? { evseId: (data as any).evseId }
          : {})}
        {...(typeof data.connectorId === "number"
          ? { connectorId: data.connectorId }
          : {})}
        tokenId={tokenId}
      />
    </>
  );
}
