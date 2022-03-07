import { useRouter } from "next/router";
import { Category } from "@constants/Category";
import { Geography } from "@constants/geography";
import { Subgroup } from "@constants/Subgroup";
import { NYC } from "@constants/geoid";

export interface DataExplorerState {
  geography: Geography;
  geoid: string;
  category: Category;
  subgroup: Subgroup;
}

export const useDataExplorerState = (): DataExplorerState => {
  const router = useRouter();
  const { geography, geoid, category, subgroup } = router.query;

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
