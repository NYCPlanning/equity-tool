import NextLink from "next/link";
import { useRouter } from "next/router";
import { Button, ButtonProps } from "@chakra-ui/react";

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
        h={{ base: "auto", md: "full" }}
        w={{ base: "full", md: "auto" }}
        borderRadius={"none"}
        color="gray.600"
        fontWeight="medium"
        fontSize={{ base: "2xl", md: "md" }}
        m={0}
        px={{ base: 10, md: 4 }}
        py={{ base: 4, md: 0 }}
        justifyContent={{ base: "left", md: "center" }}
        aria-current={pathname === href ? "page" : false}
        _activeLink={{
          boxShadow: "inset 0 -2px 0 0 #2C7A7B",
          fontWeight: "bold",
          color: "gray.700",
          bg: "gray.50",
          py: { base: 6, md: 0 },
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
