import { useRouter } from "next/router";
import { View } from "@constants/View";

// Use under Map/ route to acquire subroute view
export const useView = (): View => {
  const router = useRouter();

  const { view } = router.query;
  if (typeof view !== "string" || !Object.values(View).includes(view as View)) {
    throw new TypeError("Invalid view value found in route parameters");
  }
  return view as View;
};
