import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// Let's say you want to add custom colors
export default extendTheme({
  styles: {
    global: (props) => ({
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
        description: (props) => ({
          color: mode("gray.600", "whiteAlpha.800")(props),
        }),
      },
    },
    Link: {
      baseStyle: (props) => ({
        color: mode("#0366D6", "#58A6FF")(props),
      }),
      variants: {
        app: (props) => ({
          color: mode("gray.600", "whiteAlpha.800")(props),
        }),
      },
    },
  },
});
