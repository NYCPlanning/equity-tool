import { Table, Tbody, Thead, Th, Tr } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { HeaderCell } from "@schemas/headerCell";
import { Row } from "@schemas/row";
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

  const vintagesBodyRows: Array<[{label: string, isDenominator: boolean | undefined}, Cells]> = [];
  vintages.forEach(vintage => {
    vintage.rows.forEach((bodyRow, i) => {
      const vintagesBodyRow = vintagesBodyRows[i];
      const bodyRowCells = bodyRow.cells ?? [];
      if(vintagesBodyRow !== undefined) {
        const vintagesBodyRowCells = vintagesBodyRow[1] ?? [];
        vintagesBodyRows[i][1] = vintagesBodyRowCells.concat(bodyRowCells);
      } else {
        const rowLabel = {
          label: bodyRow.label,
          isDenominator: bodyRow.isDenominator
        }
        vintagesBodyRows[i] = [
          rowLabel,
          bodyRowCells
        ]
      }
    })
  })

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          {vintageLabels.map((label) => (
            <Th key={`vintage-${label}`}>{label}</Th>
          ))}
        </Tr>
        {vintagesHeaderRows.map((headerCells, i) => (
          <Tr key={`vintage-row-${i}`}>
            {headerCells.map((headerCell, i) => (
              <Th key={`header-cell-${headerCell.label}-${i}`}>
                {headerCell.label}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody></Tbody>
    </Table>
  );
};

VintageTableDesktop.displayName = "VintageTableDesktop";

export { VintageTableDesktop };
