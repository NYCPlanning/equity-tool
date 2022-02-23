import ntas from "@data/ntas.json";
import { NtaIndicatorRecord } from "@type/Nta";
import { hasOwnProperty } from "@helpers/hasOwnProperty";

export const useIndicatorRecord = (
  geoid: string | null
): NtaIndicatorRecord | null => {
  if (!geoid || !hasOwnProperty(ntas, geoid)) return null;

  return ntas[geoid];
};
