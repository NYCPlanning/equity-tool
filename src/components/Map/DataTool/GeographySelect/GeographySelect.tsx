import { useRouter } from "next/router";
import { BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { Geography } from "@constants/geography";

export const GeographySelect = ({ ...boxProps }: BoxProps) => {
  const router = useRouter();
  const { geography } = useMapSubrouteInfo();
  const { District, Borough, Citywide } = Geography;

  return (
    <ToggleButtonGroup isAttached={true} {...boxProps}>
      <Button
        onClick={() => router.push({ pathname: `/map/datatool/${District}` })}
        isActive={geography === District}
        variant="leftCap"
      >
        Community District*
      </Button>
      <Button
        onClick={() => router.push({ pathname: `/map/datatool/${Borough}` })}
        isActive={geography === Borough}
        variant="middle"
      >
        Borough
      </Button>
      <Button
        onClick={() => router.push({ pathname: `/map/datatool/${Citywide}` })}
        isActive={geography === Citywide}
        variant="rightCap"
      >
        Citywide
      </Button>
    </ToggleButtonGroup>
  );
};
