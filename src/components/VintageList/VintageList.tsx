import { useEffect, useState, useRef, RefObject } from "react";
import { Flex } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { VintageLabels } from "@components/VintageLabels";
import { VintageTable } from "@components/VintageTable";
import { useCategory } from "@hooks/useCategory";
import { useSubgroup } from "@hooks/useSubgroup";
import sum from "lodash.sum";

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
  const [headerRowHeights, setHeaderRowHeights] = useState<number[]>([]);
  const [bodyRowHeights, setBodyRowHeights] = useState<number[]>([]);

  /*
    On desktop, the separate vintage tables are arranged horizontally,
    as if they are a single table. To sell this appearance, the row
    heights need to be synced across the tables. The label column has the
    longest body text and is used for the data row heights. The first
    table with actual data typically has the longest header text and is
    used for the header row heights.
  */
  const labelRef = useRef<HTMLTableElement>(null);
  const firstTableRef = useRef<HTMLTableElement>(null);
  const category = useCategory();
  const subgroup = useSubgroup();

  // Update row heights whenever category or subgroup changes
  useEffect(() => {
    setBodyRowHeights(getBodyClientHeights(labelRef));
  }, [category, subgroup]);

  useEffect(() => {
    const heights = getHeaderClientHeights(firstTableRef);
    setHeaderRowHeights(heights);
  }, [category, subgroup, shouldShowReliability]);

  return (
    <Flex
      backgroundColor={"gray.50"}
      flexShrink={{ base: 1, md: 0 }}
      overflowX={{ base: "auto", md: "auto" }}
      paddingRight={{ base: "0rem", md: "1rem" }}
      direction={{ base: "column", md: "row" }}
      gridGap={{ base: "0.75rem", md: "0rem" }}
    >
      <VintageLabels
        ref={labelRef}
        vintage={vintages[0]}
        headerHeight={sum(headerRowHeights)}
      />
      {vintages.map((vintage, i) => {
        if (i === 0) {
          return (
            <VintageTable
              key={`vintage-${i}`}
              ref={firstTableRef}
              isFirstVintage={true}
              vintage={vintage}
              headerRowHeights={headerRowHeights}
              bodyRowHeights={bodyRowHeights}
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
            headerRowHeights={headerRowHeights}
            bodyRowHeights={bodyRowHeights}
            shouldShowReliability={shouldShowReliability}
            isSurvey={isSurvey}
          />
        );
      })}
    </Flex>
  );
};
