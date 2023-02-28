import { Table, Tbody, Thead, Th, Tr } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { HeaderCell } from "@schemas/headerCell";

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
