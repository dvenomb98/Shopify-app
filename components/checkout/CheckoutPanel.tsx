import { FormStatus } from "@/consts/globals";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import React, { FC } from "react";
import { Button } from "../atoms/Button";
import FormCheckbox from "../form/Checkbox";
import CheckoutDelivery from "./CheckoutDelivery";
import CheckoutOrder from "./CheckoutOrder";
import CheckoutPayment from "./CheckoutPayment";

export const boxStyles = " border border-default-color rounded-md p-4 flex flex-col gap-4";

interface CheckoutPanelProps {
	status: FormStatus;
}

const CheckoutPanel: FC<CheckoutPanelProps> = ({ status }) => {
	const { isSubmitting } = useFormikContext();

	return (
		<div className="lg:basis-1/3 flex flex-col gap-5">
			<h4 className="font-bold text-h3">Vaše objednávka</h4>
			<CheckoutOrder />
			<CheckoutDelivery />
			<CheckoutPayment />
			<FormCheckbox
				name="consent"
				label="Přečetl/a jsem si obchodní podmínky a souhlasím s nimi"
				helperText="Kliknutím na tlačítko „odeslat objednávku“ potvrzujete objednávku a zavazujete se k odebrání a zaplacení zvoleného zboží. Potvrzením objednávky uzavíráte kupní smlouvu, jejíž obsah je dán ochrana osobních údajů."
			/>
			{status === FormStatus.ERROR && (
				<Alert status="error">
					<AlertIcon />
					Vyskytla se chyba při vytvoření objednávky. Zkuste to prosím později. 
				</Alert>
			)}
			<Button disabled={isSubmitting} loading={isSubmitting} type="submit" role="link">
				Odeslat objednávku
			</Button>
		</div>
	);
};

export default CheckoutPanel;
