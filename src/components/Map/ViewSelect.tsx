import {
  BoxProps,
  Button,
  ButtonGroup,
  StylesProvider,
  useMultiStyleConfig,
} from "@chakra-ui/react";

interface ViewSelectProps extends BoxProps {
  onDataToolClick: () => void;
  onDriClick: () => void;
  view: string | null;
}

// In this case we want implicit children
const ThemedButtonGroup: React.FC = (props) => {
  const { children, ...rest } = props;

  const styles = useMultiStyleConfig("ButtonGroup", { variant: "toggle" });

  return (
    <ButtonGroup __css={styles.group} {...rest}>
      <StylesProvider value={styles}>{children}</StylesProvider>
    </ButtonGroup>
  );
};

export const ViewSelect = ({
  onDataToolClick,
  onDriClick,
  view,
  ...boxProps
}: ViewSelectProps) => {
  return (
    <ThemedButtonGroup {...boxProps}>
      <Button
        onClick={onDataToolClick}
        isActive={view === "datatool"}
        variant="aqua"
        data-cy="dataToolBtn"
      >
        Data Tool
      </Button>
      <Button
        onClick={onDriClick}
        isActive={view === "dri"}
        data-cy="driBtn"
        variant="aqua"
      >
        Displacement Risk Index
      </Button>
    </ThemedButtonGroup>
  );
};
