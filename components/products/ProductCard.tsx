import { fallbackIMG } from "@/consts/fallbacks";
import { ProductWithCategory } from "@/pages/produkty";
import Image from "next/image";
import React, { FC } from "react";
import CardButton from "../atoms/CardButton";
import InternalLink from "../atoms/InternalLink";
import Price from "../atoms/Price";


interface ProductCardProps {
  product: ProductWithCategory
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { title, handle, images, description, variants, category } = product;

  const featuredImage = images?.[0];
  const imageURL = featuredImage?.src || fallbackIMG.src;
  const imageALT = featuredImage?.altText || fallbackIMG.alt;
  const amount = variants?.[0]?.price.amount;
  const url = `/${category}/${handle}`

  return (
    <div className="flex gap-2 flex-col group">
      <InternalLink
        href={url}
        removeClassNames
        className="w-full aspect-square overflow-hidden relative rounded-lg"
      >
        <Image
          src={imageURL}
          alt={imageALT}
          fill
          className="w-full h-full object-cover rounded-sm"
          sizes="100vh, 100vw"
        />

        <CardButton  />
      </InternalLink>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold group-hover:underline">{title}</h3>
          <Price amount={amount} />
        </div>
        <p className="text-neutral-gray">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
