import { CloseIcon } from "@chakra-ui/icons";
import { Heading, Box, Button } from "@chakra-ui/react";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { usePumaInfo } from "@hooks/usePumaInfo";
import { useClearSelection } from "@helpers/useClearSelection";
import { Geography } from "@constants/geography";
import { Geoid } from "@constants/geoid";

export const GeographyInfo = () => {
  const { District, Borough, Citywide, Nta } = Geography;
  const { Nyc } = Geoid;

  const { view, geography, geoid } = useMapSubrouteInfo();

  const pumaInfo = usePumaInfo(geoid);

  const clearSelection = useClearSelection();

  let primaryHeading = "";

  switch (geography) {
    case District:
      primaryHeading = pumaInfo?.neighborhoods ? pumaInfo.neighborhoods : "";
      break;
    case Borough:
      primaryHeading = `${geoid}`;
      break;
    case Citywide:
      primaryHeading = "New York City";
      break;
    case Nta:
      primaryHeading = "QN68 - Queensbridge Ravenswood Long Island City";
      break;
    default:
      break;
  }

  return (
    <Box paddingBottom="2rem">
      {view === "datatool" && geography === District && (
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

      {geoid !== Nyc && (
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
