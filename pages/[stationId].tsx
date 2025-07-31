import { useRouter } from "next/router";

export default function StationPage() {
  const { query } = useRouter();
  return <h1>Station ID: {query.stationId}</h1>;
}

export async function getServerSideProps() {
  return { props: {} };
}
