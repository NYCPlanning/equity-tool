import { Flex, BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";

interface ViewToggleProps extends BoxProps {
  onDataToolClick: () => void;
  onDriClick: () => void;
  view: string | null;
  showToggle: boolean;
}

export const ViewToggle = ({
  onDataToolClick,
  onDriClick,
  view,
  showToggle,
}: ViewToggleProps) => {
  return (
    <>
      {showToggle && (
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
          <Button
            flex="1"
            variant="toggle"
            backgroundColor="gray.50"
            height="100%"
            borderRadius=".5rem 0 0 0"
            _active={{
              backgroundColor: "teal.50",
              color: "teal",
              border: "1px solid teal",
            }}
            onClick={onDataToolClick}
            isActive={view === "datatool"}
            isFullWidth
            data-cy="dataToolBtn-mobile"
          >
            Data Tool
          </Button>
          <Button
            flex="1"
            variant="toggle"
            backgroundColor="gray.50"
            height="100%"
            borderRadius="0 .5rem 0 0"
            _active={{
              backgroundColor: "teal.50",
              color: "teal",
              border: "1px solid teal",
            }}
            onClick={onDriClick}
            isActive={view === "dri"}
            isFullWidth
            data-cy="driBtn-mobile"
          >
            Displacement Risk Index
          </Button>
        </Flex>
      )}

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
          data-cy="dataToolBtn-desktop"
        >
          Data Tool
        </Button>
        <Button
          onClick={onDriClick}
          isActive={view === "dri"}
          variant="toggle"
          data-cy="driBtn-desktop"
        >
          Displacement Risk Index
        </Button>
      </ToggleButtonGroup>
    </>
  );
};
