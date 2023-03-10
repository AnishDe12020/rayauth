import { PartsStyleFunction } from "@chakra-ui/react";

const variantCustomTabs: PartsStyleFunction = () => {
  return {
    tab: {
      borderRadius: "md",
      fontWeight: "semibold",
      color: "gray.300",
      fontSize: { base: "sm", md: "md" },
      _selected: {
        color: `white`,
        bg: `brand.secondary`,
      },
      _hover: {
        bg: "brand.secondary",
      },
    },
    tablist: {
      borderRadius: "md",
      backgroundColor: "brand.primary",
      py: 2,
      px: 2,
      experimental_spaceX: 2,
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "brand.secondary",
      overflowX: "auto",
    },
  };
};

const extendedTheme = {
  variants: {
    custom: variantCustomTabs,
  },
};

export default extendedTheme;
