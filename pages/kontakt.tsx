import AdressContact from "@/components/atoms/AdressContact";
import EmailContact from "@/components/atoms/EmailContact";
import PhoneContact from "@/components/atoms/PhoneContact";
import ContactForm from "@/components/contact/ContactForm";
import PageHeader from "@/components/header/PageHeader";
import PageLayout from "@/components/layouts/PageLayout";
import MapLocation from "@/components/map/MapLocation";
import classNames from "classnames";
import { NextPage } from "next";
import React from "react";

const flex_col_gap_5 = "flex flex-col gap-5";

const Contact: NextPage = () => {
	return (
		<PageLayout>
			<PageHeader title="Kontakujte nás" />
			<div className="flex gap-10 items-center sm:flex-col-reverse">
				<div className="lg:basis-1/2 sm:w-full">
					<ContactForm />
				</div>

				<div className={classNames(flex_col_gap_5, "lg:basis-1/2 sm:w-full")}>
					<div className={flex_col_gap_5}>
						<h4 className="text-h4 font-medium">Kde nás najdete?</h4>
						<AdressContact />
					</div>

					<MapLocation />

					<div className={flex_col_gap_5}>
						<h4 className="text-h4 font-medium">Chcete se na něco zeptat?</h4>
						<PhoneContact />
						<EmailContact />
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default Contact;
