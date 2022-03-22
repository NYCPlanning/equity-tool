import { object, string, array, InferType } from "yup";
import { vintageSchema } from "@schemas/vintage";

export const indicatorRecordSchema = object({
  extends: string().optional(),
  label: string().required(),
  vintages: array().of(vintageSchema).required(),
});

export type IndicatorRecord = InferType<typeof indicatorRecordSchema>;
