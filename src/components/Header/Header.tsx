import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Flex, Heading, HStack, Button } from "@chakra-ui/react";
import logo from "../../../public/logo.png";
import * as React from "react";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

// We could eventually implement inner <Button> here as a variant of <Link>
// but just styling in-place here for now
const NavLink = ({ children, href }: NavLinkProps): JSX.Element => {
  const { pathname } = useRouter();
  return (
    <NextLink href={href} passHref>
      <Button
        bg="white"
        h="full"
        borderRadius={"none"}
        color="gray.600"
        fontWeight="medium"
        m={0}
        aria-current={pathname === href ? "page" : false}
        _activeLink={{
          boxShadow: "inset 0 -2px 0 0 #2C7A7B",
          fontWeight: "bold",
          color: "gray.700",
        }}
        _hover={{
          boxShadow: "inset 0 -2px 0 0 #2C7A7B",
          color: "gray.700",
        }}
        as="a"
      >
        {children}
      </Button>
    </NextLink>
  );
};

export const Header = () => {
  return (
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
        <Image src={logo} alt="City of New York Logo" height={22} width={66} />
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
};
