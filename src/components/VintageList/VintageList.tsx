import { useEffect, useState, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { VintageTable } from "@components/VintageTable";

export interface VintageListProps {
  vintages: Vintage[];
}

export const VintageList = ({ vintages }: VintageListProps) => {
  const [rowHeights, setRowHeights] = useState<number[]>([]);

  // This ref is passed to the first VintageTable for the indicator
  // When multiple VintageTables are stacked horizontally on desktop, only the first
  // renders the row labels. This ref is used
  // to populate rowHeights so that row heights for all
  // vintages have the same heights as the corresponding row in the first vintage
  const ref = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const heights: number[] = [];
    ref.current?.querySelectorAll("tbody tr").forEach((node) => {
      heights.push(node.clientHeight);
    });
    setRowHeights(heights);
  }, []);

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
              rowHeights={rowHeights}
            />
          );
        }
        return (
          <VintageTable
            key={`vintage-${i}`}
            vintage={vintage}
            rowHeights={rowHeights}
          />
        );
      })}
    </Flex>
  );
};
