import React from "react";
import { Tag } from "@chakra-ui/react";

interface SubindicatorBinProps {
  bin: string | undefined;
}

export const SubindicatorBin = ({ bin }: SubindicatorBinProps) => {
  switch (bin) {
    case "Highest":
      return (
        <Tag ml="1rem" background="#772F7A" color="white" borderRadius="25px">
          {bin}
        </Tag>
      );
    case "Higher":
      return (
        <Tag ml="1rem" background="#BD2E89" color="white" borderRadius="25px">
          {bin}
        </Tag>
      );
    case "Intermediate":
      return (
        <Tag ml="1rem" background="#ED6CA0" color="white" borderRadius="25px">
          {bin}
        </Tag>
      );
    case "Lower":
      return (
        <Tag ml="1rem" background="#F5B6BC" color="white" borderRadius="25px">
          {bin}
        </Tag>
      );
    case "Lowest":
      return (
        <Tag ml="1rem" background="#FEEFE5" borderRadius="25px">
          {bin}
        </Tag>
      );
    default:
      return (
        <Tag ml="1rem" borderRadius="25px">
          {bin}
        </Tag>
      );
  }
};
