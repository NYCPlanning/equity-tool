import React from "react";
import drmData from "@data/DRI_Subindices_Indicators.json";
import { Box, Divider, Heading, Text, Flex } from "@chakra-ui/react";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { Subindicator } from "./Subindicator";
import { DataPoint } from "./DataPoint";
import { DataDownloadModal } from "@components/DataDownloadModal";

export const DRMSelection = () => {
  const { geoid } = useMapSubrouteInfo();

  const selectedDRMdata = drmData.find((nta: any) => nta.ntacode === geoid);

  return (
    <>
      <Box p="1rem 0.75rem 1rem 0.75rem" flex="auto">
        <Flex direction="row" justifyContent="space-between">
          <Box>
            <Heading as="h2" fontSize="1.3rem" fontWeight={700}>
              Displacement Risk Index (DRI) Profile
            </Heading>
          </Box>
          <Box pl="0.5rem">
            <DataDownloadModal downloadType="drm" geoid={geoid} />
          </Box>
        </Flex>

        <Text>Select a DRI indicator to learn more about it.</Text>
      </Box>
      <hr />

      <Box p="0rem 1rem 0rem 1rem">
        <Subindicator
          subindicatorTitle="Vulnerability"
          subindicatorBin={selectedDRMdata?.populationvulnerability_reclass}
        />
        <DataPoint
          title="Non-white Population"
          value={selectedDRMdata?.percentnotwhite}
          percentage={true}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="income below 200% of Federal poverty rate"
          value={selectedDRMdata?.percentbelow2xpovertyrate}
          percentage={true}
          moe={selectedDRMdata?.percentbelow2xpovertyrate_moe}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="limited-English speaking population"
          value={selectedDRMdata?.limitedenglishproficiency}
          percentage={true}
          moe={selectedDRMdata?.limitedenglishproficiency_moe}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="households with severe rent burden"
          value={selectedDRMdata?.percentrentburdenedvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor={"#A0AEC0"} />

        <Subindicator
          subindicatorTitle="Housing Conditions"
          subindicatorBin={selectedDRMdata?.housingconditions_reclass}
        />
        <DataPoint
          title="housing with 3+ maintenance deficiencies"
          value={
            selectedDRMdata?.percentunitswith3plusmaintenancedeficienciesvscity
          }
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor={"#A0AEC0"} />
        {/* Is this the correct field? */}
        <DataPoint
          title="Housing NY &amp; NYC Housing Authority (NYCHA)"
          value={selectedDRMdata?.percentunitswithnoincomerestrictions}
          percentage={true}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="Rent-Stabilized Housing units"
          value={selectedDRMdata?.percentunitswithrentregulationsvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="renter-occupied housing units"
          value={selectedDRMdata?.percentrenters}
          percentage={true}
          moe={selectedDRMdata?.percentrenters_moe}
        />
        <Divider borderColor={"#A0AEC0"} />

        <Subindicator
          subindicatorTitle="Pressure"
          subindicatorBin={selectedDRMdata?.marketpressure_reclass}
        />
        <DataPoint
          title="Rent Change Vs. City"
          value={selectedDRMdata?.changeinrentsvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="Price Appreciation"
          value={selectedDRMdata?.salespriceappreciation}
          percentage={false}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="Bachelors degree Or Higher Change"
          value={selectedDRMdata?.changeinpopulationwithbachelorsdegreesvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor={"#A0AEC0"} />
        <DataPoint
          title="Adjacent Neighborhood Pressure"
          value={selectedDRMdata?.adjacency}
          percentage={false}
          noNumber={true}
        />
      </Box>
    </>
  );
};
