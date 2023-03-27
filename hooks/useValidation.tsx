import * as yup from "yup";

const required = "Vyžadováno";

const useFieldValidation = () => {
	const yupFieldEnum = (Enum: Record<string, string>) =>
		yup
			.mixed<keyof typeof Enum>()
			.oneOf(Object.values(Enum), "Vyberte jednu z možností")
			.nullable()
			.required(required);

	const yupField = {
		checkbox: yup.bool().oneOf([true], required),
		checkboxOptional: yup.bool(),
		string: yup.string().nullable().required(required),
		stringOptional: yup.string().nullable(),
		date: yup.date().required(required),
		email: yup.string().email("Neplatný formát emailové adresy").nullable().required(required),
		positiveNumber: yup
			.number()
			.typeError("Nevalidní hodnota. Zadejte prosím platné číslo.")
			.nullable()
			.positive("Nevalidní hodnota. Číslo musí být pozitivní"),

		positiveNumberReq: yup
			.number()
			.typeError("Nevalidní hodnota. Zadejte prosím platné číslo.")
			.nullable()
			.positive("Nevalidní hodnota. Číslo musí být pozitivní")
			.required(required),
	};

	return { yupField, yupFieldEnum };
};

export default useFieldValidation;
