import React from "react";
import { useField } from "formik";
import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from "@chakra-ui/react";

interface FormSelectProps extends SelectProps {
	name: string;
	label: string;
	options: {
		value: any
		label: string
	}[];
}

const FormSelect: React.FC<FormSelectProps> = ({ name, label, options, ...props }) => {
	const [field, meta] = useField({ name });
	const errorText = meta.error && meta.touched ? meta.error : "";
	const id = `${name}-${field.name}`;

	if (!options?.length) return null;

	return (
		<FormControl id={id} isInvalid={!!errorText}>
			{!!label && <FormLabel htmlFor={id}>{label}</FormLabel>}
			<Select id={id} {...field} {...props}>
				{options.map(({ label, value }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</Select>
			<FormErrorMessage>{errorText}</FormErrorMessage>
		</FormControl>
	);
};

export default FormSelect;
