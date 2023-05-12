import { Heading, Box, Flex } from "@chakra-ui/react";
import { IndicatorRecord } from "@schemas/indicatorRecord";
import { VintageList } from "@components/VintageList";

export interface IndicatorProps {
  indicator: IndicatorRecord;
  shouldShowReliability: boolean;
}

export const Indicator = ({
  indicator,
  shouldShowReliability,
}: IndicatorProps) => {
  return (
    <Box marginBottom={{ base: "1.5rem", lg: "2.5rem" }}>
      <Flex direction={"column"}>
        <Heading
          color={"gray.700"}
          as="h3"
          fontSize={"1.25rem"}
          fontWeight={"700"}
          marginBottom={{ base: "0.75rem", md: "1rem" }}
          textTransform={"capitalize"}
          order={"2"}
        >
          {indicator.title}
        </Heading>
        {indicator.id !== null && (
          <Heading
            color={"gray.600"}
            as="h4"
            fontSize={"0.8125rem"}
            fontWeight={"400"}
            marginBottom={"0.25rem"}
            lineHeight={"1.6"}
            order={"1"}
          >
            Table {indicator.id}
          </Heading>
        )}
      </Flex>
      <VintageList
        footnote={indicator.footnote}
        vintages={indicator.vintages}
        shouldShowReliability={shouldShowReliability}
        isSurvey={indicator.isSurvey}
      />
    </Box>
  );
};
