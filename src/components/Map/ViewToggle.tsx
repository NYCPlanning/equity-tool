import { Flex, Box, BoxProps, Button } from "@chakra-ui/react";
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
        height="3.75rem"
        bottom="0"
        left="0"
        zIndex="999"
      >
        <Box flex="1">
          <Button
            onClick={onDataToolClick}
            isActive={view === "datatool"}
            height="100%"
            isFullWidth
            data-cy="dataToolBtn"
            data-cy-context="mobile"
          >
            Data Tool
          </Button>
        </Box>
        <Box flex="1">
          <Button
            onClick={onDriClick}
            isActive={view === "dri"}
            height="100%"
            isFullWidth
            data-cy="driBtn"
            data-cy-context="mobile"
          >
            Displacement Risk Index
          </Button>
        </Box>
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
