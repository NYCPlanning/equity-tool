import { Td } from "@chakra-ui/react";
import { DataPoint } from "@schemas/dataPoint";

export interface PercentDataPointCellProps {
  dataPoint: DataPoint;
}

export const PercentDataPointCell = ({
  dataPoint,
}: PercentDataPointCellProps) => {
  const { value, measure, isReliable = true } = dataPoint;
  let formattedValue = "";
  if (value === null) {
    formattedValue = "";
  } else {
    formattedValue = value.toLocaleString(undefined, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    });
    if (measure === "PERCENT") {
      formattedValue = `${formattedValue}%`;
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
