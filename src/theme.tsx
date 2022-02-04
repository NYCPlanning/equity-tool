import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
  components: {
    ButtonGroup: {
      parts: ["group", "button"],
      variants: {
        toggle: {
          group: {
            backgroundColor: "white",
            borderRadius: 50,
          },
        },
      },
    },
    Button: {
      variants: {
        toggle: {
          backgroundColor: "white",
          color: "gray.600",
          borderRadius: 50,

          _hover: {
            color: "teal",
          },
          _active: {
            backgroundColor: "teal.50",
            border: "1px solid teal",
            color: "teal",
            borderRadius: 50,
          },
        },
      },
    },
  },
});

export default theme;
