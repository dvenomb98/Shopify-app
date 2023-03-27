import PageHeader from "@/components/header/PageHeader";
import PageLayout from "@/components/layouts/PageLayout";
import ProductsLayout from "@/components/layouts/ProductsLayout";
import ProductCard from "@/components/products/ProductCard";
import SearchSidebar from "@/components/sidebar/SearchSidebar";
import { CollectionsNavbar } from "@/types/types";
import { parseNavCollection } from "@/utils/dataUtils";
import { fetchAllCollections, fetchAllProducts, fetchCollectionBySlug } from "@/utils/fetchUtils";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import { Product, Collection } from "@/types/types";
import { Alert, AlertIcon } from "@chakra-ui/react";

interface CollectionProps {
	collection: Collection;
	allCollections: CollectionsNavbar[];
	products: Product[];
}

const Collection: FC<CollectionProps> = ({ collection, allCollections, products }) => {
	const title = collection?.title;
	const description = collection?.description;

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
					<Alert status="info">
						<AlertIcon />
						Momentálně zde nemáme žádné produkty.
					</Alert>
				)}
			</PageLayout>
		</>
	);
};

export default Collection;

export const getStaticPaths: GetStaticPaths<any> = async () => {
	const collections = await fetchAllCollections();

	const paths = collections.map((collection) => ({
		params: { slug: collection.slug },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
	try {
		if (!params) {
			return { notFound: true };
		}
		const collection = await fetchCollectionBySlug(params.slug as string);
		const allProducts = await fetchAllProducts();

		if (!collection) {
			return { notFound: true };
		}
		// FETCH DATA REQUIRED FOR NAVBAR
		const allCollections = await fetchAllCollections();

		const collectionProducts = collection.products_id.map(
			(productId) => allProducts.find((product) => product.id === productId) || {}
		);

		const parsedAllCollections = parseNavCollection(allCollections);

		return {
			props: {
				collection: collection,
				allCollections: parsedAllCollections,
				products: collectionProducts,
			},
			revalidate: 180,
		};
	} catch {
		return { notFound: true, revalidate: 180 };
	}
};
