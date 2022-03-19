import { Category } from "@constants/Category";
import { Geography } from "@constants/geography";
import { Subgroup } from "@constants/Subgroup";
import { NYC } from "@constants/geoid";
import { DataExplorerState } from "@hooks/useDataExplorerState";
import { ParsedUrlQuery } from "querystring";

// TODO - refactor to throw errors for invalid or undefined geography, geoid, and category values
// Currently this function returns defaults if given invalid values, which could lead to
// difficult to debug errors.
export const parseDataExplorerSelection = (
  query: ParsedUrlQuery
): DataExplorerState => {
  const { geography, geoid, category, subgroup } = query;

  const result: DataExplorerState = {
    geography: Geography.CITYWIDE,
    geoid: NYC,
    category: Category.DEMO,
    subgroup: Subgroup.TOT,
  };

  if (
    typeof geography === "string" &&
    Object.values(Geography).includes(geography as Geography)
  ) {
    result.geography = geography as Geography;
  }

  if (typeof geoid === "string" && geoid.length > 0) {
    result.geoid = geoid;
  }

  if (
    typeof category === "string" &&
    Object.values(Category).includes(category as Category)
  ) {
    result.category = category as Category;
  }

  if (
    typeof subgroup === "string" &&
    Object.values(Subgroup).includes(subgroup as Subgroup)
  ) {
    result.subgroup = subgroup as Subgroup;
  }

  return result;
};
