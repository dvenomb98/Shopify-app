import CheckoutHidden from "@/components/checkout/CheckoutHidden";
import CheckoutInputs from "@/components/checkout/CheckoutInputs";
import CheckoutPanel from "@/components/checkout/CheckoutPanel";
import CheckoutSuccess from "@/components/checkout/CheckoutSuccess";
import PageHeader from "@/components/header/PageHeader";
import PageLayout from "@/components/layouts/PageLayout";
import { Country, Delivery, PaymentMethod } from "@/consts/checkout";
import { API, FormStatus, URLS } from "@/consts/globals";
import { CartItem, useCart } from "@/context/CartContext";
import useFieldValidation from "@/hooks/useValidation";
import { createOrder } from "@/utils/fetchUtils";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

export interface CreateOrder {
	customer: Pick<InitialValues, "customer">;
	order: CartItem[];
	delivery: Delivery;
	payment_method: PaymentMethod;
	pickupdate: string | Date;
}

export interface InitialValues {
	customer: {
		name: string;
		surname: string;
		company: string;
		IC: number | null;
		DIC: number | null;
		country: Country;
		address: string;
		city: string;
		PSC: number | null;
		phone: string;
		email: string;
		consent: boolean;
	};
	delivery: Delivery;
	payment_method: PaymentMethod;
	pickupdate: Date | string;
}

const initialValues: InitialValues = {
	customer: {
		name: "",
		surname: "",
		company: "",
		IC: null,
		DIC: null,
		country: Country.CZECH,
		address: "",
		city: "",
		PSC: null,
		phone: "",
		email: "",
		consent: false,
	},
	pickupdate: "",
	payment_method: PaymentMethod.CARD,
	delivery: Delivery.PICK_UP,
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY_CLIENT as string);

const Checkout: NextPage = () => {
	const { yupField, yupFieldEnum } = useFieldValidation();
	const { cartItems, clearCart , totalPrice} = useCart();
	const [status, setStatus] = useState<FormStatus>(FormStatus.UNSENT);
	const { query, push } = useRouter();
	const { success, canceled } = query;

	const hideCheckout = !cartItems.length && !success;

	const validationSchema = yup.object().shape({
		customer: yup.object().shape({
			name: yupField.string,
			email: yupField.string,
			surname: yupField.string,
			company: yupField.stringOptional,
			IC: yupField.positiveNumber,
			DIC: yupField.positiveNumber,
			country: yupFieldEnum(Country),
			address: yupField.string,
			city: yupField.string,
			PSC: yupField.positiveNumberReq,
			phone: yupField.positiveNumber,
			consent: yupField.checkbox,
		}),
		payment_method: yupFieldEnum(PaymentMethod),
		delivery: yupFieldEnum(Delivery),
		pickupdate: yupField.date,
	});

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		if (success) {
			clearCart();
			setStatus(FormStatus.SUCCESS);
		}
		if (canceled) {
			setStatus(FormStatus.ERROR);
		}
	}, [query]);

	const createCheckoutSession = async (values: CreateOrder) => {
		try {
			const stripe = await stripePromise;
			if (!stripe) return;
			const { customer, order, delivery, payment_method, pickupdate } = values;

			const checkoutSession = await axios.post(API.CREATE_CHECKOUT, {
				customer,
				order,
				delivery,
				payment_method,
				pickupdate,
			});

			const result = await stripe.redirectToCheckout({
				sessionId: checkoutSession.data.id,
			});

			if (result.error) {
				setStatus(FormStatus.ERROR);
			}
		} catch (e) {
			console.error(e);
			setStatus(FormStatus.ERROR);
			return false;
		}
	};
	return (
		<PageLayout>
			<PageHeader title="Pokladna" />
			{hideCheckout ? (
				<CheckoutHidden />
			) : (
				<>
					{status !== FormStatus.SUCCESS ? (
						<Formik
							initialValues={initialValues}
							onSubmit={async (values) => {
								const { customer, delivery, payment_method, pickupdate } = values;
								if (values.payment_method === PaymentMethod.CASH) {
									const response = await createOrder({
										customer,
										order: cartItems,
										delivery,
										payment_method,
										pickupdate,	
										amount: totalPrice
									});
									if (response) {
										push(`${process.env.NEXT_PUBLIC_HOST}${URLS.SUCCESS}`)
										
									} else setStatus(FormStatus.ERROR);
								}
								if (values.payment_method === PaymentMethod.CARD) {
									await createCheckoutSession({
										customer,
										order: cartItems,
										delivery,
										payment_method,
										pickupdate,
										
									});
								}
							}}
							validationSchema={validationSchema}
						>
							<Form>
								<div className="flex gap-5 sm:flex-col">
									<CheckoutInputs />
									<CheckoutPanel status={status} />
								</div>
							</Form>
						</Formik>
					) : (
						<CheckoutSuccess />
					)}
				</>
			)}
		</PageLayout>
	);
};

export default Checkout;
