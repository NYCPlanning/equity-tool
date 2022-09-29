import { useState } from "react";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import ReactGA from "react-ga4";

export const WelcomeMobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileDrawer = () => {
    ReactGA.event({
      category: "Mobile Card Open",
      action: "Click",
      label: (!isOpen).toString(),
    });
    setIsOpen(!isOpen);
  };

  return (
    <Box
      display={{
        base: "block",
        md: "none",
      }}
      height="100%"
      width="100%"
      position="absolute"
      bottom={isOpen ? "-100px" : "calc(-100% + 130px)"}
      paddingBottom="96px"
      left="0"
      zIndex="900"
      bg="white"
      borderRadius="1rem 1rem 0 0"
      data-cy="mobileDrawer-welcome"
    >
      <Flex direction="column" height="100%" position="relative">
        <Box
          position="absolute"
          width="100%"
          top={0}
          cursor="pointer"
          zIndex="999"
          textAlign="right"
          bg="rgba(0,0,0,0)"
          onClick={toggleMobileDrawer}
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
