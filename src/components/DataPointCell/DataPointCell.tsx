import { Td } from "@chakra-ui/react";
import { DataPoint } from "@schemas/dataPoint";

export interface DataPointCellProps {
  dataPoint: DataPoint;
}

export const DataPointCell = ({ dataPoint }: DataPointCellProps) => {
  let formattedValue = dataPoint.value.toLocaleString();
  if (dataPoint.type === "PERCENT") {
    formattedValue = `${formattedValue}%`;
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
