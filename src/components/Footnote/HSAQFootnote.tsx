import { Box, Text } from "@chakra-ui/react";

interface HSAQTableFootnoteProps {
  shouldDisplay: boolean;
}

export const HSAQFootnote = ({ shouldDisplay }: HSAQTableFootnoteProps) =>
  shouldDisplay ? (
    <Box>
      <Text
        align="left"
        padding={1}
        fontStyle="italic"
        fontSize="md"
        color={"gray"}
      >
        **The Census Bureau has reviewed this data product to ensure appropriate
        access, use, and disclosure avoidance protection of the confidential
        source data used to produce this product (Data Management System (DMS)
        number: P-7519373, Disclosure Review Board (DRB) approval number:
        CBDRB-FY24-0395).
      </Text>
    </Box>
  ) : (
    <></>
  );
