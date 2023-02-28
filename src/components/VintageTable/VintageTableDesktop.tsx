import { Table, Tbody, Thead, Td, Th, Tr } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { HeaderCell } from "@schemas/headerCell";
import { Cells } from "@schemas/cells";

export interface VintageTableDesktopProps {
  vintages: Vintage[];
}

const VintageTableDesktop = ({ vintages }: VintageTableDesktopProps) => {
  const vintageLabels = vintages.map((vintage) => vintage.label);
  const vintagesHeaderRows: Array<HeaderCell[]> = [];
  vintages.forEach((vintage) => {
    vintage.headers.forEach((headerRow, i) => {
      const vintagesHeaderRow = vintagesHeaderRows[i];
      vintagesHeaderRow
        ? (vintagesHeaderRows[i] = vintagesHeaderRow.concat(headerRow))
        : (vintagesHeaderRows[i] = headerRow);
    });
  });

  const vintagesBodyRows: Array<
    [{ label: string; isDenominator: boolean | undefined }, Cells]
  > = [];
  vintages.forEach((vintage) => {
    vintage.rows.forEach((bodyRow, i) => {
      const vintagesBodyRow = vintagesBodyRows[i];
      const bodyRowCells = bodyRow.cells ?? [];
      if (vintagesBodyRow !== undefined) {
        const vintagesBodyRowCells = vintagesBodyRow[1] ?? [];
        vintagesBodyRows[i][1] = vintagesBodyRowCells.concat(bodyRowCells);
      } else {
        const rowLabel = {
          label: bodyRow.label,
          isDenominator: bodyRow.isDenominator,
        };
        vintagesBodyRows[i] = [rowLabel, bodyRowCells];
      }
    });
  });

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th></Th>
          {vintageLabels.map((label) => (
            <Th key={`vintage-${label}`}>{label}</Th>
          ))}
        </Tr>
        {vintagesHeaderRows.map((headerCells, i) => (
          <Tr key={`vintage-row-${i}`}>
            <Th></Th>
            {headerCells.map((headerCell, i) => (
              <Th key={`header-cell-${headerCell.label}-${i}`}>
                {headerCell.label}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {vintagesBodyRows.map((bodyRow, i) => (
          <Tr key={i}>
            <Td>{bodyRow[0].label}</Td>
            {bodyRow[1]?.map((cell, i) => (
              <Td key={i}>{cell.value}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

VintageTableDesktop.displayName = "VintageTableDesktop";

export { VintageTableDesktop };
