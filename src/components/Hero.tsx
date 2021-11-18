import { Flex, Heading } from "@chakra-ui/react";

export const Hero = ({ title }: { title: string }) => (
  <Flex
    as="header"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    bgGradient="linear(to-l, #7928CA, #FF0080)"
    bgClip="text"
  >
    <Heading fontSize="6vw">{title}</Heading>
  </Flex>
);
