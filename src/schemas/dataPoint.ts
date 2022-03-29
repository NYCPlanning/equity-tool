import { object, string, number, InferType } from "yup";

export const dataPointSchema = object({
  value: number().nullable().defined(),
  measure: string()
    .oneOf(["COUNT", "PERCENT", "RATE", "INDEX", "MEDIAN"])
    .required(),
  variance: string().oneOf(["NONE", "MOE", "CV"]).required(),
});

export type DataPoint = InferType<typeof dataPointSchema>;
