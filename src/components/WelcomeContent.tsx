import { Heading, Text, Link } from "@chakra-ui/react";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import ReactGA from "react-ga4";

const WelcomeContent = () => {
  const { view } = useMapSubrouteInfo();

  if (view === "data") {
    return (
      <>
        <Heading as="h3" fontSize="1.5625rem">
          Welcome!
        </Heading>
        <br />

        <Text>You don&apos;t have anything selected yet.</Text>
        <br />
        <Text>
          Make a selection on the map to explore how demographic, housing, and
          quality of life characteristics compare across neighborhoods and
          demographic groups over the past two decades.
        </Text>
        <br />
        <Text>
          Make your selection by community district*, borough, or city.
        </Text>
        <br />
        <Text>
          Or, switch to the Displacement Risk Map and select a neighborhood to
          see the level of risk residents face of being unable to remain in
          their homes or neighborhoods.
        </Text>
      </>
    );
  }

  if (view === "drm") {
    return (
      <>
        <Heading as="h3" fontSize="1.5625rem">
          Welcome!
        </Heading>
        <br />

        <Text>You don&apos;t have anything selected yet.</Text>
        <br />
        <Text>
          This Displacement Risk Map illustrates the level of risk residents
          face of being unable to remain in their homes or neighborhoods.
        </Text>
        <br />
        <Text>
          Explore the displacement risk map to see the estimated level of
          displacement risk in neighborhoods citywide as compared to each other.
          Select a neighborhood to see a breakdown of the factors contributing
          to displacement risk (population vulnerability, housing conditions,
          and market pressure) and the data points that comprise them. See maps
          of each of the individual data points&nbsp;
          <Link
            href="https://storymaps.arcgis.com/stories/79237333bb90492ba0de486c0705f9f7"
            onClick={() => {
              ReactGA.event({
                category: "DRM Sidebar",
                action: "Outbound Click",
                label: "Storymaps",
              });
            }}
          >
            here
          </Link>
          .
        </Text>
        <br />
        <Text>
          Or, switch to Community Data and make a selection to explore how
          demographic, housing, and quality of life characteristics compare
          across neighborhoods and demographic groups over the past two decades.
        </Text>

        <br />
      </>
    );
  }

  return <></>;
};

export default WelcomeContent;
