import { BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";

interface ViewSelectProps extends BoxProps {
  onDataToolClick: () => void;
  onDriClick: () => void;
  view: string | null;
}

export const ViewSelect = ({
  onDataToolClick,
  onDriClick,
  view,
  ...boxProps
}: ViewSelectProps) => {
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
