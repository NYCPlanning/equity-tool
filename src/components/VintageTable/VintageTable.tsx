import {
  Flex,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { DataPointCell } from "@components/DataPointCell";
import { Vintage } from "@schemas/vintage";

export interface VintageTableProps {
  vintage: Vintage;
}

export const VintageTable = ({ vintage }: VintageTableProps) => {
  const { rows, headers, label } = vintage;
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });
  return (
    <Table
      variant="striped"
      sx={{
        paddingRight: { base: 3, md: 0 },
        display: "block",
        overflowX: { base: "auto", md: "hidden" },
        borderCollapse: "initial",
        borderSpacing: 0,
        fontSize: "0.875rem",
        tableLayout: "fixed",
      }}
    >
      <Thead>
        <Tr>
          <Th
            rowSpan={headers.length + 1}
            display={{ base: "none", md: "table-cell" }}
            borderTopLeftRadius={"0.75rem"}
            border={"none"}
          ></Th>
          <Th
            onClick={onToggle}
            colSpan={headers[0].length + 1}
            borderTopLeftRadius={{ base: "0.75rem", md: "0rem" }}
            borderTopRightRadius={"0.75rem"}
            borderBottomLeftRadius={{
              base: isOpen ? "0rem" : "0.75rem",
              md: "0rem",
            }}
            borderBottomRightRadius={{
              base: isOpen ? "0rem" : "0.75rem",
              md: "0rem",
            }}
            px={"1rem"}
            minWidth={{ base: "calc(100vw - 26px)", md: "auto" }}
            maxWidth={{ base: "calc(100vw - 26px)", md: "auto" }}
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
        {headers.map((headerRow, i, headers) => (
          <Tr
            display={{ base: isOpen ? "table-row" : "none", md: "table-row" }}
            key={`header-row-${i}`}
          >
            {i === 0 && (
              <Th
                rowSpan={headers.length}
                display={{ base: "table-cell", md: "none" }}
                position={"sticky"}
                left={"0"}
                zIndex={"100"}
                minWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
                maxWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
              >
                data
              </Th>
            )}
            {headerRow.map((headerCell, j) => (
              <Th
                colSpan={headerCell.colspan}
                minWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
                maxWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
                key={`header-cell-${j}`}
              >
                {headerCell.label}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody
        display={{
          base: isOpen ? "table-row-group" : "none",
          md: "table-row-group",
        }}
      >
        {rows.map((row, i) => {
          const { label, isDenominator, cells } = row;
          return (
            <Tr
              key={`body-row-${i}`}
              _last={{
                th: {
                  borderBottomLeftRadius: { base: "0.75rem", md: "0rem" },
                },
                "td:last-of-type": {
                  borderBottomRightRadius: {
                    base: "0.75rem",
                    md: "0rem",
                  },
                },
              }}
            >
              <Td
                as="th"
                scope="row"
                fontWeight={isDenominator ? "700" : "400"}
                position={"sticky"}
                left={"0"}
                zIndex={"100"}
                minWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
                maxWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
                px={{ base: "0.375rem", md: "1.5rem" }}
              >
                {label}
              </Td>
              {cells.map((dataPoint, j) => (
                <DataPointCell
                  key={`data-point-cell-${j}`}
                  dataPoint={dataPoint}
                />
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
