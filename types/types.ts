import { Collection, Product } from "shopify-buy";

export interface ProductWithCategory extends Product {
    category?: Collection;
  }


export interface CollectionsNavbar {
  title: string,
  handle: string,
}