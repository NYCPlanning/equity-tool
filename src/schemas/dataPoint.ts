import { object, string, boolean, number, InferType } from "yup";

export const dataPointSchema = object({
  value: number().required(),
  name: string().required(),
  type: string().required(),
  isReliable: boolean().optional(),
});

export type DataPoint = InferType<typeof dataPointSchema>;
