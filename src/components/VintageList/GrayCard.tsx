import { Box } from "@chakra-ui/react";

const GrayCard = () => (
  <Box
    backgroundColor="gray.50"
    position="absolute"
    height="100%"
    minWidth={{ base: "calc((100vw - 26px) / 3)", md: "13.5rem" }}
    maxWidth={{ base: "calc((100vw - 26px) / 3)", md: "13.5rem" }}
    display={{ base: "none", md: "block" }}
  />
);

GrayCard.displayName = "GrayCard";

export { GrayCard };
