import { useRouter } from "next/router";
import { categories, Category } from "@constants/Category";

interface DataExplorerState {
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
    category: "demo",
  };

  if (typeof geography === "string" && geography.length > 0) {
    result.geography = geography;
  }

  if (typeof geoid === "string" && geoid.length > 0) {
    result.geoid = geoid;
  }

  if (typeof category === "string" && category in categories) {
    result.category = category as Category;
  }

  return result;
};
