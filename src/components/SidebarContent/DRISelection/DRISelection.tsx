import React from "react";
import dridata from "@data/DRI_Subindices_Indicators.json";
import { Box, Divider, Heading, Button, Text, Flex } from "@chakra-ui/react";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { Subindicator } from "./Subindicator";
import { DataPoint } from "./DataPoint";
import { FaDownload } from "react-icons/fa";

export const DRISelection = () => {
  const { geoid } = useMapSubrouteInfo();

  const selectedDRIdata = dridata.find((nta: any) => nta.ntacode === geoid);

  const downloadDRI = () => {
    // At some point, we'll have to make this actually download something
  };

  return (
    <>
      <Box p="1rem 0.5rem 1rem 0.5rem" flex="auto">
        <Flex direction="row" justifyContent="space-between">
          <Box>
            <Heading as="h2" fontSize="1.3rem" fontWeight={700}>
              Displacement Risk Index (DRI) Profile
            </Heading>
          </Box>
          <Box>
            <Button variant="solid" colorScheme="teal" onClick={downloadDRI}>
              <FaDownload />
            </Button>
          </Box>
        </Flex>

        <Text>Select a DRI indicator to learn more about it.</Text>
      </Box>
      <hr />

      <Box p="0rem 0.75rem 0rem 0.75rem">
        <Subindicator subindicatorTitle="Vulnerability" />
        <DataPoint
          title="Non-white Population"
          value={selectedDRIdata?.percentnotwhite}
          percentage={true}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="income below 200% of Federal poverty rate"
          value={selectedDRIdata?.percentbelow2xpovertyrate}
          percentage={true}
          moe={selectedDRIdata?.percentbelow2xpovertyrate_moe}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="limited-English speaking population"
          value={selectedDRIdata?.limitedenglishproficiency}
          percentage={true}
          moe={selectedDRIdata?.limitedenglishproficiency_moe}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="households with severe rent burden"
          value={selectedDRIdata?.percentrentburdenedvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor={"#A0AEC0"} />

        <Subindicator subindicatorTitle="Housing Conditions" />
        <DataPoint
          title="housing with 3+ maintenance deficiencies"
          value={
            selectedDRIdata?.percentunitswith3plusmaintenancedeficienciesvscity
          }
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor={"#A0AEC0"} />
        {/* Is this the correct field? */}
        <DataPoint
          title="Housing NY &amp; NYC Housing Authority (NYCHA)"
          value={selectedDRIdata?.percentunitswithnoincomerestrictions}
          percentage={true}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="Rent-Stabilized Housing units"
          value={selectedDRIdata?.percentunitswithrentregulationsvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="renter-occupied housing units"
          value={selectedDRIdata?.percentrenters}
          percentage={true}
          moe={selectedDRIdata?.percentrenters_moe}
        />
        <Divider borderColor={"#A0AEC0"} />

        <Subindicator subindicatorTitle="Pressure" />
        <DataPoint
          title="Rent Change Vs. City"
          value={selectedDRIdata?.changeinrentsvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="Price Appreciation"
          value={selectedDRIdata?.salespriceappreciation}
          percentage={false}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="Bachelors degree Or Higher Change"
          value={selectedDRIdata?.changeinpopulationwithbachelorsdegreesvscity}
          percentage={false}
          noNumber={true}
        />
      </Box>
    </>
  );
};
