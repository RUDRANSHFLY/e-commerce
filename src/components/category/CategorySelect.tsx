import React from "react";
import { Category } from "../../../sanity.types";
import CategorySelectComp from "../ui/category";

interface CategorySelectProps {
  category: Category[];
}

const CategorySelect = ({ category }: CategorySelectProps) => {
  return (
    <div>
      <CategorySelectComp categories={category} />
    </div>
  );
};

export default CategorySelect;
