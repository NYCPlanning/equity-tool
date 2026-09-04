import { BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";

export type TimeLocationView = "time" | "location";

interface TimeLocationProps extends BoxProps {
  selectedView: TimeLocationView;
  onViewChange: (view: TimeLocationView) => void;
}

export const TimeLocationToggle = ({
  selectedView,
  onViewChange,
}: TimeLocationProps) => {
  return (
    <ToggleButtonGroup
      isAttached
      role="group"
      aria-label="Data view"
      maxWidth="none"
      zIndex={200}
      borderRadius="full"
      outline="1px solid"
      outlineColor="gray.400"
      sx={{
        width: {
          base: "100%",
          md: "fit-content",
        },
      }}
    >
      <Button
        onClick={() => onViewChange("time")}
        isActive={selectedView === "time"}
        aria-pressed={selectedView === "time"}
        flex={{ base: "1 1 0", md: "initial" }}
        minWidth={0}
        bg={selectedView === "time" ? "primary.50" : "white"}
        color={selectedView === "time" ? "primary.600" : "gray.600"}
        fontWeight={selectedView === "time" ? "bold" : "normal"}
        border="1px solid"
        borderColor={selectedView === "time" ? "primary.600" : "transparent"}
        borderRadius="full"
        _hover={{
          bg: {
            base: selectedView === "time" ? "primary.50" : "white",
            md: "gray.50",
          },
          color: {
            base: selectedView === "time" ? "primary.600" : "gray.600",
            md: "primary.600",
          },
          fontWeight: {
            base: selectedView === "time" ? "bold" : "normal",
            md: "bold",
          },
          borderColor: {
            base: selectedView === "time" ? "primary.600" : "transparent",
            md: "primary.600",
          },
        }}
        variant="toggle"
        data-cy="overTimeBtn-desktop"
      >
        Over Time
      </Button>

      <Button
        onClick={() => onViewChange("location")}
        isActive={selectedView === "location"}
        aria-pressed={selectedView === "location"}
        flex={{ base: "1 1 0", md: "initial" }}
        minWidth={0}
        bg={selectedView === "location" ? "primary.50" : "white"}
        color={selectedView === "location" ? "primary.600" : "gray.600"}
        fontWeight={selectedView === "location" ? "bold" : "normal"}
        border="1px solid"
        borderColor={
          selectedView === "location" ? "primary.600" : "transparent"
        }
        borderRadius="full"
        _hover={{
          bg: {
            base: selectedView === "location" ? "primary.50" : "white",
            md: "gray.50",
          },
          color: {
            base: selectedView === "location" ? "primary.600" : "gray.600",
            md: "primary.600",
          },
          fontWeight: {
            base: selectedView === "location" ? "bold" : "normal",
            md: "bold",
          },
          borderColor: {
            base: selectedView === "location" ? "primary.600" : "transparent",
            md: "primary.600",
          },
        }}
        variant="toggle"
        data-cy="LocationBtn-desktop"
      >
        Location
      </Button>
    </ToggleButtonGroup>
  );
};
