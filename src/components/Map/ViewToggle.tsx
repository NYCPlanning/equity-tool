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
    </ToggleButtonGroup>
  );
};
