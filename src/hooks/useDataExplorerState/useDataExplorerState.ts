import { useRouter } from "next/router";
import { Category } from "@constants/Category";
import { Geography } from "@constants/geography";
import { NYC } from "@constants/geoid";

export interface DataExplorerState {
  geography: Geography;
  geoid: string;
  category: Category;
}

export const useDataExplorerState = (): DataExplorerState => {
  const router = useRouter();
  const { geography, geoid, category } = router.query;

  const result: DataExplorerState = {
    geography: Geography.Citywide,
    geoid: NYC,
    category: Category.DEMO,
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

  return result;
};
