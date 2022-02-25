import { CloseIcon } from "@chakra-ui/icons";
import { Heading, Box, Button } from "@chakra-ui/react";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { usePumaInfo } from "@hooks/usePumaInfo";
import { useClearSelection } from "@helpers/useClearSelection";
import { Geography } from "@constants/geography";
import { NYC } from "@constants/geoid";

export const GeographyInfo = () => {
  const { DISTRICT, BOROUGH, CITYWIDE, NTA } = Geography;

  const { view, geography, geoid } = useMapSubrouteInfo();

  const pumaInfo = usePumaInfo(geoid);

  const clearSelection = useClearSelection();

  let primaryHeading = "";

  switch (geography) {
    case DISTRICT:
      primaryHeading = pumaInfo?.neighborhoods ? pumaInfo.neighborhoods : "";
      break;
    case BOROUGH:
      primaryHeading = `${geoid}`;
      break;
    case CITYWIDE:
      primaryHeading = "New York City";
      break;
    case NTA:
      primaryHeading = "QN68 - Queensbridge Ravenswood Long Island City";
      break;
    default:
      break;
  }

  return (
    <Box paddingBottom="2rem" flex="shrink" title={primaryHeading}>
      {view === "datatool" && geography === DISTRICT && (
        <Heading fontSize=".8125rem" fontWeight={500} color="teal.600">
          PUMA {geoid}
        </Heading>
      )}
      <Heading
        as="h1"
        fontSize="1.5625rem"
        fontWeight={700}
        padding=".5rem 0"
        isTruncated
      >
        {primaryHeading}
      </Heading>
      {view === "datatool" && (
        <Heading
          as="h3"
          fontSize=".8125rem"
          fontWeight={400}
          paddingBottom=".25rem"
        >
          {pumaInfo?.districts ? pumaInfo.districts : ""}
        </Heading>
      )}

      {geoid !== NYC && (
        <Button
          rightIcon={<CloseIcon />}
          variant="outline"
          size="xs"
          onClick={clearSelection}
        >
          Clear Selection
        </Button>
      )}
    </Box>
  );
};
