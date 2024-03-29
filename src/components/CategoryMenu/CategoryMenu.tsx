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
import ReactGA from "react-ga4";

export interface CategoryMenuProps extends FlexProps {
  currentCategory?: Category;
  geography: Geography;
  geoid: string;
  shouldDisableTooltips?: boolean;
}

export const CategoryMenu = ({
  geography,
  geoid,
  currentCategory,
  shouldDisableTooltips = true,
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
      icon={<FontAwesomeIcon icon={faUserGroup} width="1.5rem" />}
      href={`/data/${geography}/${geoid}/${Category.DEMO}/tot`}
      isActive={currentCategory === Category.DEMO}
      isTooltipDisabled={shouldDisableTooltips}
      onClick={() => {
        ReactGA.event({
          category: "Select Community Data Profile",
          action: "Demographic Conditions",
          label: `${geoid}`,
        });
      }}
    >
      Demographic Conditions
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<FontAwesomeIcon icon={faUmbrella} width="1.5rem" />}
      href={`/data/${geography}/${geoid}/${Category.ECON}/tot`}
      isActive={currentCategory === Category.ECON}
      isTooltipDisabled={shouldDisableTooltips}
      onClick={() => {
        ReactGA.event({
          category: "Select Community Data Profile",
          action: "Household Economic Security",
          label: `${geoid}`,
        });
      }}
    >
      Household Economic Security
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<FontAwesomeIcon icon={faHouseUser} width="1.5rem" />}
      href={`/data/${geography}/${geoid}/${Category.HSAQ}/tot`}
      isActive={currentCategory === Category.HSAQ}
      isTooltipDisabled={shouldDisableTooltips}
      onClick={() => {
        ReactGA.event({
          category: "Select Community Data Profile",
          action: "Housing Security, Affordability and Quality",
          label: `${geoid}`,
        });
      }}
    >
      Housing Affordability, Quality, and Security
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<BuildingHouseIcon />}
      href={`/data/${geography}/${geoid}/${Category.HOPD}/tot`}
      isActive={currentCategory === Category.HOPD}
      isTooltipDisabled={shouldDisableTooltips}
      onClick={() => {
        ReactGA.event({
          category: "Select Community Data Profile",
          action: "Housing Production",
          label: `${geoid}`,
        });
      }}
    >
      Housing Production
    </CategoryMenuLink>
    <CategoryMenuLink
      icon={<MentalHealthIcon />}
      href={`/data/${geography}/${geoid}/${Category.QLAO}/tot`}
      isActive={currentCategory === Category.QLAO}
      isTooltipDisabled={shouldDisableTooltips}
      onClick={() => {
        ReactGA.event({
          category: "Select Community Data Profile",
          action: "Quality of Life and Access to Opportunity",
          label: `${geoid}`,
        });
      }}
    >
      Quality of Life and Access to Opportunity
    </CategoryMenuLink>
  </Flex>
);
