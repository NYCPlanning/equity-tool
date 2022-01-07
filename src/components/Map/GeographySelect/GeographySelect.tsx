import { useRouter } from "next/router";
import { BoxProps, Button, ButtonGroup } from "@chakra-ui/react";

type GeographySelectProps = {
  geography: string;
} & BoxProps;

export const GeographySelect = ({
  geography,
  ...boxProps
}: GeographySelectProps) => {
  const router = useRouter();

  return (
    <ButtonGroup isAttached {...boxProps}>
      <Button
        onClick={() => router.push({ pathname: `/map/census` })}
        isActive={geography === "census"}
      >
        Census Area
      </Button>
      <Button
        onClick={() => router.push({ pathname: `/map/borough` })}
        isActive={geography === "borough"}
      >
        Borough
      </Button>
      <Button
        onClick={() => router.push({ pathname: `/map/citywide` })}
        isActive={geography === "citywide"}
      >
        Citywide
      </Button>
    </ButtonGroup>
  );
};
