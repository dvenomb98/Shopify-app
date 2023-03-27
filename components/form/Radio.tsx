import React from "react";

import { FormControl, Radio, RadioProps, FormHelperText } from "@chakra-ui/react";

interface FormRadioProps extends RadioProps {
	label: string;
	helperText?: string;
}

const FormRadio: React.FC<FormRadioProps> = ({ name, label, helperText, ...props }) => {
	return (
		<FormControl>
			<Radio {...props}>{!!label && <span className="font-medium">{label}</span>}</Radio>
			{!!helperText && (
				<FormHelperText>
					<span className="text-small">{helperText}</span>
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default FormRadio;
