import React from "react";
import { Box, Divider } from "@chakra-ui/react";
import { Subindicator } from "./Subindicator";
import { DataPoint } from "./DataPoint";
import { useSubindexSelection } from "@hooks/useSubindexSelection";

export const DRMSelection = () => {
  const selection = useSubindexSelection();

  return (
    <>
      <Divider borderColor="gray.400" pt="1.5rem" />
      <Box p="0rem 1rem 0rem 1rem">
        <Subindicator
          subindicatorTitle="Population Vulnerability"
          subindicatorBin={selection?.populationvulnerability_reclass}
        />
        <DataPoint
          title="Non-white Population"
          value={selection?.percentnotwhite}
          percentage={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Population with income below 200% of Federal poverty rate"
          value={selection?.percentbelow2xpovertyrate}
          percentage={true}
          moe={selection?.percentbelow2xpovertyrate_moe}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="limited-English speaking population"
          value={selection?.limitedenglishproficiency}
          percentage={true}
          moe={selection?.limitedenglishproficiency_moe}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="households with severe rent burden"
          value={selection?.percentrentburdenedvscity}
          percentage={false}
          noNumber={true}
        />
      </Box>
      <Divider borderColor="gray.400" />
      <Box p="0rem 1rem 0rem 1rem">
        <Subindicator
          subindicatorTitle="Housing Conditions"
          subindicatorBin={selection?.housingconditions_reclass}
        />
        <DataPoint
          title="housing with 3+ maintenance deficiencies"
          value={selection?.percentunitswith3plusmaintenancedeficienciesvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Housing that is not Income-Restricted"
          value={selection?.percentunitswithnoincomerestrictions}
          percentage={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Housing that is not Rent-Stabilized"
          value={selection?.percentunitswithrentregulationsvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="renter-occupied housing units"
          value={selection?.percentrenters}
          percentage={true}
          moe={selection?.percentrenters_moe}
        />
      </Box>
      <Divider borderColor="gray.400" />
      <Box p="0rem 1rem 0rem 1rem">
        <Subindicator
          subindicatorTitle="Market Pressure"
          subindicatorBin={selection?.marketpressure_reclass}
        />
        <DataPoint
          title="Rent Change Vs. City"
          value={selection?.changeinrentsvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Residential Property Price Appreciation 2000-2020"
          value={selection?.salespriceappreciation}
          percentage={false}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Bachelors degree Or Higher Change"
          value={selection?.changeinpopulationwithbachelorsdegreesvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Adjacent Neighborhood Pressure"
          value={selection?.adjacency}
          percentage={false}
          noNumber={true}
        />
      </Box>
    </>
  );
};
