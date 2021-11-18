import { Flex, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    bg="gray.50"
    color="black"
    {...props}
  />
);
