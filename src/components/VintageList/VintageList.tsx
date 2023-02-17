import { useEffect, useState, useRef } from "react";
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
  // to populate rowBodyHeights so that row heights for all
  // vintages have the same heights as the corresponding row in the first vintage
  const ref = useRef<HTMLTableElement>(null);
  const category = useCategory();
  const subgroup = useSubgroup();

  // Update row heights whenever category or subgroup changes
  useEffect(() => {
    const heights: number[] = [];
    ref.current?.querySelectorAll("tbody tr").forEach((node) => {
      heights.push(node.clientHeight);
    });
    setRowBodyHeights(heights);
  }, [category, subgroup]);

  // TODO: look into generalizing grabbing the heights of the elements
  useEffect(() => {
    const heights: number[] = [];
    ref.current?.querySelectorAll("thead tr").forEach((node) => {
      heights.push(node.clientHeight);
    });
    setRowHeaderHeights(heights);
  }, [category, subgroup, shouldShowReliability]);

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
