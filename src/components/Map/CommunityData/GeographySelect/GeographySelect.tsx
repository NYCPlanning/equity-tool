import { BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";
import { useGeography } from "@hooks/useGeography";
import { Geography } from "@constants/geography";

export interface GeographySelectInterface extends BoxProps {
  onGeographySelect: (targetGeography: Geography) => void;
}

export const GeographySelect = ({
  onGeographySelect,
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
      >
        Citywide
      </Button>
    </ToggleButtonGroup>
  );
};
