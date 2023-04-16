import { fallbackIMG } from "@/consts/fallbacks";
import { URLS } from "@/consts/globals";
import { Collection } from "@/types/types";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { FC } from "react";
import InternalLink from "../atoms/InternalLink";

interface CollectionCardProps {
  item: Collection
}

const CollectionCard: FC<CollectionCardProps> = ({ item }) => {
  if (!item) return null;

  const { title, slug, image } = item;
 
  return (
    <InternalLink href={`${URLS.CATEGORY}/${slug}`} removeClassNames className="cursor-pointer">
      <div className="aspect-square relative overflow-hidden group h-full">
        <Image
          src={image || fallbackIMG.src}
          alt={title || fallbackIMG.alt}
          fill
          sizes="100vw, 100vh"
          className="rounded-lg w-full h-full object-cover"
        />

        <div className="product-overlay" />

        <p className="absolute bottom-5 left-5 text-white font-semibold text-h3 transform group-hover:-translate-y-5 duration-300 text-primary-white">
          {title}
        </p>
        <ArrowRightIcon className="w-5 h-5 absolute z-20 bottom-3 left-0 transform -translate-x-5 group-hover:translate-x-5 duration-300 text-primary-white" />
      </div>
    </InternalLink>
  );
};

export default CollectionCard;
