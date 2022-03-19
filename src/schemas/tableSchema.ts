import { object, string, array, boolean, number, InferType } from "yup";

export const tableSchema = object({
  extends: string().optional(),
  label: string().required(),
  rows: array().of(string().required()),
  vintages: array().of(string().required()),
  cells: array().of(string().required()),
  hasDenominator: boolean().optional(),
  data: array()
    .of(array().of(object({}).noUnknown(false)))
    .optional(),
  headers: array().of(
    array().of(
      object({
        label: string().required(),
        colspan: number().required(),
      })
    )
  ),
  placeholder: string().optional(),
});

export type TableRecord = InferType<typeof tableSchema>;

export const tableListSchema = array().of(tableSchema);

export const categoryProfileSchema = object({
  tot: tableListSchema,
  anh: tableListSchema.optional(),
  bnh: tableListSchema.optional(),
  wnh: tableListSchema.optional(),
  hsp: tableListSchema.optional(),
});

export type CategoryProfile = InferType<typeof categoryProfileSchema>;
