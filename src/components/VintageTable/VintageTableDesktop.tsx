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
    colSpans: number[];
    cells: Array<DataPoint | null>;
  }[] = [];
  vintages.forEach((vintage, i) => {
    vintage.rows.forEach((bodyRow, j) => {
      const vintagesBodyRow = vintagesBodyRows[j];
      const bodyRowCells = bodyRow.cells;
      const colSpan =
        bodyRowCells === null ? vintageHeaderTitles[i].colSpan : 1;
      const cells =
        bodyRowCells === null
          ? [bodyRowCells]
          : surveyShouldNotShowReliability
          ? (bodyRowCells.filter(
              (cell) => cell.variance === "NONE"
            ) as DataPoint[])
          : (bodyRowCells as DataPoint[]);
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
            {bodyRow.cells.map((dataPoint, j) =>
              dataPoint === null ? (
                <Td
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
