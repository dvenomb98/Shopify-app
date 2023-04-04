import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import * as admin from "firebase-admin";
import { DeliveryStatus  } from "@/consts/globals";

const serviceAccount = require("../../permissions.json");
const app = !admin.apps.length
	? admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
	: admin.app();
const stripe = require("stripe")(process.env.STRIPE_KEY_SERVER);
const endpointSecret = process.env.STRIPE_CLI_SECRET;

const fullfillOrder = async (session: any) => {
	const { metadata, amount_total, line_items, id } = session;
	const { customer, delivery, payment_method, pickupdate } = metadata;

	return app
		.firestore()
		.collection("orders")
		.doc(id)
		.set({
			amount: amount_total / 100,
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
			id: id,
			order: line_items.data.map(({ quantity, price }: any) => ({
				quantity,
				product_id: price.product,
			})),
			customer: JSON.parse(customer),
			delivery,
			payment_method,
			pickupdate,
			delivered: DeliveryStatus.PENDING
		});
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const requestBuffer = await buffer(req);
		const payload = requestBuffer.toString();
		const sig = req.headers["stripe-signature"];

		let event;

		// Verify that the event comes from stripe
		try {
			event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		} catch (err: any) {
			res.status(err.statusCode || 400).json(`Webhook error: ${err.message}`);
		}

		// Handle the checkout session event

		if (event.type === "checkout.session.completed") {
			const session = event.data.object;

			const sessionWithLineItems = await stripe.checkout.sessions.retrieve(session.id, {
				expand: ["line_items"],
			});

			return fullfillOrder(sessionWithLineItems)
				.then(() => res.status(200))
				.catch((err) => res.status(err.statusCode || 500).send(`Webhook error: ${err.message}`));
		}
	} else {
		res.status(404).json({ message: "Method does not exists. Only POST is allowed" });
	}
}

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
