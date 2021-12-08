import Image from "next/image";
import { HStack, Heading } from "@chakra-ui/react";
import logo from "../../../public/logo.png";

export const Header = () => {
  return (
    <HStack
      as="header"
      spacing={4}
      paddingX={3}
      h="4.25rem"
      backgroundColor="#fff"
      zIndex="100"
      position="fixed"
      top="0"
      left="0"
      width="100%"
    >
      <Image
        src={logo}
        alt="NYC Department of City Planning"
        height={24}
        width={48}
      />
      <Heading as="h1" fontSize="xl">
        Equity Tool
      </Heading>
    </HStack>
  );
};
