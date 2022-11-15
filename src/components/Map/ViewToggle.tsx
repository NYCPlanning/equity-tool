import { BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";
import { View } from "@constants/View";
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
          isDisabled={view === View.DATA}
          isActive={view === View.DATA}
          _hover={{
            _disabled: { bg: "teal.50" },
            bg: "#F7FAFC",
            fontWeight: 800,
            color: "#2C7A7B",
            border: "1px solid teal",
          }}
          variant="toggle"
          data-cy="communityDataBtn-desktop"
        >
          Community Data
        </Button>
        <Button
          onClick={onDrmClick}
          isActive={view === View.DRM}
          isDisabled={view === View.DRM}
          _hover={{
            bg: "#F7FAFC",
            fontWeight: 800,
            color: "#2C7A7B",
            border: "1px solid teal",
          }}
          variant="toggle"
          data-cy="drmBtn-desktop"
        >
          Displacement Risk Map
        </Button>
      </ToggleButtonGroup>
    </>
  );
};
