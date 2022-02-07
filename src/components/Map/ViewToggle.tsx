import { Flex, BoxProps, Button } from "@chakra-ui/react";
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
}: ViewToggleProps) => {
  return (
    <>
      <Flex
        display={{
          base: "flex",
          lg: "none",
        }}
        direction="row"
        position="fixed"
        width="100%"
        bottom="0"
        left="0"
        zIndex="999"
      >
        <Button
          flex="1"
          variant="bigToggle"
          onClick={onDataToolClick}
          isActive={view === "datatool"}
          isFullWidth
          data-cy="dataToolBtn"
          data-cy-context="mobile"
        >
          Data Tool
        </Button>
        <Button
          flex="1"
          variant="bigToggle"
          onClick={onDriClick}
          isActive={view === "dri"}
          isFullWidth
          data-cy="driBtn"
          data-cy-context="mobile"
        >
          Displacement Risk Index
        </Button>
      </Flex>

      <ToggleButtonGroup
        position="absolute"
        top={5}
        left={8}
        zIndex={200}
        boxShadow="lg"
        display={{
          base: "none",
          lg: "block",
        }}
      >
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
    </>
  );
};
