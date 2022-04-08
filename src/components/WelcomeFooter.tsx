import { Box, Text } from "@chakra-ui/react";
import StaticPageFooter from "@components/StaticPageFooter";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

const WelcomeFooter = () => {
  const { view } = useMapSubrouteInfo();

  if (view === "data") {
    return (
      <Box fontSize="0.8125rem" paddingBottom={{ base: "1rem", md: "unset" }}>
        <Text>
          *Community Districts are approximated using data from Public Use
          Microdata Areas (PUMAs).
        </Text>
        <br />
        <Text>
          The Equitable Development Data Explorer is a partnership between the
          New York City Department of Housing Preservation and Development (HPD)
          and the Department of City Planning (DCP).
        </Text>
        <br />
        <StaticPageFooter />
      </Box>
    );
  }

  if (view === "drm") {
    return (
      <Box fontSize="0.8125rem">
        <Text>
          *Approximations of NYC neighborhoods based off of Neighborhood
          Tabulation Areas (NTAs).
        </Text>
        <br />
        <Text>
          The Equitable Development Reporting web tool is a partnership between
          the New York City Department of Housing Preservation and Development
          (HPD) and the Department of City Planning (DCP).
        </Text>
        <br />
        <StaticPageFooter />
      </Box>
    );
  }
  return <></>;
};

export default WelcomeFooter;
