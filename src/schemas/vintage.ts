import { object, string, array, boolean, InferType } from "yup";
import { rowSchema } from "@schemas/row";
import { headerCellSchema } from "@schemas/headerCell";

export const vintageSchema = object({
  label: string().required(),
  placeholder: string().optional(),
  rows: array().of(rowSchema).required(),
  isChange: boolean().required(),
  headers: array().of(array().of(headerCellSchema).required()).required(),
});

export type Vintage = InferType<typeof vintageSchema>;
