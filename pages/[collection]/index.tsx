import Alert from "@/components/atoms/Alert";
import PageHeader from "@/components/header/PageHeader";
import PageLayout from "@/components/layouts/PageLayout";
import ProductsLayout from "@/components/layouts/ProductsLayout";
import ProductCard from "@/components/products/ProductCard";
import SearchSidebar from "@/components/sidebar/SearchSidebar";
import { client, parseShopifyResponse } from "@/consts/shopifyClient";
import { CollectionsNavbar, ProductWithCategory } from "@/types/types";
import { parseNavCollection } from "@/utils/dataUtils";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import { Collection, Product } from "shopify-buy";

interface CollectionProps {
  collection: Collection;
  allCollections: CollectionsNavbar[]
  products: ProductWithCategory[]
}

const Collection: FC<CollectionProps> = ({
  collection,
  allCollections,
  products,
}) => {
  const title = collection?.title;
  const description = collection?.descriptionHtml || collection?.description;

  return (
    <>
      <SearchSidebar collections={allCollections} />
      <PageLayout>
        <PageHeader title={title} description={description} />
        {products?.length ? (
          <ProductsLayout className="lg:min-h-screen">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsLayout>
        ) : (
          <Alert variant="info">Momentálně zde nemáme žádné produkty.</Alert>
        )}
      </PageLayout>
    </>
  );
};

export default Collection;

export const getStaticPaths: GetStaticPaths<any> = async () => {
  const collections = await client.collection.fetchAll();
  const parsedData: Collection[] = parseShopifyResponse(collections);

  const paths = parsedData.map((collection) => ({
    params: { collection: collection.handle },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
  try {
    if (!params) {
      return { notFound: true };
    }
    const collection = await client.collection.fetchByHandle(
      params.collection as string
    );

    if (!collection) {
      return { notFound: true };
    }
    // FETCH DATA REQUIRED FOR NAVBAR
    const allCollections = await client.collection.fetchAll();
    const parsedAllCollections = parseNavCollection(allCollections)

    // Parse category and add products category handle
    const parsedCollection : Collection = parseShopifyResponse(collection);
    const products = parsedCollection.products.map(product => ({...product, category: collection.handle}))

    return {
      props: {
        collection: parsedCollection,
        allCollections: parsedAllCollections,
        products: products
      },
      revalidate: 180,
    };
  } catch {
    return { notFound: true, revalidate: 180 };
  }
};
