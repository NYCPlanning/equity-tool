import { useState } from "react";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

interface MobileDrawerProps {
  children?: React.ReactNode;
}

// It is the responsibility of MobileDrawer's children to make sure
// that content is not occluded by the open/close toggle at the top right.
// The button is 3rem x 3rem. The MobileDrawer also has 1rem padding around the sides
// One solution is to add 2rem right padding for content at the top of the MobileDrawer.
export const MobileDrawer = ({ children }: MobileDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      display={{
        base: "block",
        md: "none",
      }}
      height="100vh"
      width="100%"
      position="fixed"
      top={isOpen ? "6rem" : "100vh"}
      marginTop={isOpen ? "auto" : "-9rem"}
      paddingBottom="6rem"
      left="0"
      zIndex="900"
      bg="white"
      data-cy="mobileDrawer"
    >
      <Flex direction="column" height="100%" position="relative">
        <Box
          position="absolute"
          width="100%"
          top={0}
          cursor="pointer"
          zIndex="999"
          align="right"
          bg="rgba(0,0,0,0)"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <IconButton
              variant="ghost"
              size="lg"
              fontSize="1.25rem"
              bg="rgba(0,0,0,0)"
              icon={<ChevronDownIcon />}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              aria-label="Toggle Drawer"
              data-cy="closeMobileDrawer"
            />
          ) : (
            <IconButton
              variant="ghost"
              size="lg"
              fontSize="1.25rem"
              bg="rgba(0,0,0,0)"
              icon={<ChevronUpIcon />}
              aria-label="Toggle Drawer"
              data-cy="openMobileDrawer"
            />
          )}
        </Box>

        <Box
          flex="auto"
          overflow="scroll"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
