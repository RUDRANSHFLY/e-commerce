export const COUPEN_CODES = {
  BFRIDAY: "BFRIDAY",
  XMAS2021: "XMAS2021",
  NY2022: "NY2022",
} as const;

export type CouponCode = keyof typeof COUPEN_CODES;
