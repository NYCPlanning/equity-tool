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
      parts: ["group"],
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
      baseStyle: {
        backgroundColor: "white",
        color: "gray.600",

        _hover: {
          color: "teal",
        },
        _active: {
          backgroundColor: "teal.50",
          border: "1px solid teal",
          color: "teal",
        },
      },
      variants: {
        leftCap: {
          borderRadius: "50px 0 0 50px",
          borderRight: "1px solid #A0AEC0",
        },
        middle: {
          borderRadius: 0,
          borderRight: "1px solid #A0AEC0",
        },
        rightCap: {
          borderRadius: "0 50px 50px 0",
        },
        toggle: {
          borderRadius: 50,
        },
      },
    },
  },
});

export default theme;
