import {
  Flex,
  Heading,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useWindowWidth } from "@react-hook/window-size";
import Image from "next/image";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "@components/Header/NavLink";
import * as React from "react";
import logo from "../../../public/logo.png";

export const Header = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  // Prefer to implement this with Chakra's useMediaQuery hook but there is a bug with it when doing SSR
  // https://github.com/chakra-ui/chakra-ui/issues/5112
  const isMobile = useWindowWidth() < 640;
  return (
    <Flex
      align="center"
      justify="space-between"
      as="header"
      minH="4.375rem"
      backgroundColor="white"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      zIndex="1500"
    >
      <Flex h="full" paddingLeft={[3, 6]} align="center">
        <IconButton
          aria-label="Site Navigation"
          icon={
            <HamburgerIcon
              viewBox="3 5 20 15"
              w={"100%"}
              h={"100%"}
              color={isOpen ? "teal.600" : "gray.600"}
            />
          }
          display={["flex", "none"]}
          onClick={onToggle}
          backgroundColor={"white"}
          minWidth={6}
          h={4}
          _hover={{
            backgroundColor: "white",
            color: "teal.600",
            outline: "none",
          }}
          _focus={{
            color: "teal.600",
            outline: "none",
          }}
          mr={6}
          transform={`scale(${isOpen ? "1.125, 1.0833" : "1, 1"})`}
        />
        <Drawer
          isOpen={isOpen && isMobile}
          onClose={onClose}
          placement="left"
          size="xs"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody padding="110px 0 0">
              <Flex
                direction="column"
                align="flex-start"
                justify="flex-start"
                as="nav"
                h="full"
              >
                <NavLink onClick={onClose} href="/about">
                  About
                </NavLink>
                <NavLink onClick={onClose} href="/methods">
                  Methods &amp; Sources
                </NavLink>
                <NavLink onClick={onClose} href="#">
                  Contact
                </NavLink>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Image src={logo} alt="City of New York Logo" height={22} width={66} />
        <Heading
          as="h1"
          fontSize={["sm", "md"]}
          color="gray.600"
          fontWeight={["medium", "bold"]}
          lineHeight="none"
          marginLeft={[2, 4]}
        >
          Equitable Development Data Tool
        </Heading>
      </Flex>
      <Flex
        direction="row"
        display={["none", "flex"]}
        align="flex-start"
        justify="flex-start"
        as="nav"
        h="full"
      >
        <NavLink href="/about">About</NavLink>
        <NavLink href="/methods">Methods &amp; Sources</NavLink>
        <NavLink href="#">Contact</NavLink>
      </Flex>
    </Flex>
  );
};
