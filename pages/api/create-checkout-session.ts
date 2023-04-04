import {  URLS } from "@/consts/globals";
import { CartItem } from "@/context/CartContext";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_KEY_SERVER);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { customer, order, delivery, payment_method, pickupdate } = req.body

		const line_items = order.map((item: CartItem) => ({
			price: item.product.price_id,
			quantity: item.quantity
		}))

		// Create Checkout Sessions from body params.
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],	
            customer_email: customer.email,
			line_items: line_items,
			billing_address_collection: "auto",
			mode: "payment",
			success_url: `${process.env.HOST}${URLS.SUCCESS}`,
			cancel_url: `${process.env.HOST}${URLS.CANCELED}`,
			metadata: {
                customer: JSON.stringify(customer),
				delivery,
				payment_method,
				pickupdate
              },
		});
        
        res.status(200).json({id: session.id})
	} catch (err: any) {
		res.status(err.statusCode || 500).json(err.message);	
	}
}
