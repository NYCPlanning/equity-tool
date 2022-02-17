import pumas from "@data/pumas.json";
import { hasOwnProperty } from "@helpers/hasOwnProperty";

export type pumaInfo = typeof pumas["3701"];

export const usePumaInfo = (pumaId: string | null): pumaInfo | null => {
  if (!pumaId || !hasOwnProperty(pumas, pumaId)) return null;

  return pumas[pumaId];
};
