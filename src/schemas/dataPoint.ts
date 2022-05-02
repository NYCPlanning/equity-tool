import { object, string, number, boolean, InferType } from "yup";

export const dataPointSchema = object({
  value: number().nullable().defined(),
  measure: string()
    .oneOf(["COUNT", "PERCENT", "RATE", "INDEX", "MEDIAN", "PERCENTAGE_POINT"])
    .required(),
  variance: string().oneOf(["NONE", "MOE", "CV"]).required(),
  isReliable: boolean().optional(),
  coding: string().oneOf(["TOP", "BOTTOM"]).optional(),
  scale: number().optional(),
});

export type DataPoint = InferType<typeof dataPointSchema>;
