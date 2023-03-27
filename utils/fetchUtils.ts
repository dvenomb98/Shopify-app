import { CartItem } from "@/context/CartContext";
import { InitialValues } from "@/pages/checkout";
import { Collection, Product } from "@/types/types";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
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

export const createOrder = async (values: InitialValues, items: CartItem[]): Promise<boolean> => {
	try {
		const modifiedValues = {
			customer: values,
			id: nanoid(),
			order: items
		};

		if(!items?.length) {
			throw Error("Nemáte v košíku žádné položky.")
		}
		await setDoc(doc(db, FirebaseDocs.ORDERS, modifiedValues.id), modifiedValues);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};
