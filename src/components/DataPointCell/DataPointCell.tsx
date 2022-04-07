import { Td } from "@chakra-ui/react";
import { DataPoint } from "@schemas/dataPoint";

export interface DataPointCellProps {
  dataPoint: DataPoint;
  isReliable: boolean;
}

export const DataPointCell = ({
  dataPoint,
  isReliable,
}: DataPointCellProps) => {
  const { value, measure, variance } = dataPoint;
  const roundTo = measure === "PERCENT" || variance === "CV" ? 1 : 0;
  let formattedValue = "";
  if (value === null) {
    formattedValue = "-";
  } else {
    formattedValue = value.toLocaleString(undefined, {
      maximumFractionDigits: roundTo,
      minimumFractionDigits: roundTo,
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
      color={isReliable ? "gray.800" : "gray.400"}
    >
      {formattedValue}
    </Td>
  );
};
