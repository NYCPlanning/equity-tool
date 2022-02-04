import NextLink from "next/link";
import { useRouter } from "next/router";
import { Button, ButtonProps } from "@chakra-ui/react";
import * as React from "react";

interface NavLinkProps extends ButtonProps {
  href: string;
}

// We could eventually implement inner <Button> here as a variant of <Link>
// but just styling in-place here for now
export const NavLink = ({
  children,
  href,
  ...buttonProps
}: NavLinkProps): JSX.Element => {
  const { pathname } = useRouter();
  return (
    <NextLink href={href} passHref>
      <Button
        bg="white"
        h={["auto", "full"]}
        w={["full", "auto"]}
        borderRadius={"none"}
        color="gray.600"
        fontWeight="medium"
        fontSize={["2xl", "md"]}
        m={0}
        px={[10, 4]}
        py={[4, 0]}
        justifyContent={["left", "center"]}
        aria-current={pathname === href ? "page" : false}
        _activeLink={{
          boxShadow: "inset 0 -2px 0 0 #2C7A7B",
          fontWeight: "bold",
          color: "gray.700",
          bg: "gray.50",
          py: [6, 0],
        }}
        _hover={{
          boxShadow: "inset 0 -2px 0 0 #2C7A7B",
          color: "gray.700",
        }}
        _focus={{
          boxShadow: "inset 0 -2px 0 0 #2C7A7B",
          color: "gray.700",
        }}
        as="a"
        {...buttonProps}
      >
        {children}
      </Button>
    </NextLink>
  );
};
