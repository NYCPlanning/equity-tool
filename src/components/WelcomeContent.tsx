import { Heading, Text } from "@chakra-ui/react";
import { View } from "@constants/View";
import { useView } from "@hooks/useView";

const WelcomeContent = () => {
  const view = useView();

  if (view === View.DATA) {
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

  if (view === View.DRM) {
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
          and market pressure) and the data points that comprise them.
        </Text>
        <br />
        <Text>
          Or, switch to Community Data and make a selection to explore how
          demographic, housing, and quality of life characteristics compare
          across neighborhoods and demographic groups over the past two decades.
        </Text>
      </>
    );
  }

  return <></>;
};

export default WelcomeContent;
