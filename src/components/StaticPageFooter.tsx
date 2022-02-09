import { Box, BoxProps, Text, Flex, Divider } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../public/logo.png";

type StaticPageFooterProps = BoxProps;

const StaticPageFooter = (props: StaticPageFooterProps) => {
  return (
    <Flex direction="row" width="100%" wrap="nowrap" {...props}>
      <Image src={logo} alt="NYC Logo" />
      <Box maxW="90px" lineHeight="1" mx="10px" wrap="wrap">
        <Text fontSize="xs" fontWeight="bold">
          Department of City Planning
        </Text>
      </Box>
      <Divider
        height="24px"
        orientation="vertical"
        borderColor={"black"}
        mr="10px"
      />
      <Box maxW="150px" lineHeight="1" wrap="wrap">
        <Text fontSize="xs" fontWeight="bold">
          Housing Preservation &amp; Development
        </Text>
      </Box>
    </Flex>
  );
};

export default StaticPageFooter;
