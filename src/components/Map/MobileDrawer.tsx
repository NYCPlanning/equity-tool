import { useState } from "react";
import { Heading, Box, IconButton, Flex } from "@chakra-ui/react";
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
      marginTop={isOpen ? "auto" : "-15rem"}
      paddingBottom="12.5rem"
      left="0"
      zIndex="900"
      bg="white"
      data-cy="mobileDrawer"
    >
      <Flex direction="column" height="100%">
        <Flex
          direction="row"
          justifyContent="space-between"
          p=".3rem"
          paddingLeft="1rem"
          flex="shrink"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          cursor="pointer"
        >
          <Box>
            <Heading>{title}</Heading>
          </Box>

          <Box>
            {isOpen ? (
              <IconButton
                variant="ghost"
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
                aria-label="Toggle Drawer"
                fontSize="20px"
                icon={<ChevronUpIcon />}
                data-cy="openMobileDrawer"
              />
            )}
          </Box>
        </Flex>
        <Box flex="shrink">
          <hr />
        </Box>
        <Box flex="auto" overflow="scroll">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
