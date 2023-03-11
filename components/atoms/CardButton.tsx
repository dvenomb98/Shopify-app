import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import React from "react";

const CardButton = () => {
  return (
    <button
      className="
     absolute z-10  bottom-0 w-full
     bg-primary-black text-primary-white hover:bg-primary-amber transition-all duration-300
     opacity-0 group-hover:opacity-100 sm:opacity-100
    "
    >
      <div className="flex items-center justify-center gap-2 p-2 sm:p-3">
      <ShoppingBagIcon className="w-5 h-5" />
        Do košíku
      </div>
    </button>
  );
};

export default CardButton;
