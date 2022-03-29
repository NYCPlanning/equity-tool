import { Tr, Td, TableRowProps } from "@chakra-ui/react";
import { Row } from "@schemas/row";
import { DataPointCell } from "@components/DataPointCell";

export interface DataPointRowProps extends TableRowProps {
  row: Row;
}

export const DataPointRow = ({ row, ...props }: DataPointRowProps) => {
  const { label, isDenominator, cells } = row;
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
        minWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
        maxWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
        px={{ base: "0.375rem", md: "1.5rem" }}
        position={"sticky"}
        left={"0"}
      >
        {label}
      </Td>
      {cells.map((dataPoint, j) => (
        <DataPointCell key={`data-point-cell-${j}`} dataPoint={dataPoint} />
      ))}
    </Tr>
  );
};
