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
  Image,
} from "@chakra-ui/react";
import { useWindowWidth } from "@react-hook/window-size";
import NextLink from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "@components/Header/NavLink";
import * as React from "react";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";

export const Header = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const router = useRouter();

  const { geography, geoid } = router?.query || {
    geography: undefined,
    geoid: undefined,
  };

  // fallback for About/Source pages or in case router.asPath is undefined
  let logoUrl = "/map/datatool/district";

  // Logo links to current route on map page
  if (router.pathname.startsWith("/map/") && router.asPath) {
    logoUrl = router.asPath;
  }

  // Logo links to map page with current geography re-selected
  if (router.pathname.startsWith("/data/") && geography && geoid) {
    logoUrl = `/map/datatool/${geography}?geoid=${geoid}`;
  }

  // Prefer to implement this with Chakra's useMediaQuery hook but there is a bug with it when doing SSR
  // https://github.com/chakra-ui/chakra-ui/issues/5112
  const isMobile = useWindowWidth() < 768;

  const contactUs = () => {
    ReactGA.event({
      category: "Contact",
      action: "Outbound Click",
      label: `${router.asPath}`,
    });
    if (isMobile) {
      onClose();
    }
  };

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
              maxWidth={6}
            />
          }
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
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
          bg="none"
          borderRadius={0}
          _active={{
            bg: "none",
          }}
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
                <NavLink
                  onClick={contactUs}
                  href="mailto:EDDE@planning.nyc.gov?subject=EDDE Question or Comment"
                >
                  Contact
                </NavLink>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <NextLink href={logoUrl}>
          <Box cursor="pointer">
            <Image
              src="/logo.png"
              alt="City of New York Logo"
              height={22}
              width={66}
              data-test="header-app-logo"
            />
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
        <NavLink
          href="mailto:EDDE@planning.nyc.gov?subject=EDDE Question or Comment"
          onClick={contactUs}
        >
          Contact
        </NavLink>
      </Flex>
    </Flex>
  );
};
