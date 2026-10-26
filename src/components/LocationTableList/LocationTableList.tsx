import { Flex, Hide, Show } from "@chakra-ui/react";
import { Vintage } from "@schemas/vintage";
import {
  LocationTableDesktop,
  LocationTableMobile,
} from "@components/LocationTable";

export interface LocationTableListProps {
  selectedAreaData: Vintage;
  boroughData: Vintage;
  citywideData: Vintage;
}

export const LocationTableList = ({
  selectedAreaData,
  boroughData,
  citywideData,
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
            selectedAreaData={selectedAreaData}
            boroughData={boroughData}
            citywideData={citywideData}
          />
        </Flex>
      </Hide>

      <Show above="md">
        <Flex overflowX="auto" paddingRight="1rem">
          <LocationTableDesktop
            selectedAreaData={selectedAreaData}
            boroughData={boroughData}
            citywideData={citywideData}
          />
        </Flex>
      </Show>
    </>
  );
};
