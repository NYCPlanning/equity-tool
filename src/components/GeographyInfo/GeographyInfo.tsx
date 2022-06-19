import { Heading, Box, BoxProps } from "@chakra-ui/react";
import { usePumaInfo } from "@hooks/usePumaInfo";
import { fetchNtaInfo } from "@helpers/fetchNtaInfo";
import { Geography } from "@constants/geography";
import { useEffect, useState } from "react";
import { getBoroughName } from "@helpers/getBoroughName";

export interface GeographyInfoProps extends BoxProps {
  geography: Geography | null;
  geoid: string;
}

export const GeographyInfo = ({
  geoid,
  geography,
  fontSize = "1.5625rem",
  ...boxProps
}: GeographyInfoProps) => {
  const { DISTRICT, BOROUGH, CITYWIDE, NTA } = Geography;

  const pumaInfo = usePumaInfo(geoid);

  const [ntaInfo, setNtaInfo] = useState({
    ntaname: "",
    ntacode: "",
  });

  useEffect(() => {
    geography === Geography.NTA &&
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
      primaryHeading = getBoroughName(geoid);
      break;
    case CITYWIDE:
      primaryHeading = "Citywide";
      break;
    case NTA:
      primaryHeading = `${ntaInfo?.ntaname}`;
      break;
    default:
      break;
  }

  return (
    <Box flex="shrink" title={primaryHeading} {...boxProps}>
      {geography === DISTRICT && (
        <Heading fontSize=".8125rem" fontWeight={500} color="#2B797A">
          PUMA {geoid}
        </Heading>
      )}
      {geography === NTA && (
        <Heading
          fontSize=".8125rem"
          fontWeight={500}
          color="#2B797A"
          pb="0.5rem"
        >
          NTA {geoid}
        </Heading>
      )}

      <Heading
        as="h1"
        fontWeight={700}
        paddingBottom="0.5rem"
        textTransform={"capitalize"}
        fontSize={fontSize}
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
