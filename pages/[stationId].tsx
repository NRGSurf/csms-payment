// pages/[stationId].tsx
import Head from "next/head";
import { useRouter } from "next/router";
import { StartFlow } from "@/components/StartFlow";

export default function StationPage() {
  const { stationId, evseId: evseQ, connectorId: connQ } = useRouter().query;
  const sid = Array.isArray(stationId) ? stationId[0] : stationId;

  const evseId = evseQ
    ? Number(Array.isArray(evseQ) ? evseQ[0] : evseQ)
    : undefined;
  const connectorId = connQ
    ? Number(Array.isArray(connQ) ? connQ[0] : connQ)
    : undefined;

  if (!sid) return null;

  return (
    <>
      <Head>
        <title>{`Station ${sid}`}</title>
      </Head>
      {/* pass whichever is defined; StartFlow can branch */}
      <StartFlow stationId={sid} evseId={evseId} connectorId={connectorId} />
    </>
  );
}
