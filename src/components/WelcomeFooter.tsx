import { Box, Text } from "@chakra-ui/react";
import StaticPageFooter from "@components/StaticPageFooter";

const WelcomeFooter = () => {
  return (
    <Box>
      <Text>
        *Community Districts are approximated using data from Public Use
        Microdata Areas (PUMAs).
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
};

export default WelcomeFooter;
