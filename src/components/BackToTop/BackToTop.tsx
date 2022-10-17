import { ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Button, Link } from "@chakra-ui/react";

export const BackToTop = () => {
  return (
    <>
      <Link href="#data-top">
        <Box position="fixed" bottom="16px" right="16px" zIndex={3}>
          <Button width="1rem" border="1px" borderColor="#CBD5E0">
            <ArrowUpIcon />
          </Button>
        </Box>
      </Link>
    </>
  );
};
