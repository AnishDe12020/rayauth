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
        backgroundSize: "cover",
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='250' preserveAspectRatio='none' viewBox='0 0 1440 250'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1024%26quot%3b)' fill='none'%3e%3crect width='1440' height='250' x='0' y='0' fill='%230e2a47'%3e%3c/rect%3e%3cpath d='M7 250L257 0L570.5 0L320.5 250z' fill='url(%23SvgjsLinearGradient1025)'%3e%3c/path%3e%3cpath d='M281.6 250L531.6 0L836.1 0L586.1 250z' fill='url(%23SvgjsLinearGradient1025)'%3e%3c/path%3e%3cpath d='M495.20000000000005 250L745.2 0L877.2 0L627.2 250z' fill='url(%23SvgjsLinearGradient1025)'%3e%3c/path%3e%3cpath d='M746.8000000000001 250L996.8000000000001 0L1260.8000000000002 0L1010.8000000000001 250z' fill='url(%23SvgjsLinearGradient1025)'%3e%3c/path%3e%3cpath d='M1413 250L1163 0L915.5 0L1165.5 250z' fill='url(%23SvgjsLinearGradient1026)'%3e%3c/path%3e%3cpath d='M1176.4 250L926.4000000000001 0L683.4000000000001 0L933.4000000000001 250z' fill='url(%23SvgjsLinearGradient1026)'%3e%3c/path%3e%3cpath d='M925.8 250L675.8 0L480.79999999999995 0L730.8 250z' fill='url(%23SvgjsLinearGradient1026)'%3e%3c/path%3e%3cpath d='M709.1999999999999 250L459.19999999999993 0L337.69999999999993 0L587.6999999999999 250z' fill='url(%23SvgjsLinearGradient1026)'%3e%3c/path%3e%3cpath d='M1280.638110575977 250L1440 90.63811057597701L1440 250z' fill='url(%23SvgjsLinearGradient1025)'%3e%3c/path%3e%3cpath d='M0 250L159.361889424023 250L 0 90.63811057597701z' fill='url(%23SvgjsLinearGradient1026)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1024'%3e%3crect width='1440' height='250' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='0%25' y1='100%25' x2='100%25' y2='0%25' id='SvgjsLinearGradient1025'%3e%3cstop stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='100%25' y1='100%25' x2='0%25' y2='0%25' id='SvgjsLinearGradient1026'%3e%3cstop stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e")`,
      },
    },
  },
});

export default theme;
