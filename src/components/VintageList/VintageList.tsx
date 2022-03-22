import { Box } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { VintageTable } from "@components/VintageTable";

export interface VintageListProps {
  vintages: Vintage[];
}

export const VintageList = ({ vintages }: VintageListProps) => {
  return (
    <Box
      flexShrink={{ base: 1, md: 0 }}
      overflowX={{ base: "auto", md: "hidden" }}
      paddingRight={{ base: "0rem", md: "1rem" }}
    >
      {vintages.map((vintage, i) => (
        <VintageTable key={`vintage-${i}`} vintage={vintage} />
      ))}
    </Box>
  );
};
