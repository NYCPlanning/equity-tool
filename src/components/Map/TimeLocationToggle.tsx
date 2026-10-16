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
      maxWidth="none"
      zIndex={200}
      boxShadow="lg"
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
        flex={{ base: "1 1 0", md: "initial" }}
        minWidth={0}
        bg={selectedView === "time" ? "primary.50" : "white"}
        color={selectedView === "time" ? "primary.600" : "gray.600"}
        border="1px solid"
        borderColor={selectedView === "time" ? "primary.600" : "transparent"}
        borderRadius="full"
        _hover={{
          _disabled: {
            bg: "primary.50",
          },
          bg: "gray.50",
          fontWeight: "bold",
          color: "primary.600",
          border: "1px solid",
          borderColor: "primary.600",
        }}
        variant="toggle"
        data-cy="overTimeBtn-desktop"
      >
        Over Time
      </Button>

      <Button
        onClick={() => onViewChange("location")}
        isActive={selectedView === "location"}
        flex={{ base: "1 1 0", md: "initial" }}
        minWidth={0}
        bg={selectedView === "location" ? "primary.50" : "white"}
        color={selectedView === "location" ? "primary.600" : "gray.600"}
        border="1px solid"
        borderColor={
          selectedView === "location" ? "primary.600" : "transparent"
        }
        borderRadius="full"
        _hover={{
          _disabled: {
            bg: "primary.50",
          },
          bg: "gray.50",
          fontWeight: "bold",
          color: "primary.600",
          border: "1px solid",
          borderColor: "primary.600",
        }}
        variant="toggle"
        data-cy="LocationBtn-desktop"
      >
        Location
      </Button>
    </ToggleButtonGroup>
  );
};
