import { API, URLS } from "@/consts/globals";
import { CartItem } from "@/context/CartContext";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_KEY_SERVER);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { order, customer } = req.body;

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
                company: customer.company,
                IC: customer.IC,
                DIC: customer.DIC,
                name: `${customer.name} ${customer.surname}`,
                phone: customer.phone,
                address: customer.address,
                city: customer.city,
                postal_code: customer.PSC,
                country: customer.country,
              },
		});
        
        res.status(200).json({id: session.id})
	} catch (err: any) {
		res.status(err.statusCode || 500).json(err.message);	
	}
}
