import { mode, transparentize } from "@chakra-ui/theme-tools";
import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { SystemStyleObject } from "@chakra-ui/system";

const baseStyle = defineStyle({
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focusVisible: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  _hover: {
    _disabled: {
      bg: "initial",
    },
  },
});

type AccessibleColor = {
  bg?: string;
  color?: string;
  hoverBg?: string;
  activeBg?: string;
};

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    color: "black",
  },
  cyan: {
    color: "black",
  },
};

const variantSolid = defineStyle((props) => {
  const { colorScheme: c } = props;

  return {
    color: "white",
    bg: "brand.secondary",
    _hover: { bg: "brand.tertiary" },
    _active: { bg: "brand.quaternary" },
  };
});

const variantSolidBorder = defineStyle((props) => {
  const { colorScheme: c } = props;

  if (c === "brand") {
    return {
      color: mode("black", "white")(props),
      bg: "brand.secondary",
      _hover: { bg: "brand.tertiary", borderColor: "brand.quaternary" },
      _active: { bg: "brand.quaternary" },
      border: "1px solid",
      borderColor: "brand.tertiary",
    };
  } else if (c === "accent") {
    return {
      color: "white",
      bg: "accent.primary",
      border: "1px",
      borderColor: "accent.secondary",
      _hover: { bg: "accent.secondary", borderColor: "accent.tertiary" },
      _active: { bg: "accent.tertiary" },
    };
  } else if (c === "gray") {
    const bg = mode(`gray.100`, `whiteAlpha.200`)(props);

    return {
      bg,
      border: "1px solid",
      borderColor: mode(`gray.200`, `whiteAlpha.300`)(props),
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg,
        },
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
    };
  }

  const {
    bg = `${c}.500`,
    color = "white",
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] ?? {};

  const background = mode(bg, `${c}.400`)(props);

  return {
    bg: background,
    color: mode(color, `gray.800`)(props),
    border: "1px solid",
    borderColor: mode(`${c}.600`, `${c}.300`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.400`)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: mode(activeBg, `${c}.500`)(props) },
  };
});

const variantLink = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color:
      c === "brand"
        ? mode(`gray.700`, `gray.300`)(props)
        : mode(`${c}.700`, `${c}.300`)(props), // TODO: make this accent color or smth
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none",
      },
    },
    _active: {
      color:
        c === "brand"
          ? mode(`gray.900`, `gray.500`)(props)
          : mode(`${c}.900`, `${c}.500`)(props), // TODO: make this accent color or smth
    },
  };
});

const variantGhost = defineStyle((props) => {
  const { colorScheme: c, theme } = props;

  if (c === "gray") {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
    };
  } else if (c === "brand") {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: "brand.secondary",
      },
      _active: { bg: "brand.quaternary" },
    };
  }

  const darkHoverBg = transparentize(`${c}.300`, 0.12)(theme);
  const darkActiveBg = transparentize(`${c}.300`, 0.24)(theme);

  const lightHoverBg = transparentize(`${c}.600`, 0.12)(theme);
  const lightActiveBg = transparentize(`${c}.600`, 0.24)(theme);

  return {
    color: mode(`${c}.600`, `${c}.300`)(props),
    bg: "transparent",
    _hover: {
      bg: mode(lightHoverBg, darkHoverBg)(props),
    },
    _active: {
      bg: mode(lightActiveBg, darkActiveBg)(props),
    },
  };
});

const variantOutline = defineStyle((props) => {
  const { colorScheme: c } = props;
  let borderColor;
  if (c === "gray") {
    borderColor = mode(`gray.200`, `whiteAlpha.300`)(props);
  } else if (c === "brand") {
    borderColor = "brand.quaternary";
  } else if (c === "accent") {
    borderColor = "accent.primary";
  } else {
    borderColor = "currentColor";
  }

  return {
    border: "1px solid",
    borderColor: borderColor,
    ".chakra-button__group[data-attached] > &:not(:last-of-type)": {
      marginEnd: "-1px",
    },
    ...variantGhost(props),
  };
});

const variants = {
  solid: variantSolid,
  "solid-border": variantSolidBorder,
  link: variantLink,
  ghost: variantGhost,
  outline: variantOutline,
};

const sizes: Record<string, SystemStyleObject> = {
  lg: defineStyle({
    h: 9,
    minW: 9,
    fontSize: "lg",
    px: 4,
  }),
  md: defineStyle({
    h: 8,
    minW: 8,
    fontSize: "md",
    px: 3,
  }),
  sm: defineStyle({
    h: 7,
    minW: 7,
    fontSize: "sm",
    px: 2.5,
  }),
  xs: defineStyle({
    h: 6,
    minW: 6,
    fontSize: "xs",
    px: 2,
  }),
};

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "solid-border",
    size: "sm",
    colorScheme: "brand",
  },
});

export default buttonTheme;
