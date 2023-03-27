import { useCart } from "@/context/CartContext";
import {
	Alert,
	AlertIcon,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { FC } from "react";
import CartButton from "./CartButton";
import CartContent from "./CartContent";
import CartFooter from "./CartFooter";

const Cart: FC = () => {
	const { isOpen, toggle, totalItemsInCart } = useCart();

	return (
		<>
			<CartButton />
			<Drawer isOpen={isOpen} placement="right" onClose={toggle} size="md">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />

					<DrawerHeader className="flex items-center gap-5">
						<ShoppingBagIcon className="w-8 h-8" />
						Nákupní košík
					</DrawerHeader>

					<DrawerBody className="flex flex-col gap-5">
						{!!totalItemsInCart ? (
							<CartContent />
						) : (
							<Alert status="warning">
								<AlertIcon />
								<span>
									Nemáte v košíku žádné položky. {""}
									<span onClick={toggle} className="underline cursor-pointer">
										Klikněte zde a pokračujte v nákupu.
									</span>
								</span>
							</Alert>
						)}
					</DrawerBody>

					{!!totalItemsInCart && <CartFooter />}
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Cart;
