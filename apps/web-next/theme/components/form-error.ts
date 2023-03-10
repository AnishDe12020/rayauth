import { formErrorAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleText = {
  color: "state.error",
  mt: "2",
  fontSize: "sm",
  lineHeight: "normal",
};

const baseStyleIcon = {
  marginEnd: "0.5em",
  color: "state.error",
};

const baseStyle = {
  text: baseStyleText,
  icon: baseStyleIcon,
};

export const formErrorTheme = defineMultiStyleConfig({
  baseStyle,
});

export default formErrorTheme;
