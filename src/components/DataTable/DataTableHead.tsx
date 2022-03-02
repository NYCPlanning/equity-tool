import { ReactNode } from "react";
import { Thead, Th, Tr, Flex, Box, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDataTable } from ".";

export interface DataTableHeadProps {
  children: ReactNode;
  heading: string;
  colSpan: number;
}

export const DataTableHead = ({
  children,
  heading,
  colSpan,
}: DataTableHeadProps) => {
  const { isOpen, onToggle } = useDataTable();
  return (
    <Thead width={"full"}>
      <Tr>
        <Th
          onClick={onToggle}
          colSpan={colSpan}
          borderTopLeftRadius={{
            base: "0.75rem",
            md: "0rem",
          }}
          borderTopRightRadius={{
            base: "0.75rem",
            md: "0rem",
          }}
          borderBottomLeftRadius={{
            base: isOpen ? "0rem" : "0.75rem",
            md: "0rem",
          }}
          borderBottomRightRadius={{
            base: isOpen ? "0rem" : "0.75rem",
            md: "0rem",
          }}
        >
          <Flex justifyContent={"center"} align={"center"}>
            <Box>
              <Text>{heading}</Text>
            </Box>
            <Box
              display={{ base: "block", md: "none" }}
              position={"absolute"}
              left={"1.5rem"}
            >
              <ChevronDownIcon
                transform={`rotate(${isOpen ? "0deg" : "-90deg"})`}
                color="teal.600"
                _hover={{ color: "teal.600" }}
                w={"2.5rem"}
                h={"2.5rem"}
              />
            </Box>
          </Flex>
        </Th>
      </Tr>
      {children}
    </Thead>
  );
};
