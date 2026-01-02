import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

// Let's say you want to add custom colors
export default extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: "body",
        color: mode("gray.900", "whiteAlpha.900")(props),
        bg: mode("white", "#0d1117")(props),
        lineHeight: "base",
      },
    }),
  },
  components: {
    Text: {
      variants: {
        description: (props: StyleFunctionProps) => ({
          color: mode("gray.600", "whiteAlpha.800")(props),
        }),
      },
    },
    Link: {
      baseStyle: (props: StyleFunctionProps) => ({
        color: mode("#0366D6", "#58A6FF")(props),
      }),
      variants: {
        app: (props: StyleFunctionProps) => ({
          color: mode("gray.600", "whiteAlpha.800")(props),
        }),
      },
    },
  },
});
