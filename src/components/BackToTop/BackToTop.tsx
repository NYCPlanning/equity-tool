import { ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Button, Link } from "@chakra-ui/react";

export const BackToTop = () => {
  const scrollToTop = () => {
    document.getElementById("back-to-top")!.scrollTop = 0;
  };

  return (
    <>
      <Link onClick={scrollToTop}>
        <Box
          position="fixed"
          bottom="16px"
          right="16px"
          zIndex={3}
          onClick={scrollToTop}
        >
          <Button
            width="1rem"
            border="1px"
            borderColor="#CBD5E0"
            onClick={scrollToTop}
          >
            <ArrowUpIcon />
          </Button>
        </Box>
      </Link>
    </>
  );
};
