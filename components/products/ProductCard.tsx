import { fallbackIMG } from "@/consts/fallbacks";
import { URLS } from "@/consts/globals";
import { Product } from "@/types/types";
import Image from "next/image";
import React, { FC } from "react";
import CardButton from "../atoms/CardButton";
import InternalLink from "../atoms/InternalLink";
import Price from "../atoms/Price";

interface ProductCardProps {
	product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const { title, slug, images, price } = product;

	const featuredImage = images?.[0] || fallbackIMG.src;
	const url = `${URLS.PRODUCTS}/${slug}`;

	return (
		<div className="flex gap-2 flex-col group">
			<InternalLink
				href={url}
				removeClassNames
				className="w-full aspect-square overflow-hidden relative rounded-lg"
       
			>
				<Image
					src={featuredImage}
					alt={title}
					fill
					className="w-full h-full object-cover rounded-sm"
					sizes="100vh, 100vw"
				/>

   
      <CardButton product={product} />
  
			</InternalLink>
			<div className="flex flex-col gap-2 p-2">
				<div className="flex items-start justify-between">
					<h3 className="font-bold text-h4 group-hover:underline">{title}</h3>
					<Price amount={price} />
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
