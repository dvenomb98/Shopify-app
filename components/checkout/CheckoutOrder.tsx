import { useCart } from "@/context/CartContext";
import React, { FC } from "react";
import Price from "../atoms/Price";
import { boxStyles } from "./CheckoutPanel";

const CheckoutOrder: FC = () => {
	const { cartItems } = useCart();

	if (!cartItems.length) return null;

	return (
		<div className={boxStyles}>
			{cartItems?.map(({ product: { id, title, price }, quantity }) => (
				<ul key={id} className="flex justify-between items-center">
					<li className="font-medium">
						{quantity} x {title}
					</li>
					<Price amount={price * quantity} />
				</ul>
			))}
		</div>
	);
};

export default CheckoutOrder;
