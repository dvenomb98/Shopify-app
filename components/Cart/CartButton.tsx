import { useCart } from "@/context/CartContext";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";

const CartButton: FC = () => {
	const { toggle, totalItemsInCart } = useCart();
	return (
		<button onClick={toggle}  aria-roledescription="shopping-cart" className="relative group">
			<ShoppingBagIcon className="w-6 h-6 group-hover:text-primary-amber transition ease-in-out font-bold' cursor-pointer" />
			{!!totalItemsInCart && (
				<span className="text-[0.6rem] bg-primary-amber rounded-full px-[5px] absolute top-3">
					{totalItemsInCart}
				</span>
			)}
		</button>
	);
};

export default CartButton;
