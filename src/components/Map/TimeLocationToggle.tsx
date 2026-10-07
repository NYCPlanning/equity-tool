import { BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";

export type TimeLocationView = "time" | "location";

interface TimeLocationProps extends BoxProps {
  isMobile: boolean | undefined;
  selectedView: TimeLocationView;
  onViewChange: (view: TimeLocationView) => void;
}

export const TimeLocationToggle = ({
  isMobile,
  selectedView,
  onViewChange,
}: TimeLocationProps) => {
  return (
    <ToggleButtonGroup
      isAttached
      transform={isMobile ? { base: "translate(-50%)" } : undefined}
      zIndex={200}
      boxShadow="lg"
      borderRadius="full"
      outline="1px solid"
      outlineColor="gray.400"
    >
      <Button
        onClick={() => onViewChange("time")}
        isActive={selectedView === "time"}
        bg={selectedView === "time" ? "teal.50" : "white"}
        color={selectedView === "time" ? "teal.600" : "gray.600"}
        border="1px solid"
        borderColor={selectedView === "time" ? "teal.600" : "transparent"}
        borderRadius="full"
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
        data-cy="overTimeBtn-desktop"
      >
        Over Time
      </Button>

      <Button
        onClick={() => onViewChange("location")}
        isActive={selectedView === "location"}
        bg={selectedView === "location" ? "teal.50" : "white"}
        color={selectedView === "location" ? "teal.600" : "gray.600"}
        border="1px solid"
        borderColor={selectedView === "location" ? "teal.600" : "transparent"}
        borderRadius="full"
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
        data-cy="LocationBtn-desktop"
      >
        Location
      </Button>
    </ToggleButtonGroup>
  );
};
