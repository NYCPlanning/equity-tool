import ntas from "@data/ntas.json";
import { NtaIndicatorRecord } from "@type/Nta";

export const useIndicatorRecord = (
  geoid: string | null
): NtaIndicatorRecord | null => {
  // This function is a helper that makes a type-safe wrapper for Object.hasOwnProperty
  // Normally we would move this somewhere sharable but since most of this code will likely only
  // be temporary, it's fine for now
  function hasOwnProperty<T>(obj: T, key: PropertyKey): key is keyof T {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  if (!geoid || !hasOwnProperty(ntas, geoid)) return null;

  return ntas[geoid];
};
