import { BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";
import { useView } from "@hooks/useView";

interface ViewToggleProps extends BoxProps {
  onCommunityDataClick: () => void;
  onDrmClick: () => void;
}

export const ViewToggle = ({
  onCommunityDataClick,
  onDrmClick,
}: ViewToggleProps) => {
  const view = useView();

  return (
    <>
      <ToggleButtonGroup
        position="absolute"
        top="1rem"
        left={{
          base: "4vmin",
          sm: "2vmin",
          md: "1rem",
        }}
        zIndex={200}
        boxShadow="lg"
      >
        <Button
          onClick={onCommunityDataClick}
          isDisabled={view === "data"}
          isActive={view === "data"}
          variant="toggle"
          data-cy="communityDataBtn-desktop"
        >
          Community Data
        </Button>
        <Button
          onClick={onDrmClick}
          isActive={view === "drm"}
          isDisabled={view === "drm"}
          variant="toggle"
          data-cy="drmBtn-desktop"
        >
          Displacement Risk Map
        </Button>
      </ToggleButtonGroup>
    </>
  );
};
