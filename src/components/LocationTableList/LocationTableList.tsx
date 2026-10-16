import { Flex, Hide, Show } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import {
  LocationTableDesktop,
  LocationTableMobile,
} from "@components/LocationTable";

export interface LocationTableListProps {
  selectedVintage: Vintage;
  boroughVintage: Vintage;
  citywideVintage: Vintage;
}

export const LocationTableList = ({
  selectedVintage,
  boroughVintage,
  citywideVintage,
}: LocationTableListProps) => {
  return (
    <>
      <Hide above="md">
        <Flex
          flexShrink={1}
          overflowX="auto"
          paddingRight="0.75rem"
          direction="column"
          gridGap="0.75rem"
        >
          <LocationTableMobile
            selectedVintage={selectedVintage}
            boroughVintage={boroughVintage}
            citywideVintage={citywideVintage}
          />
        </Flex>
      </Hide>

      <Show above="md">
        <Flex overflowX="auto" paddingRight="1rem">
          <LocationTableDesktop
            selectedVintage={selectedVintage}
            boroughVintage={boroughVintage}
            citywideVintage={citywideVintage}
          />
        </Flex>
      </Show>
    </>
  );
};
