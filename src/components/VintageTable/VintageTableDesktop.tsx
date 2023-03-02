import { Table, Tbody, Thead, Td, Th, Tr } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { HeaderCell } from "@schemas/headerCell";
import { DataPointCell } from "@components/DataPointCell";
import { PercentDataPointCell } from "@components/PercentDataPointCell.tsx";
import { DataPoint } from "@schemas/dataPoint";

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

  // Each vintage should have a top header that spans all its columns.
  const vintageHeaderTitles: {
    label: string;
    colSpan: number;
    isChange: boolean;
  }[] = vintages.map((vintage) => {
    const headers = vintage.headers;
    // When the header is a survey and the reliability inidicators are off,
    // then the headers should take the length of its first row of headers.
    // Otherwise, it should take the length of its longest row of headers.
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

  // Each header row from every vintage needs to be collected into a cross-vintage row
  const vintagesHeaderRows: Array<HeaderCell[]> = [];
  vintages.forEach((vintage) => {
    // When data are surveys not showing reliability,
    // then only the first row of headers are collected together into a single row
    // Otherwise, each header row from every vintage is collected together into cross-vintage rows
    if (surveyShouldNotShowReliability) {
      const vintagesHeaderRow = vintagesHeaderRows[0];
      const headerRow = vintage.headers[0];
      // Initialize row or append to existing one
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

  // Each body from every vintage needs to be collected into a cross-vintage row
  // Meta contaings Data about the whole row and is based on the first vintage
  // colspans and cells contain data for each datapoint
  // When a vintage contains 'null' for its cells, the data on how many columns
  // that vintage should be is lost. The data are recoverd by looking at the
  // colSpans of the header title for that vintage.
  const vintagesBodyRows: {
    meta: {
      label: string;
      isDenominator: boolean | undefined;
      placeholder: string | undefined;
    };
    colSpans: number[];
    cells: Array<DataPoint | null>;
  }[] = [];
  vintages.forEach((vintage, i) => {
    vintage.rows.forEach((bodyRow, j) => {
      const vintagesBodyRow = vintagesBodyRows[j];
      const bodyRowCells = bodyRow.cells;
      // Unavailable data spans the whole width of its vintage.
      // All other data spans a single cell
      const colSpan =
        bodyRowCells === null ? vintageHeaderTitles[i].colSpan : 1;
      const cells =
        bodyRowCells === null
          ? // Place null body cells into array for type compatibility
            [bodyRowCells]
          : surveyShouldNotShowReliability
          ? // Filter out reliability data when not requested
            (bodyRowCells.filter(
              (cell) => cell.variance === "NONE"
            ) as DataPoint[])
          : // Otherwise, return all data as-is
            (bodyRowCells as DataPoint[]);
      // Initialize body row or append to existing one
      if (vintagesBodyRow === undefined) {
        const meta = {
          label: bodyRow.label,
          isDenominator: bodyRow.isDenominator,
          placeholder: bodyRow.placeholder,
        };
        vintagesBodyRows[j] = {
          meta,
          cells,
          colSpans: [colSpan],
        };
      } else {
        const vintagesBodyRowSpans = vintagesBodyRow.colSpans;
        const vintagesBodyRowCells = vintagesBodyRow.cells;
        vintagesBodyRows[j].cells = vintagesBodyRowCells.concat(cells);
        vintagesBodyRows[j].colSpans = vintagesBodyRowSpans.concat(colSpan);
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
          {/* Top left cornerstone */}
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
            {/* Row labels are constructed from meta data */}
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
            {/* Row data are constructed from lists of cells and col spans */}
            {bodyRow.cells.map((dataPoint, j) =>
              dataPoint === null ? (
                <Td
                  key={`data-point-cell-${j}`}
                  minWidth="unset"
                  maxWidth="unset"
                  px="1.5rem"
                  colSpan={bodyRow.colSpans[j]}
                >
                  {bodyRow.meta.placeholder}
                </Td>
              ) : ["PERCENT", "PERCENTAGE_POINT"].includes(
                  dataPoint.measure
                ) ? (
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
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

VintageTableDesktop.displayName = "VintageTableDesktop";

export { VintageTableDesktop };
