import { DeliveryStatus } from "@/consts/globals";
import { CreateOrder } from "@/pages/checkout";
import { Collection, Product , InstagramPhoto} from "@/types/types";
import axios from "axios";
import {
	collection,
	doc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { db } from "../firebase";

export enum FirebaseDocs {
	COLLECTIONS = "collection",
	PRODUCTS = "products",
	ORDERS = "orders",
}

export const fetchAllCollections = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, FirebaseDocs.COLLECTIONS));
		const docsArray = querySnapshot.docs.map((doc) => {
			return doc.data();
		});
		return docsArray as Collection[];
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const fetchCollectionBySlug = async (slug: string) => {
	try {
		const ref = collection(db, FirebaseDocs.COLLECTIONS);
		const q = query(ref, where("slug", "==", slug));
		const querySnapshot = await getDocs(q);
		const docsArray = querySnapshot.docs.map((doc) => {
			return doc.data();
		});
		// SLUG IS UNIQUE SO IT SHOULD ALWAYS RETURN ONLY SINGLE DOC!!
		return docsArray[0] as Collection;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

export const fetchAllProducts = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, FirebaseDocs.PRODUCTS));
		const docsArray = querySnapshot.docs.map((doc) => {
			return doc.data();
		});
		return docsArray as Product[];
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const fetchProductBySlug = async (slug: string) => {
	try {
		const ref = collection(db, FirebaseDocs.PRODUCTS);
		const q = query(ref, where("slug", "==", slug));
		const querySnapshot = await getDocs(q);
		const docsArray = querySnapshot.docs.map((doc) => {
			return doc.data();
		});
		// SLUG IS UNIQUE SO IT SHOULD ALWAYS RETURN ONLY SINGLE DOC!!
		return docsArray[0] as Product;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

export const createOrder = async (values: CreateOrder): Promise<boolean> => {
	try {
		if (!values.order?.length) {
			throw new Error("Nemáte v košíku žádné položky.");
		}

		const modifiedValues = {
			...values,
			customer: values.customer,
			order: values.order.map(({ quantity, product }: any) => ({
				quantity,
				product_id: product.id,
			})),
			id: nanoid(),
			timestamp: serverTimestamp(),
			delivered: DeliveryStatus.PENDING,
		};

		await setDoc(doc(db, FirebaseDocs.ORDERS, modifiedValues.id), modifiedValues);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};

export const fetchInstagramPhotos = async (count: number): Promise<InstagramPhoto[]> => {
	const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${process.env.INSTAGRAM_SECRET}&limit=${count}`;
	try {
		const response = await axios.get(url);
		const { data } = response;
		return data.data
	} catch (error) {
		console.error("Error fetching Instagram photos:", error);
		return [];
	}
};
