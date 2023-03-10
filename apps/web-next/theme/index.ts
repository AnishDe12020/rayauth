import { extendTheme } from "@chakra-ui/react";
import { accentColors, accentTokens, mainColors, stateColors } from "./colors";
import { components } from "./components";

const theme = extendTheme({
  components,
  colors: { ...accentColors },
  semanticTokens: {
    colors: { ...mainColors, ...accentTokens, ...stateColors },
  },
  config: {
    initialColorMode: "dark",
  },
  styles: {
    global: {
      "html, body": {
        background: "brand.primary",
      },
    },
  },
});

export default theme;
