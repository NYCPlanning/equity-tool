import { Tr, TableRowProps } from "@chakra-ui/react";
import { useDataTable } from ".";

export const DataTableHeadRow = (props: TableRowProps) => {
  const { isOpen } = useDataTable();
  return (
    <Tr
      display={{
        base: isOpen ? "table-row" : "none",
        md: "table-row",
      }}
      {...props}
    />
  );
};