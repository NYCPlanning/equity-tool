import { CloseIcon } from "@chakra-ui/icons";
import { Heading, Box, Button } from "@chakra-ui/react";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { usePumaInfo } from "@hooks/usePumaInfo";

const getGeographyLabel = (geographyId: string | null): string | null => {
  switch (geographyId) {
    case "borough":
      return "Borough";
    case "district":
      return "Community District";
    case "citywide":
      return "City";
  }

  return null;
};

export const DataToolGeographyInfo = () => {
  const { geography, geoid } = useMapSubrouteInfo();

  const geographyLabel = getGeographyLabel(geography);

  const pumaInfo = usePumaInfo(geoid);

  return (
    <Box paddingBottom="2rem">
      <Heading fontSize=".8125rem" fontWeight={500} color="teal.600">
        {geographyLabel} {geoid}
      </Heading>
      <Heading as="h1" fontSize="1.5625rem" fontWeight={700} padding=".5rem 0">
        {pumaInfo?.neighborhoods ? pumaInfo.neighborhoods : ""}
      </Heading>
      <Heading
        as="h3"
        fontSize=".8125rem"
        fontWeight={400}
        paddingBottom=".25rem"
      >
        {pumaInfo?.districts ? pumaInfo.districts : ""}
      </Heading>
      <Button rightIcon={<CloseIcon />} variant="outline" size="xs">
        Clear Selection
      </Button>
    </Box>
  );
};
