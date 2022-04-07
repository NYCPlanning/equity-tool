import { Flex, BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

interface ViewToggleProps extends BoxProps {
  onCommunityDataClick: () => void;
  onDriClick: () => void;
}

export const ViewToggle = ({
  onCommunityDataClick,
  onDriClick,
}: ViewToggleProps) => {
  const { view, geoid } = useMapSubrouteInfo();

  return (
    <>
      {!geoid && (
        <Flex
          display={{
            base: "flex",
            md: "none",
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
            onClick={onCommunityDataClick}
            isActive={view === "data"}
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
        top="1rem"
        left="2.1875rem"
        zIndex={200}
        boxShadow="lg"
        display={{
          base: "none",
          md: "block",
        }}
      >
        <Button
          onClick={onCommunityDataClick}
          isActive={view === "data"}
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
