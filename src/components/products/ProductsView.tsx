import React from "react";
import { Category, Product } from "../../../sanity.types";
import ProductsGrid from "./ProductsGrid";
import CategorySelect from "../category/CategorySelect";

interface ProductsViewProps {
  products: Product[] | [];
  categories: Category[] | [];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className={"flex flex-col"}>
      <div className={"w-full sm:w-[200px]"}>
        <CategorySelect category={categories} />
      </div>

      <div className={"flex-1"}>
        <ProductsGrid products={products} />
        <hr className={"w-1/2 sm:w-3/4"} />
      </div>
    </div>
  );
};

export default ProductsView;
