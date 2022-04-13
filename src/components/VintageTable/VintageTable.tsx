/* eslint-disable react/display-name */
import { forwardRef, useContext, useState } from "react";
import { Flex, Box, Text, Table, Thead, Tbody, Th, Tr } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { DataPointRow } from "@components/DataPointRow";
import { Vintage } from "@schemas/vintage";
import TablesIsOpenContext from "@contexts/TablesIsOpenContext";
export interface VintageTableProps {
  vintage: Vintage;
  rowHeights: number[];
  shouldShowReliability: boolean;
  isSurvey: boolean;
}

export const VintageTable = forwardRef<HTMLTableElement, VintageTableProps>(
  ({ vintage, rowHeights, shouldShowReliability, isSurvey }, ref) => {
    const { rows, headers, label } = vintage;
    const [isOpen, setIsOpen] = useState(true);

    const { addSetIsOpen } = useContext(TablesIsOpenContext);

    addSetIsOpen(setIsOpen);

    return (
      <Table
        variant="striped"
        ref={ref}
        sx={{
          paddingRight: { base: 3, md: 0 },
          display: "block",
          overflowX: { base: "auto", md: "initial" },
          borderCollapse: "initial",
          borderSpacing: 0,
          fontSize: "0.875rem",
          tableLayout: "fixed",
          width: "auto",
          // These styles hide the row labels for all vintages after the first
          // on desktop. Because vintages stack horizontally on desktop, we only need to
          // render the labels once.
          "&:not(:first-of-type)": {
            "tbody tr th": {
              display: { base: "table-cell", md: "none" },
            },
            "thead tr:first-of-type th:first-of-type": {
              display: "none",
            },
          },
        }}
      >
        <Thead>
          <Tr>
            <Th
              rowSpan={headers.length + 1}
              display={{ base: "none", md: "table-cell" }}
              minWidth={"13.5rem"}
              maxWidth={"13.5rem"}
              borderTopLeftRadius={"0.75rem"}
              border={"none"}
            ></Th>
            <Th
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              colSpan={6}
              borderTopLeftRadius={{ base: "0.75rem", md: "0rem" }}
              borderTopRightRadius={{ base: "0.75rem", md: "0rem" }}
              borderBottomLeftRadius={{
                base: isOpen ? "0rem" : "0.75rem",
                md: "0rem",
              }}
              borderBottomRightRadius={{
                base: isOpen ? "0rem" : "0.75rem",
                md: "0rem",
              }}
              px={"1rem"}
              minWidth={{
                base: "calc(100vw - 26px)",
                md: isSurvey && shouldShowReliability ? "30.5rem" : "15.375rem",
              }}
              maxWidth={{
                base: "calc(100vw - 26px)",
                md: isSurvey && shouldShowReliability ? "30.5rem" : "15.375rem",
              }}
            >
              <Flex
                justifyContent={"center"}
                align={"center"}
                position={"relative"}
              >
                <Box px={{ base: "4.5rem", md: "0rem" }}>
                  <Text>{label}</Text>
                </Box>
                <Box
                  display={{ base: "block", md: "none" }}
                  position={"absolute"}
                  right={"0rem"}
                >
                  <ChevronDownIcon
                    transform={`rotate(${isOpen ? "0deg" : "-90deg"})`}
                    color="teal.600"
                    _hover={{ color: "teal.600" }}
                    w={"2.5rem"}
                    h={"2.5rem"}
                  />
                </Box>
              </Flex>
            </Th>
          </Tr>
          {/* If indicator data is a survey and shouldShowReliability is false,
                just render first row of headers with colspan of 1 */}
          {isSurvey && !shouldShowReliability ? (
            <Tr
              display={{
                base: isOpen ? "table-row" : "none",
                md: "table-row",
              }}
            >
              <Th
                rowSpan={headers.length}
                display={{ base: "table-cell", md: "none" }}
                position={"sticky"}
                left={"0"}
                zIndex={"100"}
                minWidth={{
                  base: "calc((100vw - 26px) / 3)",
                  md: "unset",
                }}
                maxWidth={{
                  base: "calc((100vw - 26px) / 3)",
                  md: "unset",
                }}
              >
                data
              </Th>

              {headers[0].map((headerCell, j) => (
                <Th
                  colSpan={1}
                  minWidth={{
                    base: "calc((100vw - 26px) / 3)",
                    md: "unset",
                  }}
                  maxWidth={{
                    base: "calc((100vw - 26px) / 3)",
                    md: "unset",
                  }}
                  key={`header-cell-${j}`}
                >
                  {headerCell.label}
                </Th>
              ))}
            </Tr>
          ) : (
            // Otherwise, render all header rows, taking colspans from the data
            headers.map((headerRow, i, headers) => (
              <Tr
                display={{
                  base: isOpen ? "table-row" : "none",
                  md: "table-row",
                }}
                key={`header-row-${i}`}
              >
                {i === 0 && (
                  <Th
                    rowSpan={headers.length}
                    display={{ base: "table-cell", md: "none" }}
                    position={"sticky"}
                    left={"0"}
                    zIndex={"100"}
                    minWidth={{
                      base: "calc((100vw - 26px) / 3)",
                      md: "unset",
                    }}
                    maxWidth={{
                      base: "calc((100vw - 26px) / 3)",
                      md: "unset",
                    }}
                  >
                    data
                  </Th>
                )}

                {headerRow.map((headerCell, j) => (
                  <Th
                    colSpan={headerCell.colspan}
                    minWidth={{
                      base: "calc((100vw - 26px) / 3)",
                      md: "unset",
                    }}
                    maxWidth={{
                      base: "calc((100vw - 26px) / 3)",
                      md: "unset",
                    }}
                    key={`header-cell-${j}`}
                  >
                    {headerCell.label}
                  </Th>
                ))}
              </Tr>
            ))
          )}
        </Thead>
        <Tbody
          display={{
            base: isOpen ? "table-row-group" : "none",
            md: "table-row-group",
          }}
        >
          {rows.map((row, i) => (
            <DataPointRow
              shouldShowReliability={shouldShowReliability}
              height={rowHeights[i]}
              key={i}
              row={row}
            />
          ))}
        </Tbody>
      </Table>
    );
  }
);
