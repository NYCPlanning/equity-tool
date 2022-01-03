import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";

// export interface NtaProps {
//   initialNtaIndicatorRecord: NtaIndicatorRecord | null;
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return
//   if (!context.params) {
//     return {
//       props: {
//         initialNtaIndicatorRecord: null,
//       },
//     };
//   }
//   const { nta } = context.params;
//   const selectedNtaId: string | null = nta && nta?.length > 0 ? nta[0] : null;
//   const fs = require("fs"); // eslint-disable-line @typescript-eslint/no-var-requires
//   const path = require("path"); // eslint-disable-line @typescript-eslint/no-var-requires

//   // This function is a helper that makes a type-safe wrapper for Object.hasOwnProperty
//   // Normally we would move this somewhere sharable but since most of this code will likely only
//   // be temporary, it's fine for now
//   function hasOwnProperty<T>(obj: T, key: PropertyKey): key is keyof T {
//     return Object.prototype.hasOwnProperty.call(obj, key);
//   }

//   const props: NtaProps = {
//     initialNtaIndicatorRecord: null,
//   };

//   const parseNtaJson = () => {
//     return new Promise<NtaIndicatorDict>((accept, reject) => {
//       fs.readFile(
//         path.resolve(`src/data/ntas.json`),
//         "utf8",
//         function (err: any, data: any) {
//           if (err) {
//             reject(err);
//           }
//           const ntaRawData: NtaIndicatorDict = JSON.parse(
//             data.toString("utf8").replace(/^\uFEFF/, "")
//           );
//           accept(ntaRawData);
//         }
//       );
//     });
//   };

//   const ntaIndicatorsData: NtaIndicatorDict = await parseNtaJson();
//   if (
//     selectedNtaId !== null &&
//     hasOwnProperty(ntaIndicatorsData, selectedNtaId)
//   ) {
//     props.initialNtaIndicatorRecord = ntaIndicatorsData[selectedNtaId];
//   }

//   return { props };
// };

const Nta = () => (
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

export default Nta;
