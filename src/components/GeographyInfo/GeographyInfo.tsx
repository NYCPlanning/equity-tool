import { Heading, HeadingProps, Box } from "@chakra-ui/react";
import { usePumaInfo } from "@hooks/usePumaInfo";
import { fetchNtaInfo } from "@helpers/fetchNtaInfo";
import { Geography } from "@constants/geography";
import { useEffect, useState } from "react";

export interface GeographyInfoProps extends HeadingProps {
  geography: Geography | null;
  geoid: string;
}

export const GeographyInfo = ({
  geoid,
  geography,
  ...headingProps
}: GeographyInfoProps) => {
  const { DISTRICT, BOROUGH, CITYWIDE, NTA } = Geography;

  const pumaInfo = usePumaInfo(geoid);

  const [ntaInfo, setNtaInfo] = useState({
    ntaname: "",
    ntacode: "",
  });

  useEffect(() => {
    fetchNtaInfo(geoid, (ntaInfo: any) => {
      setNtaInfo(ntaInfo);
    });
  }, [geoid]);

  let primaryHeading = "";

  switch (geography) {
    case DISTRICT:
      primaryHeading = pumaInfo?.neighborhoods ? pumaInfo.neighborhoods : "";
      break;
    case BOROUGH:
      primaryHeading = `${geoid}`;
      break;
    case CITYWIDE:
      primaryHeading = "Citywide";
      break;
    case NTA:
      primaryHeading = `${ntaInfo?.ntacode} - ${ntaInfo?.ntaname}`;
      break;
    default:
      break;
  }

  return (
    <Box flex="shrink" title={primaryHeading} padding="2.5rem 1rem 1.5rem 1rem">
      {geography === DISTRICT && (
        <Heading fontSize=".8125rem" fontWeight={500} color="#2B797A">
          PUMA {geoid}
        </Heading>
      )}
      <Heading
        as="h1"
        fontWeight={700}
        padding=".5rem 0"
        textTransform={"capitalize"}
        {...headingProps}
        data-cy="geoInfoPrimaryHeading"
      >
        {primaryHeading}
      </Heading>
      {pumaInfo?.districts && (
        <Heading as="h3" fontSize=".8125rem" fontWeight={400}>
          {pumaInfo.districts}
        </Heading>
      )}
    </Box>
  );
};
