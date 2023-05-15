import { Flex, Hide, Show } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import {
  VintageTableDesktop,
  VintageTableMobile,
} from "@components/VintageTable";
import { Footnote } from "@schemas/footnote";

export interface VintageListProps {
  vintages: Vintage[];
  footnote: Footnote;
  shouldShowReliability: boolean;
  isSurvey: boolean;
}

export const VintageList = ({
  vintages,
  shouldShowReliability,
  isSurvey,
  footnote,
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
              footnote={footnote}
              vintage={vintage}
              shouldShowReliability={shouldShowReliability}
              isSurvey={isSurvey}
            />
          ))}
        </Flex>
      </Hide>
      <Show above="md">
        <Flex overflowX="auto" paddingRight="1rem">
          <VintageTableDesktop
            footnote={footnote}
            vintages={vintages}
            shouldShowReliability={shouldShowReliability}
            isSurvey={isSurvey}
          />
        </Flex>
      </Show>
    </>
  );
};
