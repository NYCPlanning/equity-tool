import { object, string, array, boolean, InferType } from "yup";
import { dataPointSchema } from "@schemas/dataPoint";

export const rowSchema = object({
  label: string().required(),
  cells: array().of(dataPointSchema).nullable().defined(),
  isDenominator: boolean().optional(),
  placeholder: string().optional(),
});

export type Row = InferType<typeof rowSchema>;
