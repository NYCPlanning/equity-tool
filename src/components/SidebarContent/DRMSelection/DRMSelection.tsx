import React from "react";
import drmData from "@data/DRI_Subindices_Indicators.json";
import { Box, Divider } from "@chakra-ui/react";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { Subindicator } from "./Subindicator";
import { DataPoint } from "./DataPoint";

export const DRMSelection = () => {
  const { geoid } = useMapSubrouteInfo();

  const selectedDRMdata = drmData.find((nta: any) => nta.ntacode === geoid);

  return (
    <>
      <Divider borderColor="gray.400" pt="1.5rem" />
      <Box p="0rem 1rem 0rem 1rem">
        <Subindicator
          subindicatorTitle="Population Vulnerability"
          subindicatorBin={selectedDRMdata?.populationvulnerability_reclass}
        />
        <DataPoint
          title="Non-white Population"
          value={selectedDRMdata?.percentnotwhite}
          percentage={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="income below 200% of Federal poverty rate"
          value={selectedDRMdata?.percentbelow2xpovertyrate}
          percentage={true}
          moe={selectedDRMdata?.percentbelow2xpovertyrate_moe}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="limited-English speaking population"
          value={selectedDRMdata?.limitedenglishproficiency}
          percentage={true}
          moe={selectedDRMdata?.limitedenglishproficiency_moe}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="households with severe rent burden"
          value={selectedDRMdata?.percentrentburdenedvscity}
          percentage={false}
          noNumber={true}
        />
      </Box>
      <Divider borderColor="gray.400" />
      <Box p="0rem 1rem 0rem 1rem">
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
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Housing NY &amp; NYC Housing Authority (NYCHA)"
          value={selectedDRMdata?.percentunitswithnoincomerestrictions}
          percentage={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Rent-Stabilized Housing units"
          value={selectedDRMdata?.percentunitswithrentregulationsvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="renter-occupied housing units"
          value={selectedDRMdata?.percentrenters}
          percentage={true}
          moe={selectedDRMdata?.percentrenters_moe}
        />
      </Box>
      <Divider borderColor="gray.400" />
      <Box p="0rem 1rem 0rem 1rem">
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
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Price Appreciation"
          value={selectedDRMdata?.salespriceappreciation}
          percentage={false}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Bachelors degree Or Higher Change"
          value={selectedDRMdata?.changeinpopulationwithbachelorsdegreesvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor="gray.100" />
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
