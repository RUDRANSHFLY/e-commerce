import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import { getProductByCategory } from "@/sanity/lib/products/getProductsByCategory";
import React from "react";
import ProductsView from "@/components/products/ProductsView";

const CategoryPageCoolection = async ({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const category = (await params).slug || "";
  const products = await getProductByCategory(category);
  const categories = await getAllCategories();

  return (
    <div
      className={
        "flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4"
      }
    >
      <div className={"bg-white p-8 rounded-lg shadow-md w-full max-w-4xl"}>
        <h1 className={"text-3xl font-bold mb-6 text-center"}>
          {category
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("")}
          {""}
          Collection
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
};

export default CategoryPageCoolection;
