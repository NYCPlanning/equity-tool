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
      >
        Community District*
      </Button>
      <Button
        onClick={() => router.push(`/map/datatool/${BOROUGH}`)}
        isActive={geography === BOROUGH}
        variant="middle"
      >
        Borough
      </Button>
      <Button
        onClick={() =>
          router.push(`/map/datatool/${CITYWIDE}/${NYC}`)
        }
        isActive={geography === CITYWIDE}
        variant="rightCap"
      >
        Citywide
      </Button>
    </ToggleButtonGroup>
  );
};
