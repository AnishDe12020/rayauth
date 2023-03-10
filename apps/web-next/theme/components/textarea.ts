import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { inputTheme } from "./input";

const baseStyle = defineStyle({
  ...inputTheme.baseStyle?.field,
  paddingY: "2",
  minHeight: "20",
  lineHeight: "short",
  verticalAlign: "top",
});

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    focusBorderColor: fc || "accent.primary",
    errorBorderColor: ec || "state.error",
  };
}

// const variants = {
//   outline: defineStyle(props => {
//     const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

//     return {
//       ...inputTheme.variants?.outline(props).field,
//       _invalid: {
//         borderColor: ec,
//         boxShadow: `0 0 0 1px ${ec}`,
//       },
//       _focusVisible: {
//         zIndex: 1,
//         borderColor: fc,
//         boxShadow: `0 0 0 1px ${fc}`,
//       },
//     };
//   }),
//   flushed: defineStyle(
//     props => inputTheme.variants?.flushed(props).field ?? {}
//   ),
//   filled: defineStyle(props => inputTheme.variants?.filled(props).field ?? {}),
// };

const variants = {
  outline: defineStyle(
    (props) => inputTheme.variants?.outline(props).field ?? {}
  ),
  flushed: defineStyle(
    (props) => inputTheme.variants?.flushed(props).field ?? {}
  ),
  filled: defineStyle(
    (props) => inputTheme.variants?.filled(props).field ?? {}
  ),
};

const sizes = {
  xs: inputTheme.sizes?.xs.field ?? {},
  sm: inputTheme.sizes?.sm.field ?? {},
  md: inputTheme.sizes?.md.field ?? {},
  lg: inputTheme.sizes?.lg.field ?? {},
};

export const textareaTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});

export default textareaTheme;
