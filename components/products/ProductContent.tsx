import { useCart } from "@/context/CartContext";
import { Product } from "@/types/types";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import React, { FC } from "react";
import { Button } from "../atoms/Button";
import Price from "../atoms/Price";

interface ProductContentProps {
	product: Product;
}
const scrollTo = (scroll: boolean) => {
	if (!scroll) return;

	const element = document.getElementById("more_product_info");
	if (element) {
		window.scrollTo({
			top: element.offsetTop,
			behavior: "smooth",
		});
	}
};

const ProductContent: FC<ProductContentProps> = ({ product }) => {
	const {addItem, toggle} = useCart()
	const { title, in_stock, price, description, additional_info } = product;

	const handleAdd = () => {
		addItem(product, 1)
		toggle()
	}

	const scrollElementExists =
		!!additional_info?.weight ||
		!!additional_info?.composition ||
		!!additional_info?.note ||
		!!additional_info?.producer ||
		!!additional_info?.weight;

	return (
		<div className="lg:basis-1/2 flex flex-col gap-5 sm:w-full">
			<div>
				<h1 className="font-bold text-h1 leading-tight mb-2">{title}</h1>
				<p
					className={classNames(
						in_stock ? "text-neutral-green" : "text-neutral-red",
						"font-medium text-h4"
					)}
				>
					{in_stock ? "Skladem" : "Momentálně nedostupné"}
				</p>
			</div>

			<Price className="text-h2 font-bold" amount={price} />

			<Button onClick={handleAdd} className="flex items-center gap-2" disabled={!in_stock}>
				<ShoppingBagIcon className="w-5 h-5" />
				<span className="font-medium">Přidat do košíku</span>
			</Button>

			{!!description && <span dangerouslySetInnerHTML={{ __html: description }} />}
			<button onClick={() => scrollTo(scrollElementExists)} className="w-fit">
				<span className="font-bold hover:underline">Více informací</span>
			</button>
		</div>
	);
};

export default ProductContent;
