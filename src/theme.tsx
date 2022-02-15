import { extendTheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const theme = extendTheme({
  colors: {
    black: "#16161D",
  },
  sizes: {
    xs: "85vw",
  },
  fonts,
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
          _active: {
            border: "1px solid teal",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        color: "teal.600",
        textDecoration: "underline",
        lineHeight: "1.625rem",
      },
    },
  },
});

export default theme;
