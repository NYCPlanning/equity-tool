import { ReactNode } from "react";
import { Thead, Th, Tr, Flex, Box, Text } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
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
          borderBottomLeftRadius={isOpen ? "0px" : "12px"}
          borderBottomRightRadius={isOpen ? "0px" : "12px"}
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
              {isOpen ? (
                <ChevronDownIcon
                  color="teal.600"
                  _hover={{ color: "teal.600" }}
                  w={10}
                  h={10}
                />
              ) : (
                <ChevronRightIcon
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
      {isOpen && children}
    </Thead>
  );
};
