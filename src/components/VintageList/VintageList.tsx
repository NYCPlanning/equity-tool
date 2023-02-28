import { Flex, Hide, Show } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import {
  VintageTableDesktop,
  VintageTableMobile,
} from "@components/VintageTable";

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
          flexShrink={1}
          overflowX="auto"
          paddingRight="0rem"
          direction="column"
          gridGap="0.75rem"
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
        <Flex overflowX="auto" paddingRight="1rem">
          <VintageTableDesktop vintages={vintages} />
        </Flex>
      </Show>
    </>
  );
};
