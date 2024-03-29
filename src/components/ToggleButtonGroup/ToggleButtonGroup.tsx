import {
  BoxProps,
  ButtonGroup,
  StylesProvider,
  useMultiStyleConfig,
} from "@chakra-ui/react";

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
