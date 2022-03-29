import { Td } from "@chakra-ui/react";
import { DataPoint } from "@schemas/dataPoint";

export interface DataPointCellProps {
  dataPoint: DataPoint;
}

export const DataPointCell = ({ dataPoint }: DataPointCellProps) => {
  const { value, measure } = dataPoint;
  let formattedValue = "";
  if (value === null) {
    formattedValue = measure === "PERCENT" ? "0.0%" : "-";
  } else {
    formattedValue = value.toLocaleString(undefined, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
    });
    if (measure === "PERCENT") {
      formattedValue = formattedValue + "%";
    }
  }
  return (
    <Td
      isNumeric
      minWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
      maxWidth={{ base: "calc((100vw - 26px) / 3)", md: "unset" }}
      px={"1.5rem"}
    >
      {formattedValue}
    </Td>
  );
};
