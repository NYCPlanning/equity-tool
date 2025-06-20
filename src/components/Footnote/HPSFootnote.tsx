import { Box, Text } from "@chakra-ui/react";

interface HPSTableFootnoteProps {
  shouldDisplay: boolean;
}

export const HPSFootnote = ({ shouldDisplay }: HPSTableFootnoteProps) =>
  shouldDisplay ? (
    <Box>
      <Text
        align="left"
        padding={1}
        fontStyle="italic"
        fontSize="md"
        color={"gray"}
      >
        *Some health outcomes and public safety indicators are not currently
        displayed due to limited data. These will be updated once new
        information is provided.
      </Text>
    </Box>
  ) : (
    <></>
  );
