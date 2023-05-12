import React from "react";
import { Tag } from "@chakra-ui/react";
import { NtaIndex } from "@hooks/useNtaIndex";

interface SubindicatorBinProps {
  bin: NtaIndex | null;
}

export const SubindicatorBin = ({ bin }: SubindicatorBinProps) => {
  switch (bin) {
    case "Highest":
      return (
        <Tag
          ml="1rem"
          background="rgba(119, 47, 122, 0.2)"
          color="gray.700"
          border="1px solid rgba(119, 47, 122, 1)"
          borderRadius="25px"
        >
          {bin}
        </Tag>
      );
    case "Higher":
      return (
        <Tag
          ml="1rem"
          background="rgba(189, 46, 137, 0.2)"
          color="gray.700"
          border="1px solid rgba(189, 46, 137, 1)"
          borderRadius="25px"
        >
          {bin}
        </Tag>
      );
    case "Intermediate":
      return (
        <Tag
          ml="1rem"
          background="rgba(237, 108, 160, 0.2)"
          color="gray.700"
          border="1px solid rgba(237, 108, 160, 1)"
          borderRadius="25px"
        >
          {bin}
        </Tag>
      );
    case "Lower":
      return (
        <Tag
          ml="1rem"
          background="rgba(245, 182, 188, 0.2)"
          color="gray.700"
          border="1px solid rgba(245, 182, 188, 1)"
          borderRadius="25px"
        >
          {bin}
        </Tag>
      );
    case "Lowest":
      return (
        <Tag
          ml="1rem"
          background="rgba(254, 239, 229, 0.2)"
          color="gray.700"
          border="1px solid rgba(254, 239, 229, 1)"
          borderRadius="25px"
        >
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
