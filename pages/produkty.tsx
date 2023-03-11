import PageLayout from "@/components/layouts/PageLayout";
import ProductsLayout from "@/components/layouts/ProductsLayout";
import ProductsPageLayout from "@/components/layouts/ProductsPageLayout";
import ProductCard from "@/components/products/ProductCard";
import SearchSidebar from "@/components/sidebar/SearchSidebar";
import { client, parseShopifyResponse } from "@/consts/shopifyClient";
import { NextPage } from "next";
import React from "react";
import { Collection, Product } from "shopify-buy";

export interface ProductWithCategory extends Product {
  category?: Collection;
}

interface IndexProps {
  collectionsWithProducts: Collection[];
  allProducts: ProductWithCategory[];
}

const Index: NextPage<IndexProps> = ({
  collectionsWithProducts,
  allProducts,
}) => {
  
  return (
    <PageLayout>
      <ProductsPageLayout>
        <SearchSidebar collections={collectionsWithProducts} />
        <ProductsLayout
          gridVariant="products"
          className="lg:basis-4/5 lg:pl-5 sm:w-full lg:min-h-screen"
        >
          {allProducts?.length ? (
            allProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Kategorie nenalezeny.</p>
          )}
        </ProductsLayout>
      </ProductsPageLayout>
    </PageLayout>
  );
};

export default Index;

export const getStaticProps = async () => {
  // Fetch all collections
  const collectionsWithProducts =
    await client.collection.fetchAllWithProducts();

  const parsedResponse: Collection[] = parseShopifyResponse(
    collectionsWithProducts
  );

  if (!parsedResponse?.length) {
    return { notFound: true };
  }

  const allProducts = parsedResponse.flatMap((collection) => {
    return collection?.products.map((product) => {
      return {
        ...product,
        category: collection.handle,
      };
    });
  });

  return {
    props: {
      collectionsWithProducts: parsedResponse,
      allProducts: allProducts || [],
    },
    revalidate: 300,
  };
};
