import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getMineOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User Id is reequired");
  }

  const MINE_ORDERS_QUERY = defineQuery(`
         *[_type == "orders" && clerkUserId == $userId] | order(orderDate desc){
            ...,
            products[]{
                ...,
                product-> 
            }
         }
    `);

  try {
    const orders = await sanityFetch({
      query: MINE_ORDERS_QUERY,
      params: { userId },
    });
    return orders.data || [];
  } catch (error) {
    console.error("Error on Fetching Orders :", error);
    return [];
  }
};
