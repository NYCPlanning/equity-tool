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
            textTransform: "capitalize",
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
          },
        },
      },
    },
    Button: {
      baseStyle: {
        backgroundColor: "white",
        color: "gray.600",

        _hover: {
          backgroundColor: "teal.50",
          color: "teal",
        },
        _active: {
          backgroundColor: "teal.50",
          color: "teal",
        },
        _disabled: {
          backgroundColor: "white",
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
        download: {
          backgroundColor: "teal",
          color: "white",
          _hover: {
            backgroundColor: "teal.50",
            color: "teal",
          },
          _disabled: {
            backgroundColor: "white",
            color: "teal",
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
