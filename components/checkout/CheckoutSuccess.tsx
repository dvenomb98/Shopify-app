import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import React, { FC } from "react";

const CheckoutSuccess: FC = () => {
	return (
		<Alert
			status="success"
			variant="subtle"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			textAlign="center"
			height="200px"
			rounded="md"
		>
			<AlertIcon boxSize="40px" mr={0} />
			<AlertTitle mt={4} mb={1} fontSize="lg">
				Objednávka dokončena!
			</AlertTitle>
			<AlertDescription maxWidth="sm">
				Thanks for submitting your application. Our team will get back to you soon.
			</AlertDescription>
		</Alert>
	);
};

export default CheckoutSuccess;
