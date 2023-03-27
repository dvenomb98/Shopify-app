import { PaymentMethod } from "@/consts/checkout";
import { RadioGroup } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import React, { FC } from "react";
import FormRadio from "../form/Radio";
import { boxStyles } from "./CheckoutPanel";

const CheckoutPayment: FC = () => {
	const { setFieldValue, values } = useFormikContext<any>();

	return (
		<div className={boxStyles}>
			Způsob úhrady
			<RadioGroup
				name="payment_method"
				defaultValue={values.payment_method}
				onChange={(value) => setFieldValue("payment_method", value)}
				className="flex flex-col gap-4"
			>
				<FormRadio
					label="Online kartou"
					value={PaymentMethod.CARD}
					helperText="Bezpečná úhrada Vaší objednávky pomocí platební karty."
				/>

				<FormRadio
					label="Hotově při vyzvednutí"
					helperText="Zaplatíte hotově při vyzvednutí objednávky"
					value={PaymentMethod.CASH}
				/>
			</RadioGroup>
		</div>
	);
};

export default CheckoutPayment;
