import { CloseIcon } from "@chakra-ui/icons";
import { Heading, Box, Button } from "@chakra-ui/react";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { usePumaInfo } from "@hooks/usePumaInfo";
import { useClearSelection } from "@helpers/useClearSelection";
import { Geography } from "@constants/geography";
import { DRISelection } from "@components/SidebarContent/DRISelection";

export const GeographyInfo = () => {
  const { District, Borough, Citywide, Nta } = Geography;

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

  if (view === "dri") {
    return (
      <>
        <Box p="0rem 0.5rem 1rem 0.5rem">
          <Heading as="h1" fontSize="1.5625rem" fontWeight={700}>
            QN68 - Queensbridge Ravenswood Long Island City
          </Heading>
          <Button
            rightIcon={<CloseIcon />}
            variant="outline"
            size="xs"
            onClick={clearSelection}
          >
            Clear Selection
          </Button>
        </Box>
        <hr />
        <Box p="1rem 0.5rem 1rem 0.5rem">
          <Heading as="h2" fontSize="1.3rem" fontWeight={700}>
            Displacement Risk Index (DRI) Profile
          </Heading>
          <Text>Select a DRI indicator to learn more about it.</Text>
        </Box>
        <hr />
        <DRISelection />
      </>
    );
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
      <Button
        rightIcon={<CloseIcon />}
        variant="outline"
        size="xs"
        onClick={clearSelection}
      >
        Clear Selection
      </Button>
    </Box>
  );
};
