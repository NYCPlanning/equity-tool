import { Link, TableCaption, Text } from "@chakra-ui/react";

export const AMITableFootnote = () => (
  <TableCaption>
    <Text>
      *AMI, or Area Median Income, refers to U.S. Housing and Urban Development
      annual Income Limits for New York City. HUD establishes these Income
      Limits each year to administer federal housing funds, such as housing tax
      credits and rental assistance benefits. Each metropolitan area has unique
      Income Limits. In government-administered affordable housing, these Income
      Limits establish maximum eligible household incomes for new rentals or
      homes for sale.
    </Text>
    <Text>
      In New York City, because housing costs are so high, Income Limits are not
      calculated using New Yorkers’ incomes. In NYC, Income Limits are based on
      the income needed to afford currently available market rate housing. Learn
      more about how HUD calculates NYC’s 2022 Income Limits here:{" "}
      <Link
        href="https://www.huduser.gov/portal/datasets/il/il2022/2022IlCalc.odn"
        isExternal
      >
        FY 2022 Income Limits Documentation System -- Income Limits Calculations
        for New York, NY HUD Metro FMR Area (huduser.gov)
      </Link>
    </Text>
  </TableCaption>
);
