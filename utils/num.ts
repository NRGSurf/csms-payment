// utils/num.ts
export const toNum = (v: number | string | null | undefined) =>
  v == null ? null : typeof v === "number" ? v : Number(v);
