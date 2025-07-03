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
          subindicatorBin={selection?.populationvulnerability}
        />
        <DataPoint
          title="Non-white Population"
          value={selection?.notwhite}
          percentage={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Population with income below 200% of Federal poverty rate"
          value={selection?.below2xpovertyrate}
          percentage={true}
          moe={selection?.below2xpovertyrate_moe}
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
          value={selection?.severerentburdenvscity}
          percentage={false}
          noNumber={true}
        />
      </Box>
      <Divider borderColor="gray.400" />
      <Box p="0rem 1rem 0rem 1rem">
        <Subindicator
          subindicatorTitle="Housing Conditions"
          subindicatorBin={selection?.housingconditions}
        />
        <DataPoint
          title="housing with 3+ maintenance deficiencies"
          value={selection?.unitswith3ormorehousingproblemsvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Housing that is not Income-Restricted"
          value={selection?.notincomerestricted}
          percentage={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="Housing that is not Rent-Stabilized"
          value={selection?.occupiedrentstabilizedasashareofalloccupiedvscity}
          percentage={false}
          noNumber={true}
        />
        <Divider borderColor="gray.100" />
        <DataPoint
          title="renter-occupied housing units"
          value={selection?.rentalhousing}
          percentage={true}
          moe={selection?.rentalhousing_moe}
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
          title="Residential Property Price Appreciation 2000-2024"
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
