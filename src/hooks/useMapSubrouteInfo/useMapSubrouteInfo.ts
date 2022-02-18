import { useRouter } from "next/router";

type ViewValue = "dri" | "datatool" | null;

interface SubrouteInfo {
  view: ViewValue;
  geography: string | null;
  geoid: string | null;
}

// Use under Map/ route to acquire subroute view, geography, geoid info
export const useMapSubrouteInfo = (): SubrouteInfo => {
  const router = useRouter();

  const { subroutes } = router.query;

  const [viewParam, geographyParam, geoidParam] = subroutes
    ? subroutes
    : [null, null, null];

  const view =
    typeof viewParam === "string"
      ? viewParam === "dri" || viewParam === "datatool"
        ? viewParam
        : null
      : viewParam !== null && viewParam !== undefined
      ? viewParam[0]
      : null;

  const geography =
    typeof geographyParam === "string"
      ? geographyParam
      : geographyParam !== null && geographyParam !== undefined
      ? geographyParam[0]
      : null;

  const geoid = geoidParam ? geoidParam : null;

  return { view, geography, geoid };
};
