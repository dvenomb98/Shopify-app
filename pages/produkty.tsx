import PageHeader from "@/components/header/PageHeader";
import PageLayout from "@/components/layouts/PageLayout";
import ProductsLayout from "@/components/layouts/ProductsLayout";
import ProductCard from "@/components/products/ProductCard";
import SearchSidebar from "@/components/sidebar/SearchSidebar";
import { client, parseShopifyResponse } from "@/consts/shopifyClient";
import { CollectionsNavbar, ProductWithCategory } from "@/types/types";
import { NextPage } from "next";
import React from "react";
import { Collection } from "shopify-buy";

interface IndexProps {
  allCollections: CollectionsNavbar[];
  allProducts: ProductWithCategory[];
}

const Index: NextPage<IndexProps> = ({
  allCollections,
  allProducts,
}) => {
  return (
    <>
      <SearchSidebar collections={allCollections} />

      <PageLayout>
        <PageHeader
          title="Bread guy"
          description="Gummies ice cream tart lollipop pudding. Chocolate bar fruitcake pastry pudding cheesecake. Croissant soufflé topping bonbon cookie dragée. Sesame snaps candy canes toffee jelly candy topping cake candy candy canes."
        />

        <ProductsLayout className="lg:min-h-screen">
          {allProducts?.length ? (
            allProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Kategorie nenalezeny.</p>
          )}
        </ProductsLayout>
      </PageLayout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  try {
    // Fetch all collections with pro
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

    const allCollections = parseShopifyResponse(collectionsWithProducts)

    return {
      props: {
        allCollections: allCollections,
        allProducts: allProducts || [],
      },
      revalidate: 300,
    };
  } catch {
    return { notFound: true, revalidate: 300 };
  }
};
