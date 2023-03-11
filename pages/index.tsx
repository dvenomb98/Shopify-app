import InternalLink from "@/components/atoms/InternalLink";
import PageBanner from "@/components/header/PageBanner";
import PageLayout from "@/components/layouts/PageLayout";
import ProductsLayout from "@/components/layouts/ProductsLayout";
import CollectionCard from "@/components/products/CollectionCard";
import { client, parseShopifyResponse } from "@/consts/shopifyClient";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { NextPage } from "next";
import React, { FC } from "react"
import { Collection } from "shopify-buy";

interface HomeProps {
  collections: Collection[]
}

const Home: NextPage<HomeProps> = ({collections}) => {

  return (
    <>
      <PageBanner />
      <PageLayout>
        <div className="flex justify-between items-center">
          <h2 className="text-h2 font-bold">Produkty</h2>
          <InternalLink
            href="/produkty"
            className="hover:underline"
            removeClassNames
          >
            <span className="flex items-center gap-1">
              Zobrazit všechny <ArrowRightIcon className="w-4 h-4" />
            </span>
          </InternalLink>
        </div>
        <ProductsLayout gridVariant="home">
          {collections?.map((item) => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </ProductsLayout>
      </PageLayout>
    </>
  );
};


export default Home;

export const getStaticProps = async () => {
  // Fetch all collections
  const collections: Collection[] = await client.collection.fetchAll()

  return {
   props: {
    collections: parseShopifyResponse(collections),
  },
  revalidate: 200
 };
};



