import { Flex, Button } from "@chakra-ui/react";
import { Subgroup } from "@constants/Subgroup";
import { useSubgroup } from "@hooks/useSubgroup";
import { useGeography } from "@hooks/useGeography";
import { useGeoid } from "@hooks/useGeoid";
import { useCategory } from "@hooks/useCategory";
import { Category } from "@constants/Category";

export const SubgroupMenu = () => {
  const subgroupLabels: Record<Subgroup, string> = {
    [Subgroup.TOT]: "Total population",
    [Subgroup.ANH]: "Asian Non-Hispanic",
    [Subgroup.BNH]: "Black Non-Hispanic",
    [Subgroup.HSP]: "Hispanic",
    [Subgroup.WNH]: "White Non-Hispanic",
  };

  const currentSubgroup = useSubgroup();
  const geoid = useGeoid();
  const geography = useGeography();
  const category = useCategory();

  return (
    <Flex
      direction={"row"}
      overflowX={"auto"}
      whiteSpace={"nowrap"}
      paddingLeft={{ base: "0.75rem", md: "1rem" }}
    >
      {Object.values(Subgroup).map((subgroup) => (
        <Button
          key={`subgroup-${subgroup}`}
          bg="white"
          borderRadius={"none"}
          color="gray.600"
          fontWeight="medium"
          fontSize={"0.875rem"}
          m={0}
          px={"1rem"}
          py={"0.625rem"}
          justifyContent={"center"}
          isDisabled={category === Category.HOPD && subgroup !== Subgroup.TOT}
          aria-current={subgroup === currentSubgroup ? "page" : false}
          _activeLink={{
            boxShadow: "inset 0 -4px 0 0 #2C7A7B",
            fontWeight: "bold",
            color: "teal.600",
            background: "white",
          }}
          _hover={{
            boxShadow: "inset 0 -4px 0 0 #2C7A7B",
            background: "gray.50",
            fontWeight: "bold",
            _disabled: {
              background: "white",
              fontWeight: "medium",
              boxShadow: "unset",
            },
          }}
          _focus={{
            boxShadow: "inset 0 -4px 0 0 #2C7A7B",
            background: "gray.50",
            fontWeight: "bold",
            _disabled: {
              background: "white",
              fontWeight: "medium",
              boxShadow: "unset",
            },
          }}
          as="a"
          href={`/data/${geography}/${
            geoid ? geoid : ""
          }/${category}/${subgroup}`}
          flex={"0 0 auto"}
        >
          {subgroupLabels[subgroup]}
        </Button>
      ))}
    </Flex>
  );
};
