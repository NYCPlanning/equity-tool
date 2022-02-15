import { useRouter } from "next/router";
import { BoxProps, Button } from "@chakra-ui/react";
import { ToggleButtonGroup } from "@components/ToggleButtonGroup";

interface GeographySelectProps extends BoxProps {
  geography: string | null;
}

export const GeographySelect = ({
  geography,
  ...boxProps
}: GeographySelectProps) => {
  const router = useRouter();

  return (
    <ToggleButtonGroup isAttached={true} {...boxProps}>
      <Button
        onClick={() => router.push({ pathname: `/map/datatool/district` })}
        isActive={geography === "district"}
        variant="leftCap"
      >
        Community District*
      </Button>
      <Button
        onClick={() => router.push({ pathname: `/map/datatool/borough` })}
        isActive={geography === "borough"}
        variant="middle"
      >
        Borough
      </Button>
      <Button
        onClick={() => router.push({ pathname: `/map/datatool/citywide` })}
        isActive={geography === "citywide"}
        variant="rightCap"
      >
        Citywide
      </Button>
    </ToggleButtonGroup>
  );
};
