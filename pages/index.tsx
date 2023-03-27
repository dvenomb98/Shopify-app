import InternalLink from "@/components/atoms/InternalLink";
import PageBanner from "@/components/header/PageBanner";
import PageLayout from "@/components/layouts/PageLayout";
import ProductsLayout from "@/components/layouts/ProductsLayout";
import CollectionCard from "@/components/products/CollectionCard";
import { Collection } from "@/types/types";
import { fetchAllCollections } from "@/utils/fetchUtils";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { NextPage } from "next";
import React  from "react"

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
        <ProductsLayout gridVariant="flex">
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
  const collections: Collection[] = await fetchAllCollections()

  return {
   props: {
    collections: collections
  },
  revalidate: 200
 };
};



