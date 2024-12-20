import DiscountBanner from "@/components/banner/DiscountBanner";
import ProductsView from "@/components/products/ProductsView";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <DiscountBanner />
      <div
        className={
          "flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4"
        }
      >
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
