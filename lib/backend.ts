import { request as __request } from "./openapi/core/request"; // if exportCore=false, generated services use `request` helper
import * as Services from "./openapi/services";

export const Backend = {
  // Example typed calls – rename to actual generated service/methods
  stations: {
    getById: async (stationId: string) => {
      // Try common naming patterns from CitrineOS data endpoints
      // Replace with the exact generated call once you run `npm run openapi`
      const svc: any =
        (Services as any).StationsService ||
        (Services as any).LocationService ||
        (Services as any).ChargingStationService;
      if (!svc)
        throw new Error("No Stations/Location service found in OpenAPI.");
      // Try a few method candidates
      for (const m of [
        "getStation",
        "getStationById",
        "getById",
        "findOne",
        "stationsIdGet",
      ]) {
        if (svc[m]) return svc[m]({ id: stationId });
      }
      throw new Error(
        "Couldn't find a get-by-id method on the Stations service."
      );
    },
  },
  pricing: {
    getForStation: async (stationId: string) => {
      const svc: any =
        (Services as any).TariffsService ||
        (Services as any).PricingService ||
        (Services as any).CostService;
      if (!svc) return null; // optional
      for (const m of [
        "getCurrentPrice",
        "getTariffForStation",
        "getStationPrice",
        "pricesStationIdGet",
      ]) {
        if (svc[m]) return svc[m]({ stationId });
      }
      return null;
    },
  },
};
