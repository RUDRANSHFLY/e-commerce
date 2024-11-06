import DiscountBanner from "@/components/banner/DiscountBanner";
import ProductsView from "@/components/products/ProductsView";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <div
        className={
          "flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4"
        }
      >
        <DiscountBanner />
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}