import { Heading, Box, BoxProps } from "@chakra-ui/react";
import { usePumaInfo } from "@hooks/usePumaInfo";
import { useNtaInfo } from "@hooks/useNtaInfo";
import { Geography } from "@constants/geography";
import { getBoroughName } from "@helpers/getBoroughName";

export interface GeographyInfoProps extends BoxProps {
  geography: Geography | null;
  geoid: string;
}

export const GeographyInfo = ({
  geoid,
  geography,
  fontSize = "1.5625rem",
  noOfLines,
  ...boxProps
}: GeographyInfoProps) => {
  const { DISTRICT, BOROUGH, CITYWIDE, NTA } = Geography;

  const pumaInfo = usePumaInfo();

  const ntaInfo = useNtaInfo();

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
      primaryHeading = `${ntaInfo.ntaname}`;
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
          noOfLines={noOfLines}
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
        noOfLines={noOfLines}
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
