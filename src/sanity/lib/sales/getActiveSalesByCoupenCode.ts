import { defineQuery } from "next-sanity";
import { CouponCode } from "./coupenCodes";
import { sanityFetch } from "../live";

export const getActiveSaleByCoupenCode = async (coupenCode: CouponCode) => {
  const ACTIVE_SALE_BY_COUPEN_QUERY = defineQuery(`
            *[
                _type == "sale"
                && isActive == true
                && coupenCode == $coupenCode
            ] | order(validFrom desc){
                _id,
                title,
                description,
                discountAmount,
                coupenCode,
                validFrom,
                validUntil,
                isActive
            }[0]
        `);

  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPEN_QUERY,
      params: {
        coupenCode,
      },
    });

    return activeSale ? activeSale.data : null;
  } catch (error) {
    console.error("Error Fetching sale by coupen code:", error);
  }
};
