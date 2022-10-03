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
        variant="leftCap"
        data-cy="districtButton"
      >
        Community District* xxx
      </Button>
      <Button
        onClick={() => {
          onGeographySelect(BOROUGH);
        }}
        isActive={geography === BOROUGH}
        variant="middle"
        data-cy="boroughButton"
      >
        Borough xxx
      </Button>
      <Button
        onClick={() => {
          onGeographySelect(CITYWIDE);
        }}
        isActive={geography === CITYWIDE}
        variant="rightCap"
        data-cy="citywideButton"
      >
        Citywide xxx
      </Button>
    </ToggleButtonGroup>
  );
};
