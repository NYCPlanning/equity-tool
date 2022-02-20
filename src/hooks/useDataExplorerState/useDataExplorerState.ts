import { useRouter } from "next/router";
import { categories, Category } from "@constants/Category";

export interface DataExplorerState {
  geography: string;
  geoid: string;
  category: Category;
}

export const useDataExplorerState = (): DataExplorerState => {
  const router = useRouter();
  const { geography, geoid, category } = router.query;

  const result: DataExplorerState = {
    geography: "citywide",
    geoid: "1",
    category: categories.DEMO,
  };

  if (typeof geography === "string" && geography.length > 0) {
    result.geography = geography;
  }

  if (typeof geoid === "string" && geoid.length > 0) {
    result.geoid = geoid;
  }

  if (
    typeof category === "string" &&
    Object.values(categories).includes(category as Category)
  ) {
    result.category = category as Category;
  }

  return result;
};
