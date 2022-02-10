import { Text, Link } from "@chakra-ui/react";
import { useView } from "@hooks/useView";

const WelcomeContent = () => {
  const view = useView();

  if (view === "datatool") {
    return (
      <>
        <Text>You don&apos;t have anything selected yet.</Text>
        <br />
        <Text>
          Make a selection on the map to explore data indicators and change over
          time in the Data Tool.
        </Text>
        <br />
        <Text>
          Or switch to the Displacement Risk Index (DRI) and select a
          neighborhood to see its’ DRI Profile.
        </Text>

        <br />

        <Link href="/about">Learn More About the Data Tool</Link>
      </>
    );
  }

  if (view === "dri") {
    return (
      <>
        <Text>You don&apos;t have anything selected yet.</Text>
        <br />
        <Text>
          Select a neighborhood on the map to explore it’s Displacement Risk
          Index (DRI).
        </Text>
        <br />
        <Text>
          Or switch to the Data Tool and make a selection to to explore data
          indicators and change over time.
        </Text>
        <br />
        <Link href="/about">Learn More About the DRI</Link>
      </>
    );
  }

  return <></>;
};

export default WelcomeContent;
