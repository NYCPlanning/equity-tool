import { object, string, array, boolean, InferType } from "yup";
import { cellsSchema } from "./cells";

export const rowSchema = object({
  label: string().required(),
  cells: cellsSchema,
  isDenominator: boolean().optional(),
  placeholder: string().optional(),
});

export type Row = InferType<typeof rowSchema>;
