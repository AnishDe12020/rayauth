import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import { SystemStyleObject } from "@chakra-ui/react";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

const size: Record<string, SystemStyleObject> = {
  lg: defineStyle({
    h: 9,
    fontSize: "lg",
    px: 4,
  }),
  md: defineStyle({
    h: 8,
    fontSize: "md",
    px: 3,
  }),
  sm: defineStyle({
    h: 7,
    fontSize: "sm",
    px: 2.5,
    borderRadius: "md",
  }),
  xs: defineStyle({
    h: 6,
    fontSize: "xs",
    px: 2,
    borderRadius: "md",
  }),
};

const sizes = {
  lg: definePartsStyle({
    field: size.lg,
    addon: size.lg,
  }),
  md: definePartsStyle({
    field: size.md,
    addon: size.md,
  }),
  sm: definePartsStyle({
    field: size.sm,
    addon: size.sm,
  }),
  xs: definePartsStyle({
    field: size.xs,
    addon: size.xs,
  }),
};

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    focusBorderColor: fc || "accent.primary",
    errorBorderColor: ec || "state.error",
  };
}

const variantOutline = definePartsStyle((props) => {
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      border: "2px solid",
      borderColor: "brand.tertiary",
      bg: "inherit",
      _hover: {
        borderColor: "brand.quaternary",
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: ec,
        boxShadow: `0 0 0 1px ${ec}`,
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: fc,
        boxShadow: `0 0 0 1px ${fc}`,
      },
    },
    addon: {
      border: "2px solid",
      borderColor: "brand.tertiary",
      bg: "brand.secondary",
    },
  };
});

const variantFilled = definePartsStyle((props) => {
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      border: "2px solid",
      borderColor: "brand.tertiary",
      bg: "brand.secondary",
      _hover: {
        bg: "brand.tertiary",
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: ec,
      },
      _focusVisible: {
        bg: "transparent",
        borderColor: fc,
      },
    },
    addon: {
      border: "2px solid",
      borderColor: "brand.tertiary",
      bg: "brand.secondary",
    },
  };
});

const variantFlushed = definePartsStyle((props) => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      borderBottom: "2px solid",
      borderColor: "brand.tertiary",
      borderRadius: "0",
      px: "2",
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _hover: {
        borderColor: "brand.quaternary",
      },
      _invalid: {
        borderColor: ec,
        boxShadow: `0px 1px 0px 0px ${ec}`,
      },
      _focusVisible: {
        borderColor: fc,
        boxShadow: `0px 1px 0px 0px ${fc}`,
      },
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "brand.tertiary",
      borderRadius: "0",
      px: "2",
      bg: "transparent",
    },
  };
});

const variants = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
};

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});

export default inputTheme;
