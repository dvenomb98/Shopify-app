import { Button } from "@/components/atoms/Button";
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

export interface InitialValues {
	name: string;
	surname: string;
	company: string;
	IC: number | undefined;
	DIC: number | undefined;
	country: Country;
	address: string;
	city: string;
	PSC: number | undefined;
	phone: number | undefined;
	email: string;
	payment_method: PaymentMethod;
	consent: boolean;
	delivery: Delivery;
}

const initialValues: InitialValues = {
	name: "",
	surname: "",
	company: "",
	IC: undefined,
	DIC: undefined,
	country: Country.CZECH,
	address: "",
	city: "",
	PSC: undefined,
	phone: undefined,
	email: "",
	payment_method: PaymentMethod.CARD,
	consent: false,
	delivery: Delivery.PICK_UP,
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY_CLIENT as string);

const Checkout: NextPage = () => {
	const { yupField, yupFieldEnum } = useFieldValidation();
	const { cartItems, clearCart } = useCart();
	const [status, setStatus] = useState<FormStatus>(FormStatus.UNSENT);
	const { query, push } = useRouter();
	const { success, canceled } = query;

	const validationSchema = yup.object().shape({
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
		delivery: yupFieldEnum(Delivery),
		payment_method: yupFieldEnum(PaymentMethod),
	});

	useEffect(() => {
		// Redirect user if cart is empty
		if (!cartItems?.length && !success) {
			push(URLS.PRODUCTS);
		}
	}, [query, cartItems]);

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

	const createCheckoutSession = async (customer: InitialValues, order: CartItem[]) => {
		try {
			const stripe = await stripePromise;
			if (!stripe) return;

			const checkoutSession = await axios.post(API.CREATE_CHECKOUT, {
				customer: customer,
				order: order,
			});

			const result = await stripe.redirectToCheckout({
				sessionId: checkoutSession.data.id,
			});

			if (result.error) {
				setStatus(FormStatus.ERROR);
			}
		} catch (e) {
			console.error(e);
			return false;
		}
	};
	return (
		<PageLayout>
			<PageHeader title="Pokladna" />

			<Formik
				initialValues={initialValues}
				onSubmit={async (values) => {
					if (values.payment_method === PaymentMethod.CASH) {
						const response = await createOrder(values, cartItems);
						if (response) {
							setStatus(FormStatus.SUCCESS);
							clearCart();
						} else setStatus(FormStatus.ERROR);
					}
					if (values.payment_method === PaymentMethod.CARD) {
						await createCheckoutSession(values, cartItems);
					}
				}}
				validationSchema={validationSchema}
			>
				<Form>
					{status !== FormStatus.SUCCESS ? (
						<div className="flex gap-5 sm:flex-col">
							<CheckoutInputs />
							<CheckoutPanel status={status} />
						</div>
					) : (
						<CheckoutSuccess />
					)}
				</Form>
			</Formik>
		</PageLayout>
	);
};

export default Checkout;
