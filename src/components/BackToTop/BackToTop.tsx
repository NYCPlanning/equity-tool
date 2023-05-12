import { ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Button, Link } from "@chakra-ui/react";

export const BackToTop = () => {
  const scrollToTop = () => {
    const backToTopElement = document.getElementById("back-to-top");
    if (backToTopElement !== null) {
      backToTopElement.scrollTop = 0;
    }
  };

  return (
    <>
      <Link onClick={scrollToTop}>
        <Box
          position="fixed"
          bottom="14px"
          right="14px"
          zIndex={3}
          onClick={scrollToTop}
        >
          <Button
            width="48px"
            height="48px"
            border="1px"
            borderColor="#CBD5E0"
            onClick={scrollToTop}
          >
            <ArrowUpIcon width="24px" height="24px" />
          </Button>
        </Box>
      </Link>
    </>
  );
};
