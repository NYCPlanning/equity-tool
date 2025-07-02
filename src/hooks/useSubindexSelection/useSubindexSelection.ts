import { useGeoid } from "@hooks/useGeoid";
import drmData from "@data/DRI_Subindices_Indicators.json";

export type SubindexSelection = typeof drmData[0];

export const useSubindexSelection = (): SubindexSelection | null => {
  const geoid = useGeoid();

  const selection = drmData.find(
    (nta: SubindexSelection) => nta.nta2020 === geoid
  );

  return typeof selection === "undefined" ? null : selection;
};
