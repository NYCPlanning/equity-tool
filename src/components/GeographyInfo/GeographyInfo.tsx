import { CloseIcon } from "@chakra-ui/icons";
import { Heading, Box, Button } from "@chakra-ui/react";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { usePumaInfo } from "@hooks/usePumaInfo";
import { useClearSelection } from "@helpers/useClearSelection";

export const GeographyInfo = () => {
  const { geography, geoid } = useMapSubrouteInfo();

  const pumaInfo = usePumaInfo(geoid);

  const clearSelection = useClearSelection();

  let primaryHeading = "";

  switch (geography) {
    case "district":
      primaryHeading = pumaInfo?.neighborhoods ? pumaInfo.neighborhoods : "";
      break;
    case "borough":
      primaryHeading = `${geoid}`;
      break;
    case "citywide":
      primaryHeading = "New York City";
      break;
    default:
      break;
  }

  return (
    <Box paddingBottom="2rem">
      {geography === "district" && (
        <Heading fontSize=".8125rem" fontWeight={500} color="teal.600">
          PUMA {geoid}
        </Heading>
      )}
      <Heading as="h1" fontSize="1.5625rem" fontWeight={700} padding=".5rem 0">
        {primaryHeading}
      </Heading>
      <Heading
        as="h3"
        fontSize=".8125rem"
        fontWeight={400}
        paddingBottom=".25rem"
      >
        {pumaInfo?.districts ? pumaInfo.districts : ""}
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
  );
};