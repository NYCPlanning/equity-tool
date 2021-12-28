import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { GeographySelect  } from "@components/Map/GeographySelect";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";
import {
  CartoLayer,
  MAP_TYPES,
} from "@deck.gl/carto";

const CensusArea = () => {
  const router = useRouter();

  const layers = [
    new CartoLayer({
      type: MAP_TYPES.QUERY,
      id: "censusarea",
      data: `SELECT * FROM pff_2020_census_tracts_21c`,
      uniqueIdProperty: "id",
      getLineColor: [100, 100, 100, 255],
      getFillColor: [0, 0, 0, 0],
      lineWidthMinPixels: 3,
      stroked: true,
      pickable: true,
      onClick: (info: any) => {
        const id: any = info?.object?.properties?.id
          ? info.object.properties.id
          : null;
        if (typeof id === "string") {
          router.push(`/nta/${id}`, undefined, { shallow: true });
        }
      },
    }),
  ];

  return (
    <Box height="100vh">
      <Header />
      <Map
        layers={layers}
      />

      <Flex direction="column" justify="end" height="100%">
        <Legend
          position={["relative", "absolute"]}
          left={["auto", 8]}
          bottom={["auto", 8]}
          w={["100%", "215px"]}
        />

        <GeographySelect
          geography='census'
          position={["relative", "absolute"]}
          top={["auto", 20]}
          left={["auto", 8]}
        />

        <IndicatorPanel />
      </Flex>
    </Box>)
  };

export default CensusArea;
