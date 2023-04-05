import React, { FC } from "react";
import Container from "../layouts/Container";
import FooterContact from "./FooterContact";
import FooterInfo from "./FooterInfo";
import FooterAbout from "./FooterAbout";

export const boxClasses = "flex flex-col gap-5";
export const iconClasses = "w-8 h-8";
export const boxUlClasses = "flex flex-col gap-4";
export const headerClasses = "font-bold text-h4";

const Footer: FC = () => {
	return (
		<footer className="bg-neutral-graylight3 pt-16">
			<Container className="flex gap-32 sm:flex-col sm:gap-10">
				<FooterContact />
				<FooterInfo />
        <FooterAbout />
			</Container>
			<Container>
				<p className="text-center text-sm py-5 mt-5">
					Copyright © 2023 Daniel Bílek
				</p>
			</Container>
		</footer>
	);
};

export default Footer;
