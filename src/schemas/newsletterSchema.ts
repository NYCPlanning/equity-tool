import * as Yup from "yup";

export const newsletterSchema = Yup.object({
  email: Yup.string()
    .default("")
    .email("Please enter a valid email address.")
    .required("This is a required field."),
}).required();

export type Newsletter = Yup.InferType<typeof newsletterSchema>;
