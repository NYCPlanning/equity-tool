import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { Estimate } from "@type/Estimate";

export interface EstimateTableProps {
  shouldShowReliability: boolean;
  data: Estimate[];
}

export const EstimateTable = ({
  shouldShowReliability,
  data,
}: EstimateTableProps) => {
  const cellWidth = "calc((100vw - 26px) / 3)";
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  return (
    <Box marginLeft={{ base: 3, md: 0 }} overflowX={"scroll"}>
      <Table
        variant="striped"
        sx={{
          paddingRight: { base: 3, md: 0 },
          display: "block",
          overflowX: "auto",
          borderCollapse: "initial",
          borderSpacing: 0,
          // width: "auto",
          // tableLayout: "fixed",
          fontSize: "0.875rem",
          whiteSpace: "nowrap",
          thead: {
            width: "100%",
            display: "table",
          },
          tbody: {
            maxW: "100%",
            display: "table",
          },
          td: {
            minW: cellWidth,
            maxW: cellWidth,
            px: "1.5rem",
            whiteSpace: "normal",
            // whiteSpace: "wrap",
          },
          "thead tr:last-of-type th": {
            minW: cellWidth,
            maxW: cellWidth,
            whiteSpace: "normal",
            // whiteSpace: "wrap",
          },
          // "tbody tr td:first-of-type": {
          //   textAlign: "start",
          //   px: "0.375rem",
          //   position: "sticky",
          //   left: 0,
          //   zIndex: 100,
          // },
        }}
      >
        <Thead>
          <Tr>
            <Th onClick={onToggle} colSpan={shouldShowReliability ? 6 : 3}>
              <Flex justify="center">2000 census pums</Flex>
            </Th>
          </Tr>
          {isOpen && (
            <>
              <Tr>
                <Th
                  display={{ base: "table-cell", md: "none" }}
                  minW={cellWidth}
                  maxW={cellWidth}
                  rowSpan={shouldShowReliability ? 2 : 1}
                  position={"sticky"}
                  left={"0"}
                  zIndex={100}
                >
                  data
                </Th>
                <Th colSpan={shouldShowReliability ? 3 : 1}>number</Th>
                <Th colSpan={shouldShowReliability ? 2 : 1}>percent</Th>
              </Tr>
              {shouldShowReliability && (
                <Tr>
                  <Th>estimate</Th>
                  <Th>moe</Th>
                  <Th>cv</Th>
                  <Th>estimate</Th>
                  <Th>moe</Th>
                </Tr>
              )}
            </>
          )}
        </Thead>
        {isOpen && (
          <Tbody>
            {data.map((row) => (
              <Tr key={row.id}>
                <Td
                  textAlign={"start"}
                  display={{ base: "table-cell", md: "none" }}
                  px={"0.375rem"}
                  position={"sticky"}
                  left={"0"}
                  zIndex={"100"}
                >
                  {row.label}
                </Td>
                <Td isNumeric>{row.datum.value}</Td>
                {shouldShowReliability && (
                  <>
                    <Td isNumeric>{row.datum.marginOfError}</Td>
                    <Td isNumeric>{row.datum.coefficientOfVariation}</Td>
                  </>
                )}
                <Td isNumeric>{row.percent.value}</Td>
                {shouldShowReliability && (
                  <>
                    <Td isNumeric>{row.percent.marginOfError}</Td>
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </Box>
  );
};
