import { useCart } from "@/context/CartContext";
import { Product } from "@/types/types";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";

interface CardButtonProps {
	product: Product;
}

const CardButton: FC<CardButtonProps> = ({ product }) => {
	const { addItem, toggle } = useCart();

	const handleClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		event.preventDefault();

		addItem(product, 1);
		toggle();
	};
	return (
		<button
			onClick={handleClick}
			className="
     absolute z-10 bottom-0 w-full
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
