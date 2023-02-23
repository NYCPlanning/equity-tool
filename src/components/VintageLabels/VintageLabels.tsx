import { Box, Table, Tbody, Thead, Td, Tr, Th } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import { forwardRef } from "react";

export interface VintageLabelProps {
  vintage: Vintage;
  headerHeight: number;
}

const VintageLabels = forwardRef<HTMLTableElement, VintageLabelProps>(
  ({ vintage, headerHeight }, ref) => {
    return (
      <Box
        position="sticky"
        left={0}
        zIndex={100}
        display={{ base: "none", md: "table-cell" }}
      >
        <Table
          ref={ref}
          variant="striped"
          sx={{
            paddingRight: 0,
            display: "block",
            overflowX: "initial",
            borderCollapse: "initial",
            borderSpacing: 0,
            fontSize: "0.875rem",
            tableLayout: "fixed",
            width: "auto",
          }}
        >
          <Thead>
            <Tr>
              <Th
                rowSpan={1}
                colSpan={2}
                display="table-cell"
                minWidth={"13.5rem"}
                maxWidth={"13.5rem"}
                height={headerHeight}
              ></Th>
            </Tr>
          </Thead>
          <Tbody>
            {vintage.rows.map((row, i) => (
              <Tr key={`${row.label}-${i}`}>
                <Td
                  as="th"
                  scope="row"
                  fontWeight={row.isDenominator ? "700" : "400"}
                  minWidth={{ base: "calc((100vw - 26px) / 3)", md: "13.5rem" }}
                  maxWidth={{ base: "calc((100vw - 26px) / 3)", md: "13.5rem" }}
                  px={{ md: "1.5rem" }}
                >
                  {row.label}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  }
);

VintageLabels.displayName = "VintageLables";

export { VintageLabels };
