import ProductsGrid from "@/components/products/ProductsGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
  }>;
}) => {
  const query = (await searchParams).query || "";
  const products = await searchProductsByName(query as string);

  if (!products?.length) {
    return (
      <div
        className={
          "flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4"
        }
      >
        <div className={"bg-white p-8 rounded-lg shadow-md w-full max-w-4xl"}>
          <h1 className={"text-3xl font-bold mb-6 text-center"}>
            No products found for : {query}
          </h1>
          <p className={"text-gray-600 text-center"}>
            Try searching with different keywords
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        "flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4"
      }
    >
      <div className={"bg-white p-8 rounded-lg shadow-md w-full max-w-4xl"}>
        <h1 className={"text-3xl font-bold mb-6 text-center"}>
          Search results for {query}
        </h1>
        <ProductsGrid products={products} />
      </div>
    </div>
  );
};

export default page;
