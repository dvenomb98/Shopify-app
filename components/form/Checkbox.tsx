import React from "react";
import { useField } from "formik";
import {
	FormControl,
	FormErrorMessage,
	Checkbox,
	CheckboxProps,
	FormHelperText,
} from "@chakra-ui/react";

interface FormCheckboxProps extends CheckboxProps {
	name: string;
	label: string;
	helperText?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label, helperText, ...props }) => {
	const [field, meta] = useField({ name });
	const errorText = meta.error && meta.touched ? meta.error : "";
	const id = `${name}-${field.name}`;

	return (
		<FormControl id={id} isInvalid={!!errorText}>
			<Checkbox id={id} {...field} {...props}>
				{!!label && <span className="font-medium">{label}</span>}
			</Checkbox>
			{!!helperText && (
				<FormHelperText>
					<span className="text-small">{helperText}</span>
				</FormHelperText>
			)}

			<FormErrorMessage>{errorText}</FormErrorMessage>
		</FormControl>
	);
};

export default FormCheckbox;
