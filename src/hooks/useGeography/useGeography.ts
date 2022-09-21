import { useRouter } from "next/router";
import { Geography } from "@constants/geography";

export const useGeography = (): Geography => {
  const router = useRouter();

  const { geography } = router.query;

  if (
    typeof geography !== "string" ||
    !Object.values(Geography).includes(geography as Geography)
  ) {
    throw new TypeError("Invalid geography value found in route parameters");
  }
  return geography as Geography;
};
