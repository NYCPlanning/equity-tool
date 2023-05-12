import { useEffect, useState } from "react";
import { useGeography } from "@hooks/useGeography";
import { useGeoid } from "@hooks/useGeoid";
import { fetchNtaInfo, NtaInfo } from "@helpers/fetchNtaInfo";
import { Geography } from "@constants/geography";

export const useNtaInfo = (): NtaInfo => {
  const geoid = useGeoid();
  const geography = useGeography();
  const [ntaInfo, setNtaInfo] = useState<NtaInfo>({
    ntaname: "",
    ntacode: "",
  });

  useEffect(() => {
    geography === Geography.NTA &&
      fetchNtaInfo(geoid, (ntaInfo: NtaInfo) => {
        setNtaInfo(ntaInfo);
      });
  }, [geoid, geography]);

  return ntaInfo;
};
