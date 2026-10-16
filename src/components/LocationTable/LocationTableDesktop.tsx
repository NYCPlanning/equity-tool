import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { DataPoint } from "@schemas/dataPoint";
import { DataPointCell } from "@components/DataPointCell";
import { PercentDataPointCell } from "@components/PercentDataPointCell.tsx";

interface LocationTableProps {
  selectedVintage: Vintage;
  boroughVintage: Vintage;
  citywideVintage: Vintage;
}

export const LocationTableDesktop = ({
  selectedVintage,
  boroughVintage,
  citywideVintage,
}: LocationTableProps) => {
  const vintages = [
    { label: "Selected Area", vintage: selectedVintage },
    { label: "Borough", vintage: boroughVintage },
    { label: "Citywide", vintage: citywideVintage },
  ];

  const getEstimateCells = (cells: DataPoint[] | null) =>
    cells?.filter((cell) => cell.variance === "NONE") ?? [];

  const renderDataPoint = (dataPoint: DataPoint, key: string) =>
    ["PERCENT", "PERCENTAGE_POINT"].includes(dataPoint.measure) ? (
      <PercentDataPointCell key={key} dataPoint={dataPoint} />
    ) : (
      <DataPointCell key={key} dataPoint={dataPoint} />
    );

  const columnCount = selectedVintage.headers[0].length;

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
          {/* Vintage label */}
          <Tr>
            <Th
              rowSpan={2}
              minWidth="13.5rem"
              borderTopLeftRadius="0.75rem"
              border="none"
            />

            <Th colSpan={columnCount * vintages.length} textAlign="center">
              {selectedVintage.label}
            </Th>
          </Tr>

          {/* Geography headers */}
          <Tr>
            {vintages.map(({ label }) => (
              <Th key={label} colSpan={columnCount}>
                {label}
              </Th>
            ))}
          </Tr>

          {/* Data headers */}
          <Tr>
            <Th>Data</Th>
            {vintages.map(({ label, vintage }) =>
              vintage.headers[0].map((header, i) => (
                <Th key={`${label}-${i}`}>{header.label}</Th>
              ))
            )}
          </Tr>
        </Thead>

        <Tbody>
          {selectedVintage.rows.map((row, i) => (
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

              {vintages.map(({ label, vintage }) => {
                const geographyRow = vintage.rows[i];
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
