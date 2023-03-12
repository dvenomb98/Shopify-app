import { parseShopifyResponse } from "@/consts/shopifyClient";
import { Collection } from "shopify-buy";

export const parseNavCollection = (collections: Collection[]) => {
  const parsedData: Collection[] = parseShopifyResponse(collections);
  return parsedData.map(({ title, handle }) => {
    return { title, handle };
  });
};
