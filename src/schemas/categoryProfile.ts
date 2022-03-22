import { object, array, InferType } from "yup";
import { indicatorRecordSchema } from "./indicatorRecord";

const indicatorRecordListSchema = array().of(indicatorRecordSchema);

export const categoryProfileSchema = object({
  tot: indicatorRecordListSchema,
  anh: indicatorRecordListSchema.optional(),
  bnh: indicatorRecordListSchema.optional(),
  wnh: indicatorRecordListSchema.optional(),
  hsp: indicatorRecordListSchema.optional(),
});

export type CategoryProfile = InferType<typeof categoryProfileSchema>;
