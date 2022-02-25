import NextLink from "next/link";
import { ReactNode } from "react";
import {
  Button,
  ButtonProps,
  Icon as ChakraIcon,
  Center,
} from "@chakra-ui/react";

interface CategoryMenuLinkProps extends ButtonProps {
  href: string;
  icon: ReactNode;
}

export const CategoryMenuLink = ({
  children,
  href,
  icon,
  isActive,
  ...buttonProps
}: CategoryMenuLinkProps): JSX.Element => {
  const Icon = () => (
    <Center
      boxSize={"2.25rem"}
      borderRadius="50%"
      background={"teal.600"}
      color={"gray.200"}
      my={"0.625rem"}
      fontSize={"1.125rem"}
    >
      {icon}
    </Center>
  );

  return (
    <NextLink href={href} passHref>
      <Button
        display={"flex"}
        justifyContent={"start"}
        flexDirection={{ base: "column", md: "row" }}
        leftIcon={<ChakraIcon w={"2.25rem"} h={"2.25rem"} as={Icon} />}
        iconSpacing={{ base: "0rem", md: "1rem" }}
        bg="inherit"
        w={{ base: "auto", md: "100%" }}
        minW={"4.75rem"}
        h={"auto"}
        borderRadius={{ base: "0.25rem", md: "none" }}
        color="gray.700"
        fontWeight="400"
        fontSize={{ base: "0.625rem", md: "1rem" }}
        whiteSpace={"normal"}
        textAlign={{ base: "center", md: "left" }}
        px={{ base: "0.25rem", md: "1rem" }}
        py={{ base: "0.5rem", md: "0rem" }}
        isActive={isActive}
        aria-current={isActive ? "page" : false}
        _activeLink={{
          fontWeight: "bold",
          color: "gray.700",
          bg: "gray.200",
        }}
        _hover={{
          background: "rgba(56, 178, 172, 0.1)",
          fontWeight: "700",
        }}
        _focus={{
          background: "rgba(56, 178, 172, 0.1)",
          fontWeight: "700",
        }}
        as="a"
        {...buttonProps}
      >
        {children}
      </Button>
    </NextLink>
  );
};
