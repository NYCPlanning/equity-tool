import { useState } from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Vintage } from "@schemas/vintage";
import { DataPoint } from "@schemas/dataPoint";
import { DataPointCell } from "@components/DataPointCell";
import { PercentDataPointCell } from "@components/PercentDataPointCell.tsx";
import { useTablesIsOpen } from "@contexts/TablesIsOpenContext";

export interface LocationTableMobileProps {
  selectedAreaData: Vintage;
  boroughData: Vintage;
  citywideData: Vintage;
}

export const LocationTableMobile = ({
  selectedAreaData,
  boroughData,
  citywideData,
}: LocationTableMobileProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { addSetIsOpen } = useTablesIsOpen();

  addSetIsOpen(setIsOpen);

  const locationData = [
    { label: "Selected Area", data: selectedAreaData },
    { label: "Borough", data: boroughData },
    { label: "Citywide", data: citywideData },
  ];

  const getEstimateCells = (cells: DataPoint[] | null) =>
    cells?.filter((cell) => cell.variance === "NONE") ?? [];

  const columnCount = selectedAreaData.headers[0].length;
  const totalColumns = columnCount * locationData.length + 1;

  const mobileDataColumnWidth = "7rem";
  const mobileValueColumnWidth = "7rem";

  return (
    <Box width="100%" overflowX="auto">
      <Table
        variant="striped"
        sx={{
          borderCollapse: "separate",
          borderSpacing: 0,
          fontSize: "0.875rem",
          tableLayout: "fixed",
          width: "max-content",
          minWidth: "100%",
        }}
      >
        <Thead>
          {/* Collapsible data header */}
          <Tr>
            <Th
              colSpan={totalColumns}
              onClick={() => setIsOpen(!isOpen)}
              cursor="pointer"
              borderTopLeftRadius="0.75rem"
              borderTopRightRadius="0.75rem"
              px="1rem"
              py="0.25rem"
            >
              <Flex align="center" width="100%">
                <Box width="1.5rem" flexShrink={0} />

                <Text flex="1" textAlign="center">
                  {selectedAreaData.label}
                </Text>

                <ChevronDownIcon
                  flexShrink={0}
                  transform={`rotate(${isOpen ? "0deg" : "-90deg"})`}
                  color="teal.600"
                  w="1.5rem"
                  h="1.5rem"
                />
              </Flex>
            </Th>
          </Tr>

          {/* Geography headers */}
          <Tr display={isOpen ? "table-row" : "none"}>
            <Th
              minWidth={mobileDataColumnWidth}
              width={mobileDataColumnWidth}
            />

            {locationData.map(({ label }) => (
              <Th key={label} colSpan={columnCount}>
                {label}
              </Th>
            ))}
          </Tr>

          {/* Data headers */}
          <Tr display={isOpen ? "table-row" : "none"}>
            <Th
              position="sticky"
              left={0}
              zIndex={2}
              minWidth={mobileDataColumnWidth}
              width={mobileDataColumnWidth}
            >
              Data
            </Th>

            {locationData.map(({ label, data }) =>
              data.headers[0].map((header, i) => (
                <Th
                  key={`${label}-${i}`}
                  minWidth={mobileValueColumnWidth}
                  width={mobileValueColumnWidth}
                >
                  {header.label}
                </Th>
              ))
            )}
          </Tr>
        </Thead>

        <Tbody display={isOpen ? "table-row-group" : "none"}>
          {selectedAreaData.rows.map((row, i) => (
            <Tr key={i}>
              <Td
                as="th"
                scope="row"
                fontWeight={row.isDenominator ? "700" : "400"}
                position="sticky"
                left={0}
                zIndex={1}
                minWidth={mobileDataColumnWidth}
                width={mobileDataColumnWidth}
                px="0.5rem"
              >
                {row.label}
              </Td>

              {locationData.map(({ label, data }) => {
                const geographyRow = data.rows[i];
                const cells = getEstimateCells(geographyRow?.cells ?? null);

                if (!geographyRow || geographyRow.cells === null) {
                  return (
                    <Td key={label} colSpan={columnCount}>
                      {geographyRow?.placeholder ?? "-"}
                    </Td>
                  );
                }

                return cells.map((dataPoint, j) =>
                  ["PERCENT", "PERCENTAGE_POINT"].includes(
                    dataPoint.measure
                  ) ? (
                    <PercentDataPointCell
                      key={`${label}-${i}-${j}`}
                      dataPoint={dataPoint}
                    />
                  ) : (
                    <DataPointCell
                      key={`${label}-${i}-${j}`}
                      dataPoint={dataPoint}
                    />
                  )
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
