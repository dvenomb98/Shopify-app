import { fallbackIMG } from "@/consts/fallbacks";
import { createSlug} from "@/utils/routerUtils";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { FC } from "react";
import { Collection } from "shopify-buy";
import InternalLink from "../atoms/InternalLink";

interface CollectionCardProps {
  item: Collection;
}

const CollectionCard: FC<CollectionCardProps> = ({ item }) => {
  if (!item) return null;

  const { title, handle } = item;

  const slug = `/${(handle)}`;
  const imageURL = item?.image?.src;
  const imageALT = item?.image?.altText;

  return (
    <InternalLink href={slug} removeClassNames className="cursor-pointer">
      <div className="w-full aspect-square relative overflow-hidden group">
        <Image
          src={imageURL || fallbackIMG.src}
          alt={imageALT || fallbackIMG.alt}
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
