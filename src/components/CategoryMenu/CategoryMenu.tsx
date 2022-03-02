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
  bottomLabels?: boolean;
}

export const CategoryMenu = ({
  geography,
  geoid,
  currentCategory,
  bottomLabels = false,
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
      flexDirection={bottomLabels ? "column" : { base: "column", md: "row" }}
      textAlign={bottomLabels ? "center" : { base: "center", md: "left" }}
    >
      Demographic Conditions
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<FontAwesomeIcon icon={faUmbrella} />}
      href={`/data/${geography}/${geoid}/${Category.ECON}`}
      isActive={currentCategory === Category.ECON}
      flexDirection={bottomLabels ? "column" : { base: "column", md: "row" }}
      textAlign={bottomLabels ? "center" : { base: "center", md: "left" }}
    >
      Household Economic Security
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<FontAwesomeIcon icon={faHouseUser} />}
      href={`/data/${geography}/${geoid}/${Category.HSAQ}`}
      isActive={currentCategory === Category.HSAQ}
      flexDirection={bottomLabels ? "column" : { base: "column", md: "row" }}
      textAlign={bottomLabels ? "center" : { base: "center", md: "left" }}
    >
      Housing Security, Affordability and Quality
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<BuildingHouseIcon />}
      href={`/data/${geography}/${geoid}/${Category.HOPD}`}
      isActive={currentCategory === Category.HOPD}
      flexDirection={bottomLabels ? "column" : { base: "column", md: "row" }}
      textAlign={bottomLabels ? "center" : { base: "center", md: "left" }}
    >
      Housing Production
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<MentalHealthIcon />}
      href={`/data/${geography}/${geoid}/${Category.QLAO}`}
      isActive={currentCategory === Category.QLAO}
      flexDirection={bottomLabels ? "column" : { base: "column", md: "row" }}
      textAlign={bottomLabels ? "center" : { base: "center", md: "left" }}
    >
      Quality of Life and Access to Opportunity
    </CategoryMenuLink>
  </Flex>
);
