import { Delivery } from "@/consts/checkout";
import { CartItem } from "@/context/CartContext";
import { InitialValues } from "@/pages/checkout";
import { PaymentMethod } from "@stripe/stripe-js";

export interface Collection {
	id: string;
	title: string;
	description: string;
	slug: string;
	image: string;
	products_id: string[];
}

export interface Product {
	id: string;
	title: string;
	short_description: string;
	description: string;
	slug: string;
	images?: string[];
	price: number;
	currency: string;
	in_stock: number;
	additional_info: ProductAdditionalInfo;
	price_id: string;
}

export interface ProductAdditionalInfo {
	weight?: number;
	composition?: string;
	allergens?: string;
	producer?: string;
	note?: string;
}

export interface CollectionsNavbar {
	title: string;
	slug: string;
}

export interface InstagramPhoto {
	id: string;
	caption: string;
	media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
	media_url: string;
	thumbnail_url?: string;
	permalink: string;
	timestamp: string;
  }

