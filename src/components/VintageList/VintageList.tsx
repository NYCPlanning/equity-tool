import { useEffect, useState, useRef, RefObject } from "react";
import { Flex } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { VintageLabels } from "@components/VintageLabels";
import { VintageTable } from "@components/VintageTable";
import { useCategory } from "@hooks/useCategory";
import { useSubgroup } from "@hooks/useSubgroup";

const getClientHeights =
  (elements: string) => (ref: RefObject<HTMLTableElement>) => {
    const heights: number[] = [];
    ref.current
      ?.querySelectorAll(elements)
      .forEach((node) => heights.push(node.clientHeight));
    return heights;
  };
const getBodyClientHeights = getClientHeights("tbody tr");

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
  const [bodyRowHeights, setBodyRowHeights] = useState<number[]>([]);

  // This ref is passed to the first VintageTable for the indicator
  // When multiple VintageTables are stacked horizontally on desktop, only the first
  // renders the row labels. This ref is used
  // to populate rowHeights so that row heights for all
  // vintages have the same heights as the corresponding row in the first vintage
  const labelRef = useRef<HTMLTableElement>(null);
  const category = useCategory();
  const subgroup = useSubgroup();

  // Update row heights whenever category or subgroup changes
  useEffect(() => {
    setBodyRowHeights(getBodyClientHeights(labelRef));
  }, [category, subgroup]);

  return (
    <Flex
      flexShrink={{ base: 1, md: 0 }}
      overflowX={{ base: "auto", md: "auto" }}
      paddingRight={{ base: "0rem", md: "1rem" }}
      direction={{ base: "column", md: "row" }}
      gridGap={{ base: "0.75rem", md: "0rem" }}
    >
      <VintageLabels ref={labelRef} vintage={vintages[0]} />
      {vintages.map((vintage, i) => {
        if (i === 0) {
          return (
            <VintageTable
              key={`vintage-${i}`}
              vintage={vintage}
              rowHeights={bodyRowHeights}
              shouldShowReliability={shouldShowReliability}
              isSurvey={isSurvey}
            />
          );
        }
        return (
          <VintageTable
            key={`vintage-${i}`}
            vintage={vintage}
            rowHeights={bodyRowHeights}
            shouldShowReliability={shouldShowReliability}
            isSurvey={isSurvey}
          />
        );
      })}
    </Flex>
  );
};
