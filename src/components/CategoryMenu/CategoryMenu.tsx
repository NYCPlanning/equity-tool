import { Flex, FlexProps } from "@chakra-ui/react";
import { CategoryMenuLink } from "@components/CategoryMenu";
import { categories, Category } from "@constants/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BuildingHouseIcon, MentalHealthIcon } from "@components/Icons";
import {
  faUserGroup,
  faUmbrella,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";

export interface CategoryMenuProps extends FlexProps {
  currentCategory?: Category;
  geography: string;
  geoid: string;
}

export const CategoryMenu = ({
  geography,
  geoid,
  currentCategory,
  ...flexProps
}: CategoryMenuProps) => {
  console.log(currentCategory, categories.QLAO);

  return (
    <Flex
      direction={{ base: "row", md: "column" }}
      gridGap={{ base: "0.75rem", md: 0 }}
      px={{ base: "0.75rem", md: "0rem" }}
      overflowX={{ base: "auto", md: "hidden" }}
      {...flexProps}
    >
      <CategoryMenuLink
        icon={<FontAwesomeIcon icon={faUserGroup} />}
        href={`/data/${geography}/${geoid}/${categories.DEMO}`}
        isActive={currentCategory === categories.DEMO}
      >
        Demographic Conditions
      </CategoryMenuLink>
      <CategoryMenuLink
        icon={<FontAwesomeIcon icon={faUmbrella} />}
        href={`/data/${geography}/${geoid}/${categories.ECON}`}
        isActive={currentCategory === categories.ECON}
      >
        Household Economic Security
      </CategoryMenuLink>
      <CategoryMenuLink
        icon={<FontAwesomeIcon icon={faHouseUser} />}
        href={`/data/${geography}/${geoid}/${categories.HSAQ}`}
        isActive={currentCategory === categories.HSAQ}
      >
        Housing Security, Affordability and Quality
      </CategoryMenuLink>
      <CategoryMenuLink
        icon={<BuildingHouseIcon />}
        href={`/data/${geography}/${geoid}/${categories.HOPD}`}
        isActive={currentCategory === categories.HOPD}
      >
        Housing Production
      </CategoryMenuLink>
      <CategoryMenuLink
        icon={<MentalHealthIcon />}
        href={`/data/${geography}/${geoid}/${categories.QLAO}`}
        isActive={currentCategory === categories.QLAO}
      >
        Quality of Life and Access to Opportunity
      </CategoryMenuLink>
    </Flex>
  );
};
