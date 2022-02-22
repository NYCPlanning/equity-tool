import { Tr, Th, Td } from "@chakra-ui/react";
import {
  DataTable,
  DataTableHead,
  DataTableBody,
  DataTableHeadRow,
} from "@components/DataTable";
import { Estimate } from "@type/Estimate";

export interface EstimateTableProps {
  shouldShowReliability: boolean;
  data: Estimate[];
}

export const EstimateTable = ({
  shouldShowReliability,
  data,
}: EstimateTableProps) => {
  const hasPercentages = data.some((row) => row.percentage);

  return (
    <DataTable>
      <DataTableHead
        colSpan={shouldShowReliability ? 6 : 3}
        heading="2000 census pums"
      >
        <DataTableHeadRow>
          <Th
            display={{ base: "table-cell", md: "none" }}
            rowSpan={shouldShowReliability ? 2 : 1}
            position={"sticky"}
            left={"0"}
            zIndex={100}
          >
            data
          </Th>
          <Th colSpan={shouldShowReliability ? 3 : undefined}>number</Th>
          {hasPercentages && (
            <Th colSpan={shouldShowReliability ? 2 : undefined}>percent</Th>
          )}
        </DataTableHeadRow>
        {shouldShowReliability && (
          <DataTableHeadRow>
            <Th>estimate</Th>
            <Th>moe</Th>
            <Th>cv</Th>
            {hasPercentages && (
              <>
                <Th>estimate</Th>
                <Th>moe</Th>
              </>
            )}
          </DataTableHeadRow>
        )}
      </DataTableHead>
      <DataTableBody>
        {data.map((row) => (
          <Tr key={row.id}>
            <Td
              textAlign={"start"}
              display={{ base: "table-cell", md: "none" }}
              px={"0.375rem"}
              position={"sticky"}
              left={"0"}
              zIndex={"100"}
            >
              {row.label}
            </Td>
            <Td isNumeric>{row.datum.value}</Td>
            {shouldShowReliability && (
              <>
                <Td isNumeric>{row.datum.marginOfError}</Td>
                <Td isNumeric>{row.datum.coefficientOfVariation}</Td>
              </>
            )}
            {row.percentage && (
              <>
                <Td isNumeric>{row.percentage.value}</Td>
                {shouldShowReliability && (
                  <Td isNumeric>{row.percentage.marginOfError}</Td>
                )}
              </>
            )}
          </Tr>
        ))}
      </DataTableBody>
    </DataTable>
  );
};
