import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { DataPoint } from "@schemas/dataPoint";
import { DataPointCell } from "@components/DataPointCell";
import { PercentDataPointCell } from "@components/PercentDataPointCell.tsx";

interface LocationTableProps {
  selectedAreaData: Vintage;
  boroughData: Vintage;
  citywideData: Vintage;
}

export const LocationTableDesktop = ({
  selectedAreaData,
  boroughData,
  citywideData,
}: LocationTableProps) => {
  const locationData = [
    { label: "Selected Area", data: selectedAreaData },
    { label: "Borough", data: boroughData },
    { label: "Citywide", data: citywideData },
  ];

  const getEstimateCells = (cells: DataPoint[] | null) =>
    cells?.filter((cell) => cell.variance === "NONE") ?? [];

  const renderDataPoint = (dataPoint: DataPoint, key: string) =>
    ["PERCENT", "PERCENTAGE_POINT"].includes(dataPoint.measure) ? (
      <PercentDataPointCell key={key} dataPoint={dataPoint} />
    ) : (
      <DataPointCell key={key} dataPoint={dataPoint} />
    );

  const columnCount = selectedAreaData.headers[0].length;

  return (
    <Box overflowX="auto">
      <Table
        variant="striped"
        sx={{
          borderCollapse: "initial",
          borderSpacing: 0,
          fontSize: "0.875rem",
          tableLayout: "fixed",
          width: "auto",
        }}
      >
        <Thead>
          {/* Data period label */}
          <Tr>
            <Th
              rowSpan={2}
              minWidth="13.5rem"
              borderTopLeftRadius="0.75rem"
              border="none"
            />

            <Th colSpan={columnCount * locationData.length} textAlign="center">
              {selectedAreaData.label}
            </Th>
          </Tr>

          {/* Geography headers */}
          <Tr>
            {locationData.map(({ label }) => (
              <Th key={label} colSpan={columnCount}>
                {label}
              </Th>
            ))}
          </Tr>

          {/* Data headers */}
          <Tr>
            <Th>Data</Th>
            {locationData.map(({ label, data }) =>
              data.headers[0].map((header, i) => (
                <Th key={`${label}-${i}`}>{header.label}</Th>
              ))
            )}
          </Tr>
        </Thead>

        <Tbody>
          {selectedAreaData.rows.map((row, i) => (
            <Tr key={i}>
              <Td
                as="th"
                scope="row"
                fontWeight={row.isDenominator ? "700" : "400"}
                minWidth="13.5rem"
                position="sticky"
                left={0}
                zIndex={1}
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

                return cells.map((cell, j) =>
                  renderDataPoint(cell, `${label}-${i}-${j}`)
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
