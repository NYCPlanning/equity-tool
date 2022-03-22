import {
  Box,
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
// import Image from "next/image";
import NextLink from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "@components/Header/NavLink";
import * as React from "react";
// import logo from "../../../public/logo.png";

export const Header = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const router = useRouter();

  const { geography, geoid } = router?.query || {
    geography: undefined,
    geoid: undefined,
  };

  // fallback in case router.asPath is undefined
  let logoUrl = "/map/datatool/district";

  const isDataroute = router.pathname.startsWith("/data/");

  // Logo links to current route on map page
  if (!isDataroute && router.asPath) logoUrl = router.asPath;

  if (isDataroute && geography && geoid) {
    logoUrl = `/map/datatool/${geography}?geoid=${geoid}`;
  }

  // Prefer to implement this with Chakra's useMediaQuery hook but there is a bug with it when doing SSR
  // https://github.com/chakra-ui/chakra-ui/issues/5112
  const isMobile = useWindowWidth() < 768;
  return (
    <Flex
      align="center"
      justify="space-between"
      as="header"
      height="4.375rem"
      backgroundColor="white"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      zIndex="1500"
    >
      <Flex h="full" paddingLeft={{ base: 3, md: 6 }} align="center">
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
          display={{ base: "flex", md: "none" }}
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
        <NextLink href={logoUrl}>
          <Box cursor="pointer">
            {/* <Image
              src={logo}
              alt="City of New York Logo"
              height={22}
              width={66}
            /> */}
          </Box>
        </NextLink>
        <NextLink href={logoUrl}>
          <Heading
            as="h1"
            fontSize={{ base: "sm", md: "md" }}
            color="gray.600"
            fontWeight={{ base: "medium", md: "bold" }}
            lineHeight="none"
            marginLeft={{ base: 2, md: 4 }}
            cursor="pointer"
            data-test="header-app-title"
          >
            Equitable Development Data Tool
          </Heading>
        </NextLink>
      </Flex>
      <Flex
        direction="row"
        display={{ base: "none", md: "flex" }}
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
