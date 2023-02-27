import { Flex, Hide, Show } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { VintageTableMobile } from "@components/VintageTable";

export interface VintageListProps {
  vintages: Vintage[];
  shouldShowReliability: boolean;
  isSurvey: boolean;
}

export const VintageList = ({
  vintages,
  shouldShowReliability,
  isSurvey,
}: VintageListProps) => {
  return (
    <>
      <Hide above="md">
        <Flex
          flexShrink={{ base: 1, md: 0 }}
          overflowX={{ base: "auto", md: "auto" }}
          paddingRight={{ base: "0rem", md: "1rem" }}
          direction={{ base: "column", md: "row" }}
          gridGap={{ base: "0.75rem", md: "0rem" }}
        >
          {vintages.map((vintage, i) => (
            <VintageTableMobile
              key={`vintage-${i}`}
              vintage={vintage}
              shouldShowReliability={shouldShowReliability}
              isSurvey={isSurvey}
            />
          ))}
        </Flex>
      </Hide>
      <Show above="md">
        <Flex>Placeholder</Flex>
      </Show>
    </>
  );
};
