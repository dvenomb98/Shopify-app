import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import { parseNavCollection } from "@/utils/dataUtils";
import { CollectionsNavbar, Product } from "@/types/types";
import SearchSidebar from "@/components/sidebar/SearchSidebar";
import PageLayout from "@/components/layouts/PageLayout";
import ArrowBack from "@/components/atoms/ArrowBack";
import Container from "@/components/layouts/Container";
import { fetchAllCollections, fetchAllProducts, fetchProductBySlug } from "@/utils/fetchUtils";
import ProductContent from "@/components/products/ProductContent";
import ProductImages from "@/components/products/ProductImages";
import AdditionalInfo from "@/components/products/AdditionalInfo";

interface ProductProps {
	product: Product;
	allCollections: CollectionsNavbar[];
}

const Product: FC<ProductProps> = ({ product, allCollections }) => {
	if (!product) return null;

	const { title, images, additional_info } = product;
	const { composition, allergens, note, producer, weight } = additional_info;
	const hideInfo = !(composition && allergens && note && producer && weight);

	return (
		<>
			<SearchSidebar collections={allCollections} />
			<Container className="pt-5">
				<ArrowBack />
			</Container>
			<PageLayout className="pt-5">
				<div className="flex justify-between items-start gap-10 sm:flex-col">
					{/* IMAGE */}
					<ProductImages images={images} title={title} />
					{/* CONTENT */}
					<ProductContent product={product} hideInfo={hideInfo} />
				</div>
				{/* ADDITIONAL INFO */}
				{!hideInfo && <AdditionalInfo additionalInfo={additional_info} />}
			</PageLayout>
		</>
	);
};
export default Product;

export const getStaticPaths: GetStaticPaths<any> = async () => {
	const products = await fetchAllProducts();

	const paths = products.map((product) => ({
		params: { slug: product.slug },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
	try {
		if (!params) {
			return { notFound: true };
		}

		const singleProduct = await fetchProductBySlug(params.slug as string);

		if (!singleProduct) {
			return { notFound: true };
		}

		// FETCH DATA REQUIRED FOR NAVBAR
		const allCollections = await fetchAllCollections();

		return {
			props: {
				allCollections: parseNavCollection(allCollections),
				product: singleProduct,
			},
			revalidate: 60,
		};
	} catch {
		return { notFound: true, revalidate: 60 };
	}
};
