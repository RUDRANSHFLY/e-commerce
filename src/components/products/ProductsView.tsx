import React from "react";
import { Category, Product } from "../../../sanity.types";
import ProductsGrid from "./ProductsGrid";

interface ProductsViewProps {
  products: Product[] | [];
  categories: Category[] | [];
}

const ProductsView = ({ products }: ProductsViewProps) => {
  return (
    <div>
      <ProductsGrid products={products} />
    </div>
  );
};

export default ProductsView;
