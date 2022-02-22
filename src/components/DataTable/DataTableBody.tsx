import { ReactNode } from "react";
import { Tbody } from "@chakra-ui/react";
import { useDataTable } from ".";

export interface DataTableBodyProps {
  children: ReactNode;
}

export const DataTableBody = ({ children }: DataTableBodyProps) => {
  const { isOpen } = useDataTable();
  return (
    <Tbody
      maxW={"full"}
      display={{ base: isOpen ? "table" : "none", md: "table" }}
    >
      {children}
    </Tbody>
  );
};
