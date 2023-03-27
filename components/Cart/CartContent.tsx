import { fallbackIMG } from "@/consts/fallbacks";
import { useCart } from "@/context/CartContext";

import Image from "next/image";
import React, { FC } from "react";
import Counter from "../atoms/Counter";
import Price from "../atoms/Price";

const CartContent: FC = () => {
	const { cartItems, removeItem, updateItemQuantity } = useCart();

	return (
		<div className="w-full sm:text-small flex flex-col gap-5">
			{cartItems.map(({ product: { id, title, price, images }, quantity }) => {
				const featuredImage = images?.[0] || fallbackIMG.src;
				const correctPrice = price * quantity;

				return (
					<div key={id} className="flex items-center gap-2">
						<div className="relative h-20 sm:h-16 aspect-square rounded-md">
							<Image
								src={featuredImage}
								className="w-full h-full object-cover rounded-md"
								fill
								alt={title}
							/>
						</div>

						<div className="flex items-center justify-between w-full">
							<div>
								<h4 className="font-bold">{title}</h4>
								<Price amount={correctPrice} />
							</div>

							<Counter
								value={quantity}
								allowRemove
								minValue={1}
								maxValue={99}
								addCount={() => updateItemQuantity(id, quantity + 1)}
								decreaseCount={() => {
									if(quantity <= 1) removeItem(id)
									else {
									updateItemQuantity(id, quantity - 1)
									}
								}}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CartContent;
