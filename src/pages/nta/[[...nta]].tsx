import { Box, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";

export interface NtaProps {
  initialNta: string | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      props: {
        initialNta: null,
      },
    };
  }
  const { nta } = context.params;
  const selectedNtaId: string | null = nta && nta?.length > 0 ? nta[0] : null;
  return {
    props: {
      initialNta: selectedNtaId,
    },
  };
};

const Nta = ({ initialNta }: NtaProps) => {
  console.log({ initialNta });
  return (
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
        <IndicatorPanel />
      </Flex>
    </Box>
  );
};

export default Nta;
