import {
  ButtonGroup,
  StylesProvider,
  useMultiStyleConfig,
} from "@chakra-ui/react";

// In this case we want implicit children
export const ToggleButtonGroup: React.FC = (props) => {
  const { children, ...rest } = props;

  const styles = useMultiStyleConfig("ButtonGroup", { variant: "toggle" });

  return (
    <ButtonGroup __css={styles.group} {...rest}>
      <StylesProvider value={styles}>{children}</StylesProvider>
    </ButtonGroup>
  );
};
