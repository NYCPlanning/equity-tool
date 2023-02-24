import { useEffect, useState, useRef, RefObject } from "react";
import { Flex } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { VintageLabels } from "@components/VintageLabels";
import { VintageTable } from "@components/VintageTable";
import { GrayCard } from "@components/VintageList";
import { useCategory } from "@hooks/useCategory";
import { useSubgroup } from "@hooks/useSubgroup";
import sum from "lodash.sum";

const getClientHeights =
  (elements: string) => (ref: RefObject<HTMLTableElement>) => {
    const heights: number[] = [];
    ref.current
      ?.querySelectorAll(elements)
      .forEach((node) => heights.push(node.getBoundingClientRect().height));
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
    as if they are a single table. To sell this 'single-table' illusion, the row
    heights need to be synced across the tables. We use two different references.
    The first reference is for the rows in the table headers. The second reference 
    is for the rows in the table bodies.
    
    The vintage labels component has the longest text for the data rows. It is used as
    the reference for the table bodies. The first vintage table has the longest text
    for the header rows. It is used as the reference for the tabled headers.
    */
  const labelRef = useRef<HTMLTableElement>(null);
  const firstTableRef = useRef<HTMLTableElement>(null);
  const category = useCategory();
  const subgroup = useSubgroup();

  // Update row heights whenever category or subgroup changes
  useEffect(() => {
    setBodyRowHeights(getBodyClientHeights(labelRef));
  }, [category, subgroup]);

  // Update row heights whenever category or subgroup changes, or reliability is toggled
  useEffect(() => {
    const heights = getHeaderClientHeights(firstTableRef);
    setHeaderRowHeights(heights);
  }, [category, subgroup, shouldShowReliability]);

  return (
    <Flex
      position="relative"
      flexShrink={{ base: 1, md: 0 }}
      overflowX={{ base: "auto", md: "auto" }}
      paddingRight={{ base: "0rem", md: "1rem" }}
      direction={{ base: "column", md: "row" }}
      gridGap={{ base: "0.75rem", md: "0rem" }}
    >
      {/*
      VintageLabels acts as a table dedicated to labeling the subsequent Vintage tables.
      This allows the labels to stick in place as the whole list of tables scroll.

      Because the stickiness applies to the whole table, the header for the table of labels 
      will obscure the headers for the vintage tables as the vintage tables scroll under the
      vintage label headers. To see the vintage table headers as they scroll by the vintage labels,
      we make the label headers transparent.

      With transparent label table headers, the white background is now visible. Due to padding concerns,
      it is impractical to make the background of the whole VintageList gray. Instead, the 
      gray card component provides a gray background that exists below the list of tables and is
      only as wide as the label column.
    */}
      <GrayCard />
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
