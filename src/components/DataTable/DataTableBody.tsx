import { ReactNode } from "react";
import { Tbody } from "@chakra-ui/react";
import { useDataTable } from ".";

export interface DataTableBodyProps {
  children: ReactNode;
}

export const DataTableBody = ({ children }: DataTableBodyProps) => {
  const { isOpen } = useDataTable();
  return isOpen ? (
    <Tbody maxW={"full"} display={"table"}>
      {children}
    </Tbody>
  ) : null;
};
