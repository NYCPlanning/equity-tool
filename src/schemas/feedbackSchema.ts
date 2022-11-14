import * as Yup from "yup";

export const feedbackSchema = Yup.object({
  name: Yup.string()
    .default("")
    .min(2, "Name must be at least 2 characters.")
    .required(),
  email: Yup.string()
    .default("")
    .email("Please enter a valid email address.")
    .required("This is a required field."),
  feedback: Yup.string()
    .default("")
    .min(12, "Feedback should be at least 12 characters.")
    .max(750, "Feedback should be no more than 750 characters.")
    .required(),
}).required();

export type Feedback = Yup.InferType<typeof feedbackSchema>;
