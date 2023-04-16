import PageHeader from "@/components/header/PageHeader";
import CardsLayout from "@/components/layouts/CardLayouts";
import PageLayout from "@/components/layouts/PageLayout";
import ProductCard from "@/components/products/ProductCard";
import SearchSidebar from "@/components/sidebar/SearchSidebar";
import { CollectionsNavbar, Product } from "@/types/types";
import { parseNavCollection } from "@/utils/dataUtils";
import { fetchAllCollections, fetchAllProducts } from "@/utils/fetchUtils";
import { NextPage } from "next";
import React from "react";

interface IndexProps {
  allCollections: CollectionsNavbar[];
  allProducts: Product[];
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

        <CardsLayout>
          {allProducts?.length ? (
            allProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Kategorie nenalezeny.</p>
          )}
        </CardsLayout>
      </PageLayout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  try {
    // Fetch all collections with pro
    const collections = await fetchAllCollections()

    if (!collections?.length) {
      return { notFound: true };
    }

    const allProducts = await fetchAllProducts()

    return {
      props: {
        allCollections: parseNavCollection(collections),
        allProducts: allProducts || [],
      },
      revalidate: 300,
    };
  } catch {
    return { notFound: true, revalidate: 300 };
  }
};
