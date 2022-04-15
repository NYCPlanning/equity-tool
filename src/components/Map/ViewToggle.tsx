import { Flex, BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

interface ViewToggleProps extends BoxProps {
  onCommunityDataClick: () => void;
  onDrmClick: () => void;
}

export const ViewToggle = ({
  onCommunityDataClick,
  onDrmClick,
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
          height="60px"
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
            isDisabled={view === "data"}
            isFullWidth
            data-cy="communityDataBtn-mobile"
          >
            Community Data
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
            onClick={onDrmClick}
            isActive={view === "drm"}
            isDisabled={view === "drm"}
            isFullWidth
            data-cy="drmBtn-mobile"
          >
            Displacement Risk Map
          </Button>
        </Flex>
      )}

      <ToggleButtonGroup
        position="absolute"
        top="1rem"
        left="1rem"
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
          data-cy="communityDataBtn-desktop"
        >
          Community Data
        </Button>
        <Button
          onClick={onDrmClick}
          isActive={view === "drm"}
          variant="toggle"
          data-cy="drmBtn-desktop"
        >
          Displacement Risk Map
        </Button>
      </ToggleButtonGroup>
    </>
  );
};
