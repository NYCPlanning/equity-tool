import { GetServerSideProps } from "next";
import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";
import ntas from "@data/ntas.json";
import { NtaIndicatorRecord } from "../../types";

export interface NtaProps {
  initialNtaIndicatorRecord: NtaIndicatorRecord | null;
}

export const getServerSideProps: GetServerSideProps<
  NtaProps,
  { nta: string[] }
> = async (context) => {
  if (!context.params) {
    return {
      props: {
        initialNtaIndicatorRecord: null,
      },
    };
  }
  const { nta } = context.params;
  const selectedNtaId: string | null = nta && nta?.length > 0 ? nta[0] : null;

  // This function is a helper that makes a type-safe wrapper for Object.hasOwnProperty
  // Normally we would move this somewhere sharable but since most of this code will likely only
  // be temporary, it's fine for now
  function hasOwnProperty<T>(obj: T, key: PropertyKey): key is keyof T {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  return selectedNtaId !== null && hasOwnProperty(ntas, selectedNtaId)
    ? { props: { initialNtaIndicatorRecord: ntas[selectedNtaId] } }
    : { props: { initialNtaIndicatorRecord: null } };
};

const Nta = ({ initialNtaIndicatorRecord }: NtaProps) => (
  <Box height="100vh">
    <Header />
    <Map />
    <Flex direction="column" justify="end" height="100%">
      <Legend
        position={["relative", "absolute"]}
        left={["auto", 8]}
        bottom={["auto", 8]}
        w={["100%", "215px"]}
      />
      <IndicatorPanel initialNtaIndicatorRecord={initialNtaIndicatorRecord} />
    </Flex>
  </Box>
);

export default Nta;
