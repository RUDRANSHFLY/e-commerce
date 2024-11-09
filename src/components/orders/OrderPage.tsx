import React from "react";
import { Orders } from "../../../sanity.types";

interface OrderPageProps {
  orders: Orders;
}

const OrderPage = ({ orders }: OrderPageProps) => {
  console.log(orders);

  return <div className={"p-4 sm:p-6 border-b border-gray-200"}></div>;
};

export default OrderPage;
