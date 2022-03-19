import { useRouter } from "next/router";
import { Category } from "@constants/Category";
import { Geography } from "@constants/geography";
import { Subgroup } from "@constants/Subgroup";
import { parseDataExplorerSelection } from "@helpers/parseDataExplorerSelection";

export interface DataExplorerState {
  geography: Geography;
  geoid: string;
  category: Category;
  subgroup: Subgroup;
}

export const useDataExplorerState = (): DataExplorerState => {
  const router = useRouter();
  return parseDataExplorerSelection(router.query);
};
