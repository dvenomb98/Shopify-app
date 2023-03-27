import { URLS } from "@/consts/globals";
import { useCart } from "@/context/CartContext";
import {  DrawerFooter } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import Price from "../atoms/Price";
import { Button } from "../atoms/Button";

const CartFooter: FC = () => {
	const { totalPrice, toggle } = useCart();
	const { push } = useRouter();

	return (
		<DrawerFooter className="flex flex-col gap-5">
			<div className="flex w-full justify-between items-center">
				<span className="text-h4 font-medium">Mezisoučet:</span>
				<Price className="text-h4" amount={totalPrice} />
			</div>
			<div className="gap-5 flex w-full">
				<Button
					onClick={() => {
						toggle();
						push(URLS.CHECKOUT);
					}}
					width="full"
				>
					Přejít k platbě
				</Button>
				<Button width="full" variant="secondary" onClick={toggle}>
					Pokračovat v nákupu
				</Button>
			</div>
		</DrawerFooter>
	);
};

export default CartFooter;
