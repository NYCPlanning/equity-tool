import { useEffect, useState, useRef, RefObject } from "react";
import { Flex } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { VintageTable } from "@components/VintageTable";
import { useCategory } from "@hooks/useCategory";
import { useSubgroup } from "@hooks/useSubgroup";

export interface VintageListProps {
  vintages: Vintage[];
  shouldShowReliability: boolean;
  isSurvey: boolean;
}

const getClientHeights =
  (elements: string) => (ref: RefObject<HTMLTableElement>) => {
    const heights: number[] = [];
    ref.current
      ?.querySelectorAll(elements)
      .forEach((node) => heights.push(node.clientHeight));
    return heights;
  };
const getHeaderClientHeights = getClientHeights("thead tr");
const getBodyClientHeights = getClientHeights("tbody tr");

export const VintageList = ({
  vintages,
  shouldShowReliability,
  isSurvey,
}: VintageListProps) => {
  const [rowHeaderHeights, setRowHeaderHeights] = useState<number[]>([]);
  const [rowBodyHeights, setRowBodyHeights] = useState<number[]>([]);

  // This ref is passed to the first VintageTable for the indicator
  // When multiple VintageTables are stacked horizontally on desktop, only the first
  // renders the row labels. This ref is used
  // to populate rowBodyHeights and rowHeaderHeights so that row heights for all
  // vintages have the same heights as the corresponding row in the first vintage
  const ref = useRef<HTMLTableElement>(null);
  const category = useCategory();
  const subgroup = useSubgroup();

  // Update row header heights whenever category or subgroup changes, or reliability is toggled
  useEffect(() => {
    setRowHeaderHeights(getHeaderClientHeights(ref));
  }, [category, subgroup, shouldShowReliability]);

  // Update row body heights whenever category or subgroup changes
  useEffect(() => {
    setRowBodyHeights(getBodyClientHeights(ref));
  }, [category, subgroup]);

  return (
    <Flex
      flexShrink={{ base: 1, md: 0 }}
      overflowX={{ base: "auto", md: "auto" }}
      paddingRight={{ base: "0rem", md: "1rem" }}
      direction={{ base: "column", md: "row" }}
      gridGap={{ base: "0.75rem", md: "0rem" }}
    >
      {vintages.map((vintage, i) => {
        if (i === 0) {
          return (
            <VintageTable
              ref={ref}
              key={`vintage-${i}`}
              isFirstVintage={true}
              vintage={vintage}
              rowHeaderHeights={rowHeaderHeights}
              rowBodyHeights={rowBodyHeights}
              shouldShowReliability={shouldShowReliability}
              isSurvey={isSurvey}
            />
          );
        }
        return (
          <VintageTable
            key={`vintage-${i}`}
            isFirstVintage={false}
            vintage={vintage}
            rowHeaderHeights={rowHeaderHeights}
            rowBodyHeights={rowBodyHeights}
            shouldShowReliability={shouldShowReliability}
            isSurvey={isSurvey}
          />
        );
      })}
    </Flex>
  );
};
