import { object, string, array, InferType, boolean } from "yup";
import { vintageSchema } from "@schemas/vintage";
import { footnoteSchema } from "./footnote";

export const indicatorRecordSchema = object({
  title: string().required(),
  footnote: footnoteSchema,
  id: string().nullable(),
  isSurvey: boolean().required(),
  vintages: array().of(vintageSchema).required(),
});

export type IndicatorRecord = InferType<typeof indicatorRecordSchema>;
