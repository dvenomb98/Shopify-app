import useFieldValidation from "@/hooks/useValidation";
import { Form, Formik } from "formik";
import React, { FC, useState } from "react";
import * as yup from "yup";
import FormInput from "../form/Input";
import { Alert, Textarea } from "@chakra-ui/react";
import { Button } from "../atoms/Button";
import axios from "axios";
import { FormStatus } from "@/consts/globals";

const initialValues = {
	email: "",
	fullname: "",
	subject: "",
	message: "",
};

const ContactForm: FC = () => {
	const { yupField } = useFieldValidation();
	const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.UNSENT);

	const validationSchema = yup.object().shape({
		email: yupField.email,
		fullname: yupField.string,
		subject: yupField.string,
		message: yupField.string,
	});

	return (
		<div className="flex flex-col gap-5">
			<h2 className="text-h2 font-medium">Kontaktní formulář</h2>
		<Formik
			initialValues={initialValues}
			onSubmit={async (values, { resetForm }) => {
				try {
					const res = await axios.post("/api/send-email", values);
					if (res.status === 200) {
						setFormStatus(FormStatus.SUCCESS);
						resetForm();
					} else setFormStatus(FormStatus.ERROR);
				} catch {
					setFormStatus(FormStatus.ERROR);
				}
			}}
			validationSchema={validationSchema}
		>
			{({ isSubmitting }) => (
				<Form className="flex flex-col gap-5">
					<FormInput name="fullname" label="Jméno a příjmení" />
					<FormInput name="email" label="Email" />
					<FormInput name="subject" label="Předmět zprávy" />
					<FormInput as={Textarea} name="message" label="Předmět zprávy" />
					{formStatus === FormStatus.ERROR && (
						<Alert status="error">Nastala chyba při odesílání. Zkuste to prosím později.</Alert>
					)}
					{formStatus === FormStatus.SUCCESS && (
						<Alert status="success">Zpráva úspěšně odeslána.</Alert>
					)}
					<Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
						Odeslat
					</Button>
				</Form>
			)}
		</Formik>
		</div>
	);
};

export default ContactForm;
