import { useRouter } from "next/router";

type ViewValue = "dri" | "datatool";

export const useView = (): ViewValue | null => {
  const router = useRouter();

  const { subroutes } = router.query;

  const [viewParam] = subroutes ? subroutes : [null, null, null];

  return typeof viewParam === "string"
    ? viewParam === "dri" || viewParam === "datatool"
      ? viewParam
      : null
    : viewParam !== null && viewParam !== undefined
    ? viewParam[0]
    : null;
};
