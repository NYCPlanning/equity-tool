import { useState } from "react";
import { Heading, Box, Center, IconButton, Flex } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

interface MobileDrawerProps {
  title: string | null;
  children?: React.ReactNode;
}

export const MobileDrawer = ({ title, children }: MobileDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      display={{
        base: "block",
        lg: "none",
      }}
      height="100vh"
      width="100%"
      position="fixed"
      top={isOpen ? "6rem" : "100vh"}
      marginTop={isOpen ? "auto" : "-7.875rem"}
      paddingBottom="6rem"
      left="0"
      zIndex="900"
      bg="white"
      data-cy="mobileDrawer"
    >
      <Flex direction="column" height="100%">
        <Flex
          direction="row"
          justifyContent="space-between"
          height="4.125rem"
          flex="shrink"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          cursor="pointer"
        >
          <Box height="100%" p="0 1rem">
            <Center h="100%">
              <Heading>{title}</Heading>
            </Center>
          </Box>

          <Box flex="shrink">
            <Center h="100%" w="100%">
              {isOpen ? (
                <IconButton
                  variant="ghost"
                  size="lg"
                  aria-label="Toggle Drawer"
                  fontSize="20px"
                  icon={<ChevronDownIcon />}
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  data-cy="closeMobileDrawer"
                />
              ) : (
                <IconButton
                  variant="ghost"
                  size="lg"
                  aria-label="Toggle Drawer"
                  fontSize="20px"
                  icon={<ChevronUpIcon />}
                  data-cy="openMobileDrawer"
                />
              )}
            </Center>
          </Box>
        </Flex>

        <Box flex="auto" overflow="scroll" p="0 1rem">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
