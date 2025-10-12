// src/lib/init.ts
import { OpenAPI } from "@/lib/openapi/core/OpenAPI";

// Resolve base URL strictly from env (no defaults!)
const BASE =
  process.env.CITRINE_API_BASE_URL ||
  process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL;

if (!BASE) {
  // Throw on server, warn on client.
  if (typeof window === "undefined") {
    throw new Error(
      "CITRINE_API_BASE_URL / NEXT_PUBLIC_CITRINE_API_BASE_URL is not set"
    );
  } else {
    // eslint-disable-next-line no-console
    console.error(
      "NEXT_PUBLIC_CITRINE_API_BASE_URL is not set. API calls will fail."
    );
  }
}

(OpenAPI as any).BASE = BASE || ""; // if missing in browser we keep "", but we warned above

const TOKEN = process.env.NEXT_PUBLIC_CITRINE_API_TOKEN;
if (TOKEN) {
  (OpenAPI as any).HEADERS = { Authorization: `Bearer ${TOKEN}` };
}
