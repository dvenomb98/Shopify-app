import { ProductAdditionalInfo } from "@/types/types";
import React, { FC } from "react";

interface InfoTextProps {
	label: string;
	value: string;
}

const InfoText: FC<InfoTextProps> = ({ label, value }) => (
	<div>
		<h4 className="font-bold">{label}:</h4>
		<span className="text-neutral-gray">{value}</span>
	</div>
);

interface AdditionalInfoProps {
	additionalInfo: ProductAdditionalInfo;
}

const AdditionalInfo: FC<AdditionalInfoProps> = ({ additionalInfo }) => {
	if (!additionalInfo) return null;

	const { composition, allergens, note, producer, weight } = additionalInfo;

	return (
		<div id="more_product_info" className="p-5 bg-neutral-graylight3 rounded-md">
			<h4 className="uppercase mb-5 text-primary-amber">Informace o produktu</h4>

			<div className="flex flex-col gap-5">
				{!!composition && <InfoText label="Složení" value={composition} />}
				{!!allergens && <InfoText label="Alergeny" value={allergens} />}
				{!!weight && <InfoText label="Váha" value={`${weight} g`} />}
				{!!producer && <InfoText label="Výrobce" value={producer} />}
				{!!note && <InfoText label="Poznámka" value={note} />}
			</div>
		</div>
	);
};

export default AdditionalInfo;
