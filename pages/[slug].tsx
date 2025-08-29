// pages/[slug].tsx
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { StartFlow } from "@/components/StartFlow";

type QREndpoint = {
  databaseId: number;
  slug: string;
  stationId: string | null;
  version: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  connectorId?: number | null;
  label?: string | null;
  lastScannedAt?: string | null;
  // If your API starts returning it:
  evseId?: number | null;
};

type Props =
  | {
      ok: true;
      slug: string;
      stationId: string;
      evseId?: number;
      connectorId?: number;
    }
  | { ok: false; status: number; message?: string };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const slug = ctx.params?.slug as string;

  if (!slug) {
    return { props: { ok: false, status: 400, message: "Missing slug" } };
  }

  // Prefer your existing envs (used by /api/backend/*)
  const base =
    process.env.CITRINE_API_BASE_URL ||
    process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL ||
    "http://localhost:8080";
  const token = process.env.CITRINE_API_TOKEN;

  const url = `${base}/data/transactions/qREndpoint?slug=${encodeURIComponent(
    slug
  )}`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    return {
      props: {
        ok: false,
        status: res.status,
        message: `Failed to resolve slug (${res.status})`,
      },
    };
  }

  const data = (await res.json()) as QREndpoint | null;

  if (!data?.stationId) {
    return {
      props: { ok: false, status: 404, message: "Slug not found" },
    };
  }

  // Map optional values safely
  const evseId = typeof data.evseId === "number" ? data.evseId : undefined; // use when your API returns it

  const connectorId =
    typeof data.connectorId === "number" ? data.connectorId : undefined;

  return {
    props: {
      ok: true,
      slug,
      stationId: data.stationId,
      evseId,
      connectorId,
    },
  };
};

export default function QRSlugPage(props: Props) {
  if (!props.ok) {
    return (
      <>
        <Head>
          <title>QR code not found</title>
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

  const { stationId, evseId, connectorId, slug } = props;

  return (
    <>
      <Head>
        <title>{`QR · ${slug}`}</title>
      </Head>
      <StartFlow
        stationId={stationId}
        {...(evseId != null ? { evseId } : {})}
        {...(connectorId != null ? { connectorId } : {})}
      />
    </>
  );
}
