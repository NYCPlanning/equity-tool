import { object, string, number, InferType } from "yup";

export const headerCellSchema = object({
  label: string().required(),
  colspan: number().required(),
});

export type HeaderCell = InferType<typeof headerCellSchema>;
