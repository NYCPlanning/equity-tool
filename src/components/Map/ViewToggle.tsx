import { BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";

interface ViewToggleProps extends BoxProps {
  onDataToolClick: () => void;
  onDriClick: () => void;
  view: string | null;
}

export const ViewToggle = ({
  onDataToolClick,
  onDriClick,
  view,
  ...boxProps
}: ViewToggleProps) => {
  return (
    <ToggleButtonGroup {...boxProps}>
      <Button
        onClick={onDataToolClick}
        isActive={view === "datatool"}
        variant="toggle"
        data-cy="dataToolBtn"
        data-cy-context="desktop"
      >
        Data Tool
      </Button>
      <Button
        onClick={onDriClick}
        isActive={view === "dri"}
        variant="toggle"
        data-cy="driBtn"
        data-cy-context="desktop"
      >
        Displacement Risk Index
      </Button>
    </ToggleButtonGroup>
  );
};
