import { Box, Link, Text } from "@chakra-ui/react";

interface AMITableFootnoteProps {
  shouldDisplay: boolean;
}

export const AMIFootnote = ({ shouldDisplay }: AMITableFootnoteProps) =>
  shouldDisplay ? (
    <Box>
      <Text
        align="left"
        padding={1}
        fontStyle="italic"
        fontSize="md"
        color={"gray"}
      >
        *AMI, or Area Median Income, refers to U.S. Housing and Urban
        Development annual Income Limits for New York City. HUD establishes
        these Income Limits each year to administer federal housing funds, such
        as housing tax credits and rental assistance benefits. Each metropolitan
        area has unique Income Limits. In government-administered affordable
        housing, these Income Limits establish maximum eligible household
        incomes for new rentals or homes for sale.
      </Text>
      <Text
        align="left"
        padding={1}
        fontStyle="italic"
        fontSize="md"
        color={"gray"}
      >
        In New York City, because housing costs are so high, Income Limits are
        not calculated using New Yorkers’ incomes. In NYC, Income Limits are
        based on the income needed to afford currently available market rate
        housing. Learn more about how HUD calculated NYC’s Income Limits here:{" "}
        <Link
          href="https://www.huduser.gov/portal/datasets/il/il2025/2025summary.odn?STATES=36.0&INPUTNAME=METRO35620MM5600*3606199999%2BNew+York+County&statelist=&stname=New+York&wherefrom=&statefp=36&year=2025&ne_flag=&selection_type=county&incpath=&data=2025&SubmitButton=View+County+Calculations"
          isExternal
        >
          FY 2025 Income Limits Documentation System -- Income Limits
          Calculations for New York, NY HUD Metro FMR Area (huduser.gov)
        </Link>
      </Text>
    </Box>
  ) : (
    <></>
  );
