import { client } from "@/consts/shopifyClient";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import { Product } from "shopify-buy";
import { parseShopifyResponse } from "@/consts/shopifyClient";
import { useRouter } from "next/router";

interface ProductProps {
  product: Product;
}

const Product: FC<ProductProps> = ({ product }) => {


  if (!product) return null;

  return (
  <div>Product : {product?.title}</div>
  )
};
export default Product;



export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }

  const singleProduct = await client.product.fetchByHandle(
    params.product as string
  );

  if (!singleProduct) {
    return { notFound: true };
  }

  return {
    props: {
      product: parseShopifyResponse(singleProduct),
    },
    revalidate: 60,
  };
};
