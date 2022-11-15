import { BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";
import { useGeography } from "@hooks/useGeography";
import { Geography } from "@constants/geography";

export interface GeographySelectInterface extends BoxProps {
  onGeographySelect: (targetGeography: Geography) => void;
  isMobile: boolean | undefined;
}

export const GeographySelect = ({
  onGeographySelect,
  isMobile,
  ...boxProps
}: GeographySelectInterface) => {
  const geography = useGeography();
  const { DISTRICT, BOROUGH, CITYWIDE } = Geography;

  return (
    <ToggleButtonGroup isAttached={true} {...boxProps}>
      <Button
        onClick={() => {
          onGeographySelect(DISTRICT);
        }}
        isActive={geography === DISTRICT}
        variant="toggle"
        data-cy="districtButton"
        _hover={
          isMobile
            ? { _disabled: { bg: "teal.50" } }
            : {
                bg: "#F7FAFC",
                fontWeight: 800,
                color: "#2C7A7B",
                border: "1px solid teal",
              }
        }
      >
        Community District*
      </Button>
      <Button
        onClick={() => {
          onGeographySelect(BOROUGH);
        }}
        isActive={geography === BOROUGH}
        variant="toggle"
        data-cy="boroughButton"
        _hover={
          isMobile
            ? { _disabled: { bg: "teal.50" } }
            : {
                bg: "#F7FAFC",
                fontWeight: 800,
                color: "#2C7A7B",
                border: "1px solid teal",
              }
        }
      >
        Borough
      </Button>
      <Button
        onClick={() => {
          onGeographySelect(CITYWIDE);
        }}
        isActive={geography === CITYWIDE}
        variant="toggle"
        data-cy="citywideButton"
        _hover={
          isMobile
            ? { _disabled: { bg: "teal.50" } }
            : {
                bg: "#F7FAFC",
                fontWeight: 800,
                color: "#2C7A7B",
                border: "1px solid teal",
              }
        }
      >
        Citywide
      </Button>
    </ToggleButtonGroup>
  );
};
