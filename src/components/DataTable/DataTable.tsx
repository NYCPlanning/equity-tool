import { ReactNode, createContext, useContext } from "react";
import { Box, Table, useDisclosure } from "@chakra-ui/react";

export interface DataTableProps {
  children: ReactNode;
}

export type DataTableContextReturn = Pick<
  ReturnType<typeof useDisclosure>,
  "isOpen" | "onToggle"
>;

const DataTableContext = createContext<DataTableContextReturn | undefined>(
  undefined
);

export const useDataTable = () => {
  const context = useContext(DataTableContext);
  if (!context) throw new Error("DataTableContext Provider not found");
  return context as DataTableContextReturn;
};

export const DataTable = ({ children }: DataTableProps) => {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <DataTableContext.Provider value={{ isOpen, onToggle }}>
      <Box marginLeft={{ base: "0.75rem", md: 0 }} overflowX={"scroll"}>
        <Table
          variant="striped"
          sx={{
            paddingRight: { base: 3, md: 0 },
            display: "block",
            overflowX: "auto",
            borderCollapse: "initial",
            borderSpacing: 0,
            fontSize: "0.875rem",
            whiteSpace: "nowrap",
            "thead tr": {
              th: {
                minW: "calc((100vw - 26px) / 3)",
                maxW: "calc((100vw - 26px) / 3)",
                whiteSpace: "normal",
              },
            },
            tbody: {
              td: {
                minW: "calc((100vw - 26px) / 3)",
                maxW: "calc((100vw - 26px) / 3)",
                whiteSpace: "normal",
                px: "1.5rem",
              },
              "tr:last-of-type": {
                "td:first-of-type": {
                  borderBottomLeftRadius: "0.75rem",
                },
                "td:last-of-type": {
                  borderBottomRightRadius: "0.75rem",
                },
              },
            },
          }}
        >
          {children}
        </Table>
      </Box>
    </DataTableContext.Provider>
  );
};
