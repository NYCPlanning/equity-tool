import {
  BoxProps,
  ButtonGroup,
  createStylesContext,
  useMultiStyleConfig,
} from "@chakra-ui/react";

// Create the scoped styles context once, at module level.
// The string names the component (used in error messages).
const [StylesProvider] = createStylesContext("ToggleButtonGroup");

interface ToggleButtonGroupInterface extends BoxProps {
  isAttached?: boolean;
}

// In this case we want implicit children
export const ToggleButtonGroup: React.FC<ToggleButtonGroupInterface> = (
  props
) => {
  const { isAttached = false, children, ...rest } = props;

  const styles = useMultiStyleConfig("ButtonGroup", { variant: "toggle" });

  return (
    <ButtonGroup isAttached={isAttached} __css={styles.group} {...rest}>
      <StylesProvider value={styles}>{children}</StylesProvider>
    </ButtonGroup>
  );
};
