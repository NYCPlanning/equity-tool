import { useRouter } from "next/router";
import { Subgroup } from "@constants/Subgroup";

export const useSubgroup = (): Subgroup => {
  const router = useRouter();

  const { subgroup } = router.query;
  if (
    typeof subgroup !== "string" ||
    !Object.values(Subgroup).includes(subgroup as Subgroup)
  ) {
    throw new TypeError("Invalid subgroup value found in route parameters");
  }
  return subgroup as Subgroup;
};
