import { extendTheme } from "@chakra-ui/react";

const defaultFontFamily = "Helvetica Neue, Helvetica, sans-serif";

const fonts = {
  mono: `'Menlo', monospace`,
  heading: defaultFontFamily,
};

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        fontFamily: defaultFontFamily,
      },
    },
  },
  colors: {
    black: "#16161D",
    primary: {
      50: "#E6FFFA",
      100: "#B2F5EA",
      500: "#319795",
      600: "#2C7A7B",
      700: "#285E61",
    },
  },
  sizes: {
    xs: "85vw",
  },
  fonts,
  components: {
    Table: {
      variants: {
        striped: {
          thead: {
            th: {
              background: "gray.50",
              borderWidth: "1px",
              borderColor: "gray.400",
              textAlign: "center",
              textTransform: "uppercase",
            },
          },
          td: {
            borderWidth: "1px",
            borderColor: "gray.300",
            textAlign: "left",
            py: "0.75rem",
          },
          tbody: {
            tr: {
              "td, th": {
                background: "#fafafa",
              },
              "&:nth-of-type(odd)": {
                background: "#fafafa",
                "td, th": {
                  background: "white",
                  borderColor: "gray.300",
                },
              },
            },
          },
        },
      },
    },
    ButtonGroup: {
      parts: ["group"],
      variants: {
        toggle: {
          group: {
            backgroundColor: "white",
            borderRadius: 50,
            whiteSpace: "nowrap",
            height: "42px",
            maxWidth: "21.5rem",
            display: "flex",
          },
        },
      },
    },
    Button: {
      baseStyle: {
        backgroundColor: "white",
        color: "gray.600",
        fontWeight: 400,
        _hover: {
          backgroundColor: "teal.50",
          color: "teal.600",
          border: "1px solid",
          borderColor: "teal.600",
        },
        _active: {
          backgroundColor: "teal.50",
          color: "teal.600",
          cursor: "default",
          opacity: "revert",
          fontWeight: 700,
        },
      },
      variants: {
        leftCap: {
          minHeight: "42px",
          borderRadius: "50px",
          height: "42px",
        },
        middle: {
          minHeight: "42px",
          borderRadius: "50px",
        },
        rightCap: {
          minHeight: "42px",
          borderRadius: "50px",
        },
        toggle: {
          borderRadius: 50,
          _active: {
            border: "1px solid",
            borderColor: "teal.600",
            cursor: "default",
            opacity: "1 !important",
          },
          minHeight: "42px",
        },
        download: {
          backgroundColor: "teal.600",
          color: "white",
          _hover: {
            backgroundColor: "teal.50",
            color: "teal.600",
          },
          _disabled: {
            backgroundColor: "white",
            color: "teal.600",
          },
        },
        mobileButton: {
          opacity: "1 !important",
          borderRadius: 50,
          _active: {
            border: "1px solid",
            borderColor: "teal.600",
            cursor: "default",
            opacity: "1 !important",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        color: "teal.600.600",
        textDecoration: "underline",
        lineHeight: "1.625rem",
      },
    },
  },
});

export default theme;
