export enum Country {
	CZECH = "cs",
	SLOVAKIA = "sk",
}

export enum PaymentMethod {
	CARD = "card",
	CASH = "cash",
}

export enum Delivery {
	PICK_UP = "pick_up",
}

export const CountryOptions = [
	{ label: "Česká republika", value: Country.CZECH },
	{ label: "Slovenská republika", value: Country.SLOVAKIA },
];
