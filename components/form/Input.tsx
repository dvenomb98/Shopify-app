import React from "react";
import { useField } from "formik";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputProps } from "@chakra-ui/react";

interface FormInputProps extends InputProps {
	name: string;
	label: string;
	isOptional?: boolean;
	helperText?: string
}

const FormInput: React.FC<FormInputProps> = ({ name, label, isOptional, helperText, ...props }) => {
	const [field, meta] = useField({ name });
	const errorText = meta.error && meta.touched ? meta.error : "";
	const id = `${name}-${field.name}`;

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
			{!!helperText && <FormHelperText>{helperText}</FormHelperText>}
			<FormErrorMessage>{errorText}</FormErrorMessage>
		</FormControl>
	);
};

export default FormInput;
