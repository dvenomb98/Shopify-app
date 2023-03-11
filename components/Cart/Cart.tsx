import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import React from "react";

const Cart = () => {
  return (
    <button aria-roledescription="shopping-cart">
      <ShoppingBagIcon className="w-6 h-6 hover:opacity-70 transition ease-in-out font-bold' cursor-pointer" />
    </button>
  );
};

export default Cart;
