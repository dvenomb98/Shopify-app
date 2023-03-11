import Alert from "@/components/atoms/Alert";
import CategoryHeader from "@/components/header/CategoryHeader";
import PageLayout from "@/components/layouts/PageLayout";
import ProductsLayout from "@/components/layouts/ProductsLayout";
import ProductsPageLayout from "@/components/layouts/ProductsPageLayout";
import ProductCard from "@/components/products/ProductCard";
import SearchSidebar from "@/components/sidebar/SearchSidebar";
import { client, parseShopifyResponse } from "@/consts/shopifyClient";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import { Collection } from "shopify-buy";

interface CollectionProps {
  collection: Collection;
  allCollections: Collection[]
}

const Collection: FC<CollectionProps> = ({ collection, allCollections }) => {

  const products = collection?.products || []
  const title = collection?.title
  const description = collection?.descriptionHtml || collection?.description

  return (
    <PageLayout>
      <CategoryHeader  title={title} description={description} />
      <ProductsPageLayout>
        <SearchSidebar collections={allCollections} />
        <ProductsLayout
          gridVariant="products"
          className="lg:basis-4/5 lg:pl-5 sm:w-full lg:min-h-screen"
        >
          {products?.length ? (
            products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <Alert variant="info">Momentálně zde nemáme žádné produkty.</Alert>
          )}
        </ProductsLayout>
      </ProductsPageLayout>
    </PageLayout>
  );
};

export default Collection

export const getStaticPaths: GetStaticPaths<any> = async () => {

  const collections = await client.collection.fetchAll();
  const parsedData: Collection[] = parseShopifyResponse(collections);

  const paths = parsedData.map((collection) => ({
    params: { collection: collection.handle },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }
  const collection = await client.collection.fetchByHandle(
    params.collection as string
  );

  if (!collection) {
    return { notFound: true };
  }

  const allCollections = await client.collection.fetchAll()

  const parsedCollection = parseShopifyResponse(collection);
  const parsedAllCollections = parseShopifyResponse(allCollections)


  return { props: { collection: parsedCollection, allCollections: parsedAllCollections }, revalidate: 180 };
};
