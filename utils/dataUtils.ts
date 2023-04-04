import { CartItem } from "@/context/CartContext";
import { Collection } from "@/types/types";

export const parseNavCollection = (collections: Collection[]) => {
  return collections.map(({ title, slug }) => {
    return { title, slug };
  });
};


export const createOrderData = (order: CartItem[]) => {
  return order.map(item => ({
    product_id: item.product.id,
    quantity: item.quantity

}))
}

