import { Td } from "@chakra-ui/react";
import { DataPoint } from "@schemas/dataPoint";

export interface PercentDataPointCellProps {
  dataPoint: DataPoint;
  isReliable: boolean;
}

export const PercentDataPointCell = ({
  dataPoint,
  isReliable,
}: PercentDataPointCellProps) => {
  const { value } = dataPoint;
  let formattedValue = "";
  if (value === null) {
    formattedValue = "";
  } else {
    formattedValue =
      value.toLocaleString(undefined, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
      }) + "%";
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
