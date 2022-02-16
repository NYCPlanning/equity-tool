import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td as ChakraTd,
  TableCellProps,
  Box,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useWindowWidth } from "@react-hook/window-size";
import { Estimate } from "@type/Estimate";

const Td = (props: TableCellProps) => (
  <ChakraTd
    minW={"calc((100vw - 26px) / 3)"}
    maxW={"calc((100vw - 26px) / 3)"}
    px={"1.5rem"}
    whiteSpace={"normal"}
    {...props}
  />
);
export interface EstimateTableProps {
  shouldShowReliability: boolean;
  data: Estimate[];
}

export const EstimateTable = ({
  shouldShowReliability,
  data,
}: EstimateTableProps) => {
  const { isOpen: isDrawerExpanded, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });
  const hasPercentages = data.some((row) => row.percent);
  const isMobile = useWindowWidth() < 768;

  // Table is always expanded if on size md or larger, else is expanded if drawer is expanded
  const isOpen = isDrawerExpanded || !isMobile;
  return (
    <Box marginLeft={{ base: 3, md: 0 }} overflowX={"scroll"}>
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
            "&:first-of-type": {
              "th:first-of-type": {
                borderTopLeftRadius: "12px",
              },
              "th:last-of-type": {
                borderTopRightRadius: "12px",
              },
            },
            "&:last-of-type th": {
              minW: "calc((100vw - 26px) / 3)",
              maxW: "calc((100vw - 26px) / 3)",
              whiteSpace: "normal",
            },
          },
          "tbody tr:last-of-type": {
            "td:first-of-type": {
              borderBottomLeftRadius: "12px",
            },
            "td:last-of-type": {
              borderBottomRightRadius: "12px",
            },
          },
        }}
      >
        <Thead width={"full"}>
          <Tr>
            <Th
              onClick={onToggle}
              colSpan={shouldShowReliability ? 6 : 3}
              borderBottomLeftRadius={isOpen ? "0px" : "12px"}
              borderBottomRightRadius={isOpen ? "0px" : "12px"}
            >
              <Flex justifyContent={"center"} align={"center"}>
                <Box>
                  <Text>2000 census pums</Text>
                </Box>
                <Box
                  display={{ base: "block", md: "none" }}
                  position={"absolute"}
                  right={"1.5rem"}
                >
                  {isOpen ? (
                    <ChevronDownIcon
                      color="teal.600"
                      _hover={{ color: "teal.600" }}
                      w={10}
                      h={10}
                    />
                  ) : (
                    <ChevronLeftIcon
                      color="gray.500"
                      _hover={{ color: "gray.500" }}
                      w={10}
                      h={10}
                    />
                  )}
                </Box>
              </Flex>
            </Th>
          </Tr>
          {isOpen && (
            <>
              <Tr>
                <Th
                  display={{ base: "table-cell", md: "none" }}
                  minW={"calc((100vw - 26px) / 3)"}
                  maxW={"calc((100vw - 26px) / 3)"}
                  rowSpan={shouldShowReliability ? 2 : 1}
                  position={"sticky"}
                  left={"0"}
                  zIndex={100}
                >
                  data
                </Th>
                <Th colSpan={shouldShowReliability ? 3 : 1}>number</Th>
                {hasPercentages && (
                  <Th colSpan={shouldShowReliability ? 2 : 1}>percent</Th>
                )}
              </Tr>
              {shouldShowReliability && (
                <Tr>
                  <Th>estimate</Th>
                  <Th>moe</Th>
                  <Th>cv</Th>
                  {hasPercentages && (
                    <>
                      <Th>estimate</Th>
                      <Th>moe</Th>
                    </>
                  )}
                </Tr>
              )}
            </>
          )}
        </Thead>
        {isOpen && (
          <Tbody maxW={"full"} display={"table"}>
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
                {row.percent && (
                  <>
                    <Td isNumeric>{row.percent.value}</Td>
                    {shouldShowReliability && (
                      <Td isNumeric>{row.percent.marginOfError}</Td>
                    )}
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </Box>
  );
};
