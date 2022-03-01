import { useRouter } from "next/router";
import { BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { Geography } from "@constants/geography";
import { NYC } from "@constants/geoid";

export const GeographySelect = ({ ...boxProps }: BoxProps) => {
  const router = useRouter();
  const { geography } = useMapSubrouteInfo();
  const { DISTRICT, BOROUGH, CITYWIDE } = Geography;

  return (
    <ToggleButtonGroup isAttached={true} {...boxProps}>
      <Button
        onClick={() => router.push(`/map/datatool/${DISTRICT}`)}
        isActive={geography === DISTRICT}
        variant="leftCap"
        data-cy="districtButton"
      >
        Community District*
      </Button>
      <Button
        onClick={() => router.push(`/map/datatool/${BOROUGH}`)}
        isActive={geography === BOROUGH}
        variant="middle"
        data-cy="boroughButton"
      >
        Borough
      </Button>
      <Button
        onClick={() => router.push(`/map/datatool/${CITYWIDE}?geoid=${NYC}`)}
        isActive={geography === CITYWIDE}
        variant="rightCap"
        data-cy="citywideButton"
      >
        Citywide
      </Button>
    </ToggleButtonGroup>
  );
};
