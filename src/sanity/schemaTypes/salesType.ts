import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Sale Title",
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Sale Description",
    }),
    defineField({
      name: "discountAmount",
      type: "string",
      title: "Discount Amount",
      description: "Amount off is percentage or fixed value",
    }),
    defineField({
      name: "coupenCode",
      type: "string",
      title: "Coupen Code",
    }),
    defineField({
      name: "validFrom",
      type: "datetime",
      title: "Valid From",
    }),
    defineField({
      name: "validUntil",
      type: "datetime",
      title: "Valid Until",
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Is Active ?",
      description: "Toggle to activate/deactivate the sale",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      coupenCode: "coupenCode",
      isActive: "isActive",
    },
    prepare(select) {
      const { coupenCode, discountAmount, isActive, title } = select;
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle: `${discountAmount}% off - Code : ${coupenCode} - ${status}`,
      };
    },
  },
});
