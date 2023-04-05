import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar/Navbar";
import NextRouterLoader from "@/components/atoms/NextRouterLoader";
import Footer from "@/components/footer/Footer";
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";
import { CartProvider } from "@/context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
	const { Drawer, Input, FormLabel, FormError, Form, Select, Checkbox, Radio, Alert, Textarea } = chakraTheme.components;

	const theme = extendBaseTheme({
		fonts: {
			body: `'Poppins', sans-serif`,
		},
		components: {
			Drawer,
			Input,
			FormLabel,
			FormError,
			Form,
			Select,
			Checkbox,
			Radio,
			Alert,
			Textarea
		},
	});
	return (
		<>
			<CartProvider>
				<ChakraBaseProvider theme={theme}>
					<Navbar />
					<main className="min-h-screen">
						<Component {...pageProps} />
					</main>
					<Footer />
					<NextRouterLoader />
				</ChakraBaseProvider>
			</CartProvider>
		</>
	);
}
