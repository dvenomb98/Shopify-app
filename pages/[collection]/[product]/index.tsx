import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC, useState } from "react";
import { Product } from "shopify-buy";
import { client, parseShopifyResponse } from "@/consts/shopifyClient";
import { parseNavCollection } from "@/utils/dataUtils";
import { CollectionsNavbar } from "@/types/types";
import SearchSidebar from "@/components/sidebar/SearchSidebar";
import PageLayout from "@/components/layouts/PageLayout";
import Image from "next/image";
import { fallbackIMG } from "@/consts/fallbacks";
import { Button } from "@/components/atoms/Button";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Price from "@/components/atoms/Price";
import classNames from "classnames";
import ArrowBack from "@/components/atoms/ArrowBack";
import Container from "@/components/layouts/Container";

interface ProductProps {
  product: Product;
  allCollections: CollectionsNavbar[];
}

const Product: FC<ProductProps> = ({ product, allCollections }) => {
  if (!product) return null;

  const { title, descriptionHtml, variants, images, availableForSale } =
    product;

  const [featuredImage, setFeaturedImage] = useState(images[0]);

  const { amount } = variants[0].price;

  return (
    <>
      <SearchSidebar collections={allCollections} />
      <Container className="pt-5">
        <ArrowBack />
      </Container>
      <PageLayout>
        <div className="flex justify-between items-start gap-10 sm:flex-col">
          {/* IMAGE */}
          <div className="lg:basis-1/2 sm:w-full flex flex-col gap-2">
            <div className="relative w-full overflow-hidden rounded-md max-h-[600px] aspect-square">
              <Image
                src={featuredImage?.src || fallbackIMG?.src}
                alt={featuredImage?.altText || fallbackIMG.alt}
                fill
                className="w-full h-full object-cover"
                sizes="100vh, 100vw"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {images.length > 1 && images?.map((image) => {
                return (
                  <Image
                    key={image.src}
                    onClick={() => featuredImage?.src === image.src ? undefined : setFeaturedImage(image)}
                    src={image?.src}
                    alt={image?.altText || title}
                    className=" aspect-square rounded-md cursor-pointer object-cover"
                    width={100}
                    height={100}
                  />
                );
              })}
            </div>
          </div>
          {/* CONTENT */}
          <div className="lg:basis-1/2 flex flex-col gap-5 sm:w-full">
            <div>
              <h1 className="font-bold text-header leading-tight sm:text-h1 mb-2">
                {title}
              </h1>
              <p
                className={classNames(
                  availableForSale ? "text-neutral-green" : "text-neutral-red"
                )}
              >
                {availableForSale ? "Skladem" : "Momentálně nedostupné"}
              </p>
            </div>

            <Price className="text-h2 font-bold" amount={amount} />

            <Button
              className="flex items-center gap-2"
              disabled={!availableForSale}
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span className="font-medium">Přidat do košíku</span>
            </Button>

            {!!descriptionHtml && (
              <span dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            )}
          </div>
        </div>
      </PageLayout>
    </>
  );
};
export default Product;

export const getStaticPaths: GetStaticPaths<any> = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
  try {
    if (!params) {
      return { notFound: true };
    }

    const singleProduct = await client.product.fetchByHandle(
      params.product as string
    );

    if (!singleProduct) {
      return { notFound: true };
    }

    // FETCH DATA REQUIRED FOR NAVBAR
    const allCollections = await client.collection.fetchAll();
    const parsedAllCollections = parseNavCollection(allCollections);

    console.log(singleProduct);

    return {
      props: {
        allCollections: parsedAllCollections,
        product: parseShopifyResponse(singleProduct),
      },
      revalidate: 60,
    };
  } catch {
    return { notFound: true, revalidate: 60 };
  }
};
