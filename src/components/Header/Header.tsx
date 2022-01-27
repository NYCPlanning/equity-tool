import { Img } from "@chakra-ui/react";
import { Flex, Heading, HStack } from "@chakra-ui/react";
import { NavLink } from "@components/Header/NavLink";
import * as React from "react";

export const Header = () => (
  <Flex
    align="center"
    justify="space-between"
    as="header"
    h="4.375rem"
    backgroundColor="white"
    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    zIndex="10"
  >
    <HStack spacing={[2, 4]} h="22px" paddingLeft={[4, 6]}>
      <Img src="logo.png" alt="City of New York Logo" height={22} width={66} />
      <Heading
        as="h1"
        fontSize={["sm", "md"]}
        color="gray.600"
        fontWeight={["medium", "bold"]}
        lineHeight="none"
      >
        Equitable Development Data Tool
      </Heading>
    </HStack>
    <Flex as="nav" h="full">
      <NavLink href="/about">About</NavLink>
      <NavLink href="/methods">Methods &amp; Sources</NavLink>
      <NavLink href="#">Contact</NavLink>
    </Flex>
  </Flex>
);
