import ntaIndexes from "@data/ntaIndexes.json";
import { useGeoid } from "@hooks/useGeoid";
import { hasOwnProperty } from "@helpers/hasOwnProperty";

export type NtaIndex =
  | "Lowest"
  | "Lower"
  | "Intermediate"
  | "Higher"
  | "Highest";

export const useNtaIndex = (id?: string | null): NtaIndex | null => {
  let geoid = useGeoid();
  if (id) geoid = id;
  if (!geoid || !hasOwnProperty(ntaIndexes, geoid)) return null;

  return ntaIndexes[geoid] as NtaIndex;
};
