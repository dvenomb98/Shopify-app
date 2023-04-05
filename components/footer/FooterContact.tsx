import React, { FC } from "react";
import AdressContact from "../atoms/AdressContact";
import EmailContact from "../atoms/EmailContact";
import PhoneContact from "../atoms/PhoneContact";
import { boxClasses, headerClasses} from "./Footer";

const FooterContact: FC = () => {
	return (
		<div className={boxClasses}>
			<h4 className={headerClasses}>Chcete se na něco zeptat?</h4>
			<PhoneContact />
			<EmailContact />
      <AdressContact />
		</div>
	);
};

export default FooterContact;
