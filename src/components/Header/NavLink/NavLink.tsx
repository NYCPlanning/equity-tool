import NextLink from "next/link";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import * as React from "react";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

// We could eventually implement inner <Button> here as a variant of <Link>
// but just styling in-place here for now
export const NavLink = ({ children, href }: NavLinkProps): JSX.Element => {
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
