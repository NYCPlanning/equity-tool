import { useState } from "react";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";

export const WelcomeMobileDrawer = () => {
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
      borderRadius="1rem 1rem 0 0"
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
          padding="1rem"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <WelcomeContent />
          <br />
          <hr />
          <br />
          <WelcomeFooter />
        </Box>
      </Flex>
    </Box>
  );
};
