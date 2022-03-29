import { object, string, array, InferType, boolean } from "yup";
import { vintageSchema } from "@schemas/vintage";

export const indicatorRecordSchema = object({
  title: string().required(),
  isSurvey: boolean().required(),
  vintages: array().of(vintageSchema).required(),
});

export type IndicatorRecord = InferType<typeof indicatorRecordSchema>;
