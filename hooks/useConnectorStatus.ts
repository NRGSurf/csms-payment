// hooks/useConnectorStatus.ts
import { useEvseStatus } from "./useEvseStatus";

// For now, connector-level logic mirrors station-level occupancy.
// Later you can refine by connectorId once the backend supports it.
export function useConnectorStatus(
  stationId: string,
  connectorId: number,
  opts?: { enabled?: boolean }
) {
  return useEvseStatus(stationId, connectorId, opts as any);
}
