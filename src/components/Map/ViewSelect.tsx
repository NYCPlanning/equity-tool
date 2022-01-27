import { BoxProps, Button, ButtonGroup } from "@chakra-ui/react";

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
    <ButtonGroup isAttached {...boxProps}>
      <Button
        onClick={onDataToolClick}
        isActive={view === "datatool"}
        data-cy="dataToolBtn"
      >
        Data Tool
      </Button>
      <Button onClick={onDriClick} isActive={view === "dri"} data-cy="driBtn">
        Displacement Risk Index
      </Button>
    </ButtonGroup>
  );
};
