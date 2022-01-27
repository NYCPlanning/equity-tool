import { useState } from "react";
import { Heading, Box, IconButton, Flex } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

interface MobileDrawerProps {
  title: string | null;
  children?: React.ReactNode;
}

export const MobileDrawer = ({ title, children }: MobileDrawerProps) => {
  const [isOpen, setIsOpen] = useState(true);

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
      marginTop={isOpen ? "auto" : "-10rem"}
      paddingBottom="6rem"
      left="0"
      zIndex="999"
      bg="white"
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
              />
            ) : (
              <IconButton
                variant="ghost"
                aria-label="Toggle Drawer"
                fontSize="20px"
                icon={<ChevronUpIcon />}
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
