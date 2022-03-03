import { Flex, FlexProps } from "@chakra-ui/react";
import { CategoryMenuLink } from "@components/CategoryMenu";
import { Category } from "@constants/Category";
import { Geography } from "@constants/geography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BuildingHouseIcon, MentalHealthIcon } from "@components/Icons";
import {
  faUserGroup,
  faUmbrella,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";

export interface CategoryMenuProps extends FlexProps {
  currentCategory?: Category;
  geography: Geography;
  geoid: string;
}

export const CategoryMenu = ({
  geography,
  geoid,
  currentCategory,
  ...flexProps
}: CategoryMenuProps) => (
  <Flex
    direction={{ base: "row", md: "column" }}
    gridGap={{ base: "0.75rem", md: 0 }}
    px={{ base: "0.75rem", md: "0rem" }}
    overflowX={{ base: "auto", md: "hidden" }}
    {...flexProps}
  >
    <CategoryMenuLink
      icon={<FontAwesomeIcon icon={faUserGroup} />}
      href={`/data/${geography}/${geoid}/${Category.DEMO}`}
      isActive={currentCategory === Category.DEMO}
    >
      Demographic Conditions
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<FontAwesomeIcon icon={faUmbrella} />}
      href={`/data/${geography}/${geoid}/${Category.ECON}`}
      isActive={currentCategory === Category.ECON}
    >
      Household Economic Security
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<FontAwesomeIcon icon={faHouseUser} />}
      href={`/data/${geography}/${geoid}/${Category.HSAQ}`}
      isActive={currentCategory === Category.HSAQ}
    >
      Housing Security, Affordability and Quality
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<BuildingHouseIcon />}
      href={`/data/${geography}/${geoid}/${Category.HOPD}`}
      isActive={currentCategory === Category.HOPD}
    >
      Housing Production
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<MentalHealthIcon />}
      href={`/data/${geography}/${geoid}/${Category.QLAO}`}
      isActive={currentCategory === Category.QLAO}
    >
      Quality of Life and Access to Opportunity
    </CategoryMenuLink>
  </Flex>
);
