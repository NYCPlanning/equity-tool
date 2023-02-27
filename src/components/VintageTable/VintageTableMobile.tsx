import { useState } from "react";
import { Flex, Box, Text, Table, Thead, Tbody, Th, Tr } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { DataPointRow } from "@components/DataPointRow";
import { Vintage } from "@schemas/vintage";
import { useTablesIsOpen } from "@contexts/TablesIsOpenContext";

export interface VintageTableMobileProps {
  vintage: Vintage;
  shouldShowReliability: boolean;
  isSurvey: boolean;
}

const VintageTableMobile = ({
  vintage,
  shouldShowReliability,
  isSurvey,
}: VintageTableMobileProps) => {
  const { rows, headers, label } = vintage;
  const [isOpen, setIsOpen] = useState(true);

  const { addSetIsOpen } = useTablesIsOpen();

  addSetIsOpen(setIsOpen);

  return (
    <Table
      variant="striped"
      sx={{
        paddingRight: 3,
        display: "block",
        overflowX: "auto",
        borderCollapse: "initial",
        borderSpacing: 0,
        fontSize: "0.875rem",
        tableLayout: "fixed",
        width: "auto",
        // TODO: update note
        _notFrist: {
          "thead tr:first-of-type th:first-of-type": {
            display: "none",
          },
        },
      }}
    >
      <Thead>
        <Tr>
          <Th
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            colSpan={6}
            borderTopLeftRadius="0.75rem"
            borderTopRightRadius="0.75rem"
            borderBottomLeftRadius={isOpen ? "0rem" : "0.75rem"}
            borderBottomRightRadius={isOpen ? "0rem" : "0.75rem"}
            px="1rem"
            minWidth="calc(100vw - 26px)"
            maxWidth="calc(100vw - 26px)"
          >
            <Flex justifyContent="center" align="center" position="relative">
              <Box px="4.5rem">
                <Text>{label}</Text>
              </Box>
              <Box display="block" position="absolute" right="0rem">
                <ChevronDownIcon
                  transform={`rotate(${isOpen ? "0deg" : "-90deg"})`}
                  color="teal.600"
                  _hover={{ color: "teal.600" }}
                  w="2.5rem"
                  h="2.5rem"
                />
              </Box>
            </Flex>
          </Th>
        </Tr>
        {/* If indicator data is a survey and shouldShowReliability is false,
                just render first row of headers with colspan of 1 */}
        {isSurvey && !shouldShowReliability ? (
          <Tr display={isOpen ? "table-row" : "none"}>
            <Th
              rowSpan={headers.length}
              display="table-cell"
              position="sticky"
              left={0}
              zIndex={100}
              minWidth="calc((100vw - 26px) / 3)"
              maxWidth="calc((100vw - 26px) / 3)"
            >
              data
            </Th>

            {headers[0].map((headerCell, j) => (
              <Th
                key={`header-cell-${j}`}
                colSpan={1}
                minWidth="calc((100vw - 26px) / 3)"
                maxWidth="calc((100vw - 26px) / 3)"
              >
                {headerCell.label}
              </Th>
            ))}
          </Tr>
        ) : (
          // Otherwise, render all header rows, taking colspans from the data
          headers.map((headerRow, i, headers) => (
            <Tr key={`header-row-${i}`} display={isOpen ? "table-row" : "none"}>
              {i === 0 && (
                <Th
                  rowSpan={headers.length}
                  display="table-cell"
                  position="sticky"
                  left={0}
                  zIndex={100}
                  minWidth="calc((100vw - 26px) / 3)"
                  maxWidth="calc((100vw - 26px) / 3)"
                >
                  data
                </Th>
              )}

              {headerRow.map((headerCell, j) => (
                <Th
                  key={`header-cell-${j}`}
                  colSpan={headerCell.colspan}
                  minWidth="calc((100vw - 26px) / 3)"
                  maxWidth="calc((100vw - 26px) / 3)"
                >
                  {headerCell.label}
                </Th>
              ))}
            </Tr>
          ))
        )}
      </Thead>
      <Tbody display={isOpen ? "table-row-group" : "none"}>
        {rows.map((row, i) => (
          <DataPointRow
            key={i}
            shouldShowReliability={shouldShowReliability}
            row={row}
          />
        ))}
      </Tbody>
    </Table>
  );
};

VintageTableMobile.displayName = "VintageTableMobile";

export { VintageTableMobile };
