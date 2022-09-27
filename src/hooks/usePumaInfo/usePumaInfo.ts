import pumas from "@data/pumas.json";
import { useGeoid } from "@hooks/useGeoid";
import { hasOwnProperty } from "@helpers/hasOwnProperty";

export type pumaInfo = typeof pumas["3701"];

export const usePumaInfo = (): pumaInfo | null => {
  const geoid = useGeoid();
  if (!geoid || !hasOwnProperty(pumas, geoid)) return null;

  return pumas[geoid];
};
