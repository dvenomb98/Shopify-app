import ViewAllProducts from "@/components/atoms/ViewAllProducts";
import PageBanner from "@/components/header/PageBanner";
import PhotosWrapper from "@/components/instagram/PhotosWrapper";
import CardsLayout from "@/components/layouts/CardLayouts";
import PageLayout from "@/components/layouts/PageLayout";
import CollectionCard from "@/components/products/CollectionCard";
import { Collection, InstagramPhoto } from "@/types/types";
import { fetchAllCollections, fetchInstagramPhotos } from "@/utils/fetchUtils";
import { NextPage } from "next";
import React from "react"

interface HomeProps {
  collections: Collection[]
  instagramPhotos: InstagramPhoto[]
}

const Home: NextPage<HomeProps> = ({collections, instagramPhotos}) => {

  return (
    <>
      {/* <PageBanner /> */}
      <PageLayout>
        <div className="flex justify-between items-center">
          <h2 className="text-h2 font-bold">Produkty</h2>
          <ViewAllProducts />
        </div>

        <CardsLayout gridVariant="three_cols">
          {collections?.map((item) => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </CardsLayout>

        <PhotosWrapper photos={instagramPhotos} />
      </PageLayout>
    </>
  );
};


export default Home;

export const getStaticProps = async () => {
  // Fetch all collections
  const collections: Collection[] = await fetchAllCollections()
  const instagramPhotos = await fetchInstagramPhotos(6)

  return {
   props: {
    collections: collections,
    instagramPhotos: instagramPhotos
  },
  revalidate: 200
 };
};



