import { BoxProps, Button, ButtonGroup } from "@chakra-ui/react";

type ViewSelectProps = {
  onDataToolClick: () => void;
  onDriClick: () => void;
  view: string | null;
} & BoxProps;

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
        DRI
      </Button>
    </ButtonGroup>
  );
};
