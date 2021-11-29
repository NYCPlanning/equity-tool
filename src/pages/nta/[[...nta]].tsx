import { useRouter } from "next/router";
import { Box, VStack, Button, Text } from "@chakra-ui/react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import baseMap from "@data/basemap.json";
import {
  CartoLayer,
  setDefaultCredentials,
  API_VERSIONS,
  MAP_TYPES,
} from "@deck.gl/carto";

setDefaultCredentials({
  apiVersion: API_VERSIONS.V2,
  username: process.env.NEXT_PUBLIC_CARTO_USERNAME,
  apiKey: process.env.NEXT_PUBLIC_CARTO_API_KEY,
});

const Nta = () => {
  const INITIAL_VIEW_STATE = {
    longitude: -73.986607,
    latitude: 40.691869,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  const router = useRouter();

  // For useState version, comment out the next two lines
  const { nta } = router.query;
  const selectedNta: string | null = nta && nta?.length > 0 ? nta[0] : null;

  // The code below shows how you might keep track of this value with useState and useEffect
  // but it doesn't quite work because router.query.nta[0] is undefined when no nta is selected
  // I think this approach might be unnecessary, at least for this very basic functionality
  // The uncommented implementation above takes the nta id directly from the router,
  // checks to see if the nta id is the same as the currently selected one in the
  // the onClick handler and doesn't call router.push() at all if it is, savings us a rerender

  // const [selectedNta, setSelectedNta] = useState<string | null>(null);

  // useEffect(() => {
  //   const { nta } = router.query;
  //   const initialSelectedNta: string | null =
  //     nta && nta?.length > 0 ? nta[0] : null;
  //   setSelectedNta(initialSelectedNta);
  // }, []);

  // useEffect(() => {
  //   const { nta } = router.query;
  //   const newSelectedNta: string | null =
  //     nta && nta?.length > 0 ? nta[0] : null;
  //   setSelectedNta(newSelectedNta);
  // }, [router.query?.nta[0]]);

  // I changed this to be a regular variables instead of state because the event handler wouldn't work
  // otherwise. I'm pretty sure that's because state is only initialized when the component first renders, not
  // each rerender, unless it is updated with it's setter function. As it stands, this value isn't really "state"
  // anyway because it doesn't need to be updated
  // https://reactjs.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state
  const layers = [
    new CartoLayer({
      type: MAP_TYPES.QUERY,
      id: "dcpNta",
      data: `SELECT *, ntacode as id FROM dcp_nta`,
      uniqueIdProperty: "id",
      getLineColor: [100, 100, 100, 255],
      // Just to show how to color something based on an external value (selectedNta in this case)
      // This will tint the selected NTA red. See updateTriggers as well
      getFillColor: (feature: any) =>
        feature?.properties?.id === selectedNta
          ? [255, 0, 0, 50]
          : [0, 0, 0, 1],
      lineWidthMinPixels: 3,
      stroked: true,
      pickable: true,
      onClick: (info: any) => {
        const id = info && info?.object?.properties?.id;
        if (id && typeof id === "string" && id !== selectedNta) {
          router.push(`/nta/${id}`, undefined, { shallow: true });
        }
      },
      // For performance reasons, Deck doesn't automatically rerender when external data changes
      // updateTriggers lets us re-evaluate a given property when a given value changes
      // https://deck.gl/docs/developer-guide/performance#use-updatetriggers
      updateTriggers: {
        getFillColor: selectedNta,
      },
    }),
  ];

  return (
    <Box h="100vh" w="100vh">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <StaticMap
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle={baseMap}
        />
        <VStack
          position="absolute"
          top="100px"
          left="100px"
          background="#fff"
          padding="20px"
          justify="center"
        >
          <Text>{selectedNta === null ? "No NTA Selected" : selectedNta}</Text>
          <Button
            onClick={() => {
              router.push("/nta", undefined, { shallow: true });
            }}
          >
            Clear Selection
          </Button>
        </VStack>
      </DeckGL>
    </Box>
  );
};

export default Nta;
