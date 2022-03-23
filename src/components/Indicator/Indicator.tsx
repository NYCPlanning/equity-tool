import { Heading, Box } from "@chakra-ui/react";
import { IndicatorRecord } from "@schemas/indicatorRecord";
import { VintageList } from "@components/VintageList";

export interface IndicatorProps {
  data: IndicatorRecord;
}

export const Indicator = ({ data }: IndicatorProps) => {
  return (
    <Box marginBottom="1.5rem">
      <Heading
        color={"gray.700"}
        as="h3"
        fontSize={"1.25rem"}
        fontWeight={"700"}
        marginBottom={{ base: "0.75rem", md: "1rem" }}
        textTransform={"capitalize"}
      >
        {data.label}
      </Heading>
      <VintageList vintages={data.vintages} />
    </Box>
  );
};
