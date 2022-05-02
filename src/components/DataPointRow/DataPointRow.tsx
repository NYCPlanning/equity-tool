import { Tr, Td, TableRowProps } from "@chakra-ui/react";
import { Row } from "@schemas/row";
import { DataPointCell } from "@components/DataPointCell";
import { PercentDataPointCell } from "@components/PercentDataPointCell.tsx";

export interface DataPointRowProps extends TableRowProps {
  row: Row;
  shouldShowReliability: boolean;
}

export const DataPointRow = ({
  row,
  shouldShowReliability,
  ...props
}: DataPointRowProps) => {
  const { label, isDenominator, cells, placeholder = "" } = row;

  if (cells === null) {
    return (
      <Tr
        {...props}
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
          zIndex={"100"}
          minWidth={{ base: "calc((100vw - 26px) / 3)", md: "13.5rem" }}
          maxWidth={{ base: "calc((100vw - 26px) / 3)", md: "13.5rem" }}
          px={{ base: "0.375rem", md: "1.5rem" }}
          position={"sticky"}
          left={"0"}
        >
          {label}
        </Td>
        <Td
          minWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
          maxWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
          px={"1.5rem"}
          colSpan={5}
        >
          {placeholder}
        </Td>
      </Tr>
    );
  }

  return (
    <Tr
      {...props}
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
        zIndex={"100"}
        minWidth={{ base: "calc((100vw - 26px) / 3)", md: "13.5rem" }}
        maxWidth={{ base: "calc((100vw - 26px) / 3)", md: "13.5rem" }}
        px={{ base: "0.375rem", md: "1.5rem" }}
        position={"sticky"}
        left={"0"}
      >
        {label}
      </Td>
      {cells
        .filter((dataPoint) => {
          // If showing reliability information, show all cells
          if (shouldShowReliability) {
            return true;
          }
          // Otherwise, only show those with variance of "NONE"
          return dataPoint.variance === "NONE";
        })
        .map((dataPoint, j) =>
          ["PERCENT", "PERCENTAGE_POINT"].includes(dataPoint.measure) ? (
            <PercentDataPointCell
              key={`data-point-cell-${j}`}
              dataPoint={dataPoint}
            />
          ) : (
            <DataPointCell key={`data-point-cell-${j}`} dataPoint={dataPoint} />
          )
        )}
    </Tr>
  );
};
