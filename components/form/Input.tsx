import React from "react";
import { useField } from "formik";
import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";

interface FormInputProps extends InputProps {
	name: string;
	label: string;
	isOptional?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ name, label, isOptional, ...props }) => {
	const [field, meta] = useField({ name });
	const errorText = meta.error && meta.touched ? meta.error : "";
	const id = `${name}-${field.name}`;

	console.log(errorText);

	return (
		<FormControl id={id} isInvalid={!!errorText}>
			{!!label && (
				<FormLabel htmlFor={id}>
					<>
						{label} {isOptional && <span className="text-neutral-gray font-normal">(nepovinné)</span>}
					</>
				</FormLabel>
			)}
			<Input id={id} {...field} {...props} />
			<FormErrorMessage>{errorText}</FormErrorMessage>
		</FormControl>
	);
};

export default FormInput;
