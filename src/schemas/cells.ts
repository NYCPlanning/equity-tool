import { array, InferType } from "yup";
import { dataPointSchema } from "@schemas/dataPoint";

export const cellsSchema = array().of(dataPointSchema).nullable().defined();

export type Cells = InferType<typeof cellsSchema>;
