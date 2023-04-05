import { PhoneIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";
import { iconClasses } from "../footer/Footer";

const PhoneContact: FC = () => {
	return (
		<div className="badges-contact">
			<PhoneIcon className={iconClasses} />
			<div>
				<p className="font-medium">+ 420 774 500 143</p>
				<span className="text-neutral-gray">Volejte Po–Pá: 8:00–20:00</span>
			</div>
		</div>
	);
};

export default PhoneContact;
