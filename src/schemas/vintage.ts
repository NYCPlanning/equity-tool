import { object, string, array, number, boolean, InferType } from "yup";
import { rowSchema } from "@schemas/row";

export const vintageSchema = object({
  label: string().required(),
  placeholder: string().optional(),
  rows: array().of(rowSchema).required(),
  isChange: boolean().required(),
  headers: array()
    .of(
      array()
        .of(
          object({
            label: string().required(),
            colspan: number().required(),
          })
        )
        .required()
    )
    .required(),
});

export type Vintage = InferType<typeof vintageSchema>;
