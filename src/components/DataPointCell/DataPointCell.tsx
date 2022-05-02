import { Td } from "@chakra-ui/react";
import { DataPoint } from "@schemas/dataPoint";

export interface DataPointCellProps {
  dataPoint: DataPoint;
}

export const DataPointCell = ({ dataPoint }: DataPointCellProps) => {
  const { value, variance, isReliable = true } = dataPoint;

  let formattedValue = "";
  if (value === null) {
    formattedValue = variance === "NONE" ? "-" : "";
  } else {
    let scale = 0;
    if (variance === "CV") {
      scale = 1;
    } else if (typeof dataPoint.scale !== "undefined") {
      scale = dataPoint.scale;
    }
    // const roundTo = variance === "CV" ? 1 : 0;
    formattedValue = value.toLocaleString(undefined, {
      maximumFractionDigits: scale,
      minimumFractionDigits: scale,
    });

    if (dataPoint?.coding === "TOP") {
      formattedValue = `${formattedValue}+`;
    } else if (dataPoint?.coding === "BOTTOM") {
      formattedValue = `${formattedValue}-`;
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
