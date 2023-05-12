import { useGeography } from "@hooks/useGeography";
import { useGeoid } from "@hooks/useGeoid/useGeoid";
import { usePumaInfo } from "@hooks/usePumaInfo";
import { Geography } from "@constants/geography";
import { getBoroughName } from "@helpers/getBoroughName";
import { useNtaInfo } from "@hooks/useNtaInfo";

export interface GeoidDescription {
  id: string;
  label: string;
}

export const useGeoidDescription = (): GeoidDescription => {
  const { DISTRICT, BOROUGH, CITYWIDE, NTA } = Geography;
  const geography = useGeography();
  const geoid = useGeoid();

  const pumaInfo = usePumaInfo();

  const ntaInfo = useNtaInfo();

  if (geoid === null) {
    return {
      id: "",
      label: "",
    };
  }

  switch (geography) {
    case DISTRICT:
      return {
        id: `PUMA ${geoid}`,
        label: pumaInfo?.neighborhoods ? pumaInfo.neighborhoods : "",
      };
    case BOROUGH:
      return {
        id: "",
        label: getBoroughName(geoid),
      };
    case CITYWIDE:
      return {
        id: "",
        label: "Citywide",
      };
    case NTA:
      return {
        id: `NTA: ${geoid}`,
        label: ntaInfo.ntaname,
      };
    default:
      return {
        id: "",
        label: "",
      };
  }
};
