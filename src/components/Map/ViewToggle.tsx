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
          base: "50%",
          md: "1rem",
        }}
        transform={{
          base: "translate(-50%)",
          md: "none",
        }}
        zIndex={200}
        boxShadow="lg"
      >
        <Button
          onClick={onCommunityDataClick}
          isDisabled={view === View.DATA}
          isActive={view === View.DATA}
          _hover={{
            _disabled: {
              bg: "teal.50",
            },
            bg: "gray.50",
            fontWeight: "bold",
            color: "teal.600",
            border: "1px solid",
            borderColor: "teal.600",
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
            _disabled: {
              bg: "teal.50",
            },
            bg: "gray.50",
            fontWeight: "bold",
            color: "teal.600",
            border: "1px solid",
            borderColor: "teal.600",
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
