import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";

const CheckoutHidden: FC = () => {
	return (
		<Alert
			status="warning"
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
				Nemáte žádné položky v košíku
			</AlertTitle>
			<AlertDescription maxWidth="sm">
				Podívejte se na aktuální nabídku produktů{" "}
				<Link href="/produkty" className="underline">
					zde.
				</Link>
			</AlertDescription>
		</Alert>
	);
};

export default CheckoutHidden;
