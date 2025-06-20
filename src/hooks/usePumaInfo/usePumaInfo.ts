import pumas from "@data/pumas.json";
import { useGeoid } from "@hooks/useGeoid";
import { hasOwnProperty } from "@helpers/hasOwnProperty";

export type pumaInfo = typeof pumas["4103"];

export const usePumaInfo = (id?: string | null): pumaInfo | null => {
  let geoid = useGeoid();
  if (id) geoid = id;
  if (!geoid || !hasOwnProperty(pumas, geoid)) return null;

  return pumas[geoid];
};
