import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Spacer,
  Icon,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { CategoryMenu } from "@components/CategoryMenu";
import { GeographyInfo } from "@components/GeographyInfo";
import { useGeography } from "@hooks/useGeography";
import { useCategory } from "@hooks/useCategory";
import { Geography } from "@constants/geography";
import ReactGA from "react-ga4";
import { getBoroughName } from "@helpers/getBoroughName";

export interface ExplorerSideNavProps {
  geoid: string;
}

export const ExplorerSideNav = ({ geoid }: ExplorerSideNavProps) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const geography = useGeography();
  const category = useCategory();

  const toggleSidebar = () => {
    ReactGA.event({
      category: "Toggle Sidebar Open",
      action: "Click",
      label: (!isOpen).toString(),
    });
    onToggle();
  };

  return (
    <Flex
      flexShrink={"0"}
      direction={"column"}
      height={"full"}
      width={isOpen ? "19.25rem" : "4.25rem"}
      overflowX={"hidden"}
      pt={"4rem"}
      background={"gray.100"}
      transition="width 0.5s ease"
      display={{ base: "none", md: "flex" }}
    >
      <Box width={"19.25rem"}>
        <Flex
          align={"start"}
          mb={geography === Geography.DISTRICT ? "1.5rem" : "2.5rem"}
        >
          <Flex
            width={"4.25rem"}
            minWidth={"4.25rem"}
            direction={"column"}
            display={"flex"}
            align={"center"}
            gridGap={2}
          >
            <Center
              display={"flex"}
              borderRadius={"0.625rem"}
              background={"gray.200"}
              width="2.5rem"
              height="2.5rem"
            >
              <Icon as={FaMapMarkerAlt} w={"0.875rem"} height={"1.875rem"} />
            </Center>
            <Text
              fontSize={"0.5rem"}
              color={geography === Geography.DISTRICT ? "#2B797A" : "gray.700"}
              fontWeight={geography === Geography.DISTRICT ? "500" : "700"}
              display={isOpen ? "none" : "block"}
              textTransform={"capitalize"}
            >
              {geography === Geography.DISTRICT && `PUMA ${geoid}`}
              {geography === Geography.BOROUGH && getBoroughName(geoid)}
              {geography === Geography.CITYWIDE && "Citywide"}
            </Text>
          </Flex>
          <Box paddingRight={"1rem"}>
            <GeographyInfo
              geoid={geoid}
              geography={geography}
              fontSize={"1.25rem"}
            />
          </Box>
        </Flex>

        <CategoryMenu
          geography={geography}
          geoid={geoid}
          currentCategory={category}
          shouldDisableTooltips={isOpen}
          justify={"start"}
        />
      </Box>
      <Spacer />
      <IconButton
        px={"0.75rem"}
        background={"gray.200"}
        display={"flex"}
        borderRadius={"0rem"}
        width={"full"}
        justifyContent={"end"}
        onClick={toggleSidebar}
        aria-label="Show Categories"
        icon={
          isOpen ? (
            <ChevronLeftIcon
              mr={"0.875rem"}
              color="gray.500"
              _hover={{ color: "gray.500" }}
              w={"2.5rem"}
              h={"2.5rem"}
            />
          ) : (
            <ChevronRightIcon
              mr={"0.875rem"}
              color="gray.500"
              _hover={{ color: "gray.500" }}
              w={"2.5rem"}
              h={"2.5rem"}
            />
          )
        }
      />
    </Flex>
  );
};
