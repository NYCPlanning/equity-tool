import { InferType, string } from "yup";

export const footnoteSchema = string().nullable();

export type Footnote = InferType<typeof footnoteSchema>;
