import { useRouter } from "next/router";
import { Category } from "@constants/Category";

export const useCategory = (): Category => {
  const router = useRouter();

  const { category } = router.query;

  if (
    typeof category !== "string" ||
    !Object.values(Category).includes(category as Category)
  ) {
    throw new TypeError("Invalid category value found in route parameters");
  }
  return category as Category;
};
