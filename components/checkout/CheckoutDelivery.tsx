import React from "react";
import FormCheckbox from "../form/Checkbox";
import { boxStyles } from "./CheckoutPanel";

const CheckoutDelivery = () => {
	return (
		<div className={boxStyles}>
			<h4>Místo doručení</h4>
			<FormCheckbox
				name="delivery"
				isChecked={true}
				onChange={() => undefined}
				label="Vyzvednutí na prodejně"
				helperText="Osobní vyzvednutí na prodejně na adrese Žitná 1621 00 Brno-Řečkovice a Mokrá Hora"
			/>
		</div>
	);
};

export default CheckoutDelivery;
