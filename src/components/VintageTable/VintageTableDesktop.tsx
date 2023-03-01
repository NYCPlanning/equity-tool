import { Table, Tbody, Thead, Td, Th, Tr } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { HeaderCell } from "@schemas/headerCell";
import { Cells } from "@schemas/cells";
import { DataPointCell } from "@components/DataPointCell";
import { PercentDataPointCell } from "@components/PercentDataPointCell.tsx";

export interface VintageTableDesktopProps {
  vintages: Vintage[];
  shouldShowReliability: boolean;
  isSurvey: boolean;
}

const VintageTableDesktop = ({
  vintages,
  shouldShowReliability,
  isSurvey,
}: VintageTableDesktopProps) => {
  const surveyShouldNotShowReliability = isSurvey && !shouldShowReliability;
  const vintageHeaderTitles: {
    label: string;
    colSpan: number;
    isChange: boolean;
  }[] = vintages.map((vintage) => {
    const headers = vintage.headers;
    const titleColSpan = surveyShouldNotShowReliability
      ? headers[0].length
      : headers.reduce(
          (record, curr) => (curr.length > record ? curr.length : record),
          0
        );
    return {
      label: vintage.label,
      colSpan: titleColSpan,
      isChange: vintage.isChange,
    };
  });
  const vintagesHeaderRows: Array<HeaderCell[]> = [];
  vintages.forEach((vintage) => {
    if (surveyShouldNotShowReliability) {
      const vintagesHeaderRow = vintagesHeaderRows[0];
      const headerRow = vintage.headers[0];
      vintagesHeaderRow === undefined
        ? (vintagesHeaderRows[0] = headerRow)
        : (vintagesHeaderRows[0] = vintagesHeaderRow.concat(headerRow));
    } else {
      vintage.headers.forEach((headerRow, i) => {
        const vintagesHeaderRow = vintagesHeaderRows[i];
        vintagesHeaderRow === undefined
          ? (vintagesHeaderRows[i] = headerRow)
          : (vintagesHeaderRows[i] = vintagesHeaderRow.concat(headerRow));
      });
    }
  });

  const vintagesBodyRows: {
    meta: {
      label: string;
      isDenominator: boolean | undefined;
      placeholder: string | undefined;
    };
    cells: Cells;
  }[] = [];
  vintages.forEach((vintage) => {
    vintage.rows.forEach((bodyRow, i) => {
      const vintagesBodyRow = vintagesBodyRows[i];
      const bodyRowCells = bodyRow.cells ?? [];
      const cells = surveyShouldNotShowReliability
        ? bodyRowCells.filter((cell) => cell.variance === "NONE")
        : bodyRowCells;
      if (vintagesBodyRow === undefined) {
        const meta = {
          label: bodyRow.label,
          isDenominator: bodyRow.isDenominator,
          placeholder: bodyRow.placeholder,
        };
        vintagesBodyRows[i] = {
          meta,
          cells,
        };
      } else {
        const vintagesBodyRowCells = vintagesBodyRow.cells ?? [];
        vintagesBodyRows[i].cells = vintagesBodyRowCells.concat(cells!);
      }
    });
  });

  return (
    <Table
      variant="striped"
      sx={{
        paddingRight: 0,
        display: "block",
        overflowX: "initial",
        borderCollapse: "initial",
        borderSpacing: 0,
        fontSize: "0.875rem",
        tableLayout: "fixed",
        width: "auto",
      }}
    >
      <Thead>
        <Tr display="table-row">
          <Th
            rowSpan={vintagesHeaderRows.length + 1}
            minWidth="13.5rem"
            maxWidth="13.5rem"
            borderTopLeftRadius="0.75rem"
            border="none"
          ></Th>
          {vintageHeaderTitles.map((headerTitle) => (
            <Th
              key={`vintage-${headerTitle.label}`}
              colSpan={headerTitle.colSpan}
              minWidth={
                isSurvey && shouldShowReliability
                  ? "30.5rem"
                  : headerTitle.isChange
                  ? "29.25rem"
                  : "15.375rem"
              }
              maxWidth={
                isSurvey && shouldShowReliability
                  ? "30.5rem"
                  : headerTitle.isChange
                  ? "29.25rem"
                  : "15.375rem"
              }
            >
              {headerTitle.label}
            </Th>
          ))}
        </Tr>
        {vintagesHeaderRows.map((headerCells, i) => (
          <Tr key={`vintage-row-${i}`} display="table-row">
            {headerCells.map((headerCell, i) => (
              <Th
                key={`header-cell-${headerCell.label}-${i}`}
                colSpan={
                  surveyShouldNotShowReliability ? 1 : headerCell.colspan
                }
                minWidth="unset"
                maxWidth="unset"
              >
                {headerCell.label}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody display="table-row-group">
        {vintagesBodyRows.map((bodyRow, i) => (
          <Tr key={i}>
            <Td
              as="th"
              scope="row"
              fontWeight={bodyRow.meta.isDenominator ? "700" : "400"}
              zIndex={100}
              minWidth="13.5rem"
              maxWidth="13.5rem"
              px="1.5rem"
              position="sticky"
              left={0}
            >
              {bodyRow.meta.label}
            </Td>
            {bodyRow.cells ? (
              bodyRow.cells.map((dataPoint, j) =>
                ["PERCENT", "PERCENTAGE_POINT"].includes(dataPoint.measure) ? (
                  <PercentDataPointCell
                    key={`data-point-cell-${j}`}
                    dataPoint={dataPoint}
                  />
                ) : (
                  <DataPointCell
                    key={`data-point-cell-${j}`}
                    dataPoint={dataPoint}
                  />
                )
              )
            ) : (
              <Td minWidth="unset" maxWidth="unset" px="1.5rem" colSpan={5}>
                {bodyRow.meta.placeholder}
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

VintageTableDesktop.displayName = "VintageTableDesktop";

export { VintageTableDesktop };
