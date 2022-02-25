import { Heading, HeadingProps, Box } from "@chakra-ui/react";
import { usePumaInfo } from "@hooks/usePumaInfo";
import { Geography } from "@constants/geography";

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
      primaryHeading = "QN68 - Queensbridge Ravenswood Long Island City";
      break;
    default:
      break;
  }

  return (
    <Box flex="shrink" title={primaryHeading}>
      {geography === DISTRICT && (
        <Heading fontSize=".8125rem" fontWeight={500} color="teal.600">
          PUMA {geoid}
        </Heading>
      )}
      <Heading
        as="h1"
        fontWeight={700}
        padding=".5rem 0"
        textTransform={"capitalize"}
        {...headingProps}
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
