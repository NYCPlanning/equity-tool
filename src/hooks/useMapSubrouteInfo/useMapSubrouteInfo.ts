import { useRouter } from "next/router";
import { Geography } from "@constants/geography";

type ViewValue = "drm" | "data" | null;

interface SubrouteInfo {
  view: ViewValue;
  geography: Geography | null;
  geoid: string | null;
}

// Use under Map/ route to acquire subroute view, geography, geoid info
export const useMapSubrouteInfo = (): SubrouteInfo => {
  const router = useRouter();

  const { view, geography, geoid } = router.query;

  const viewParam: ViewValue = view === "drm" || view === "data" ? view : null;

  const geographyParam: Geography | null =
    Array.isArray(geography) || geography === undefined
      ? null
      : Object.values(Geography).includes(geography as Geography)
      ? (geography as Geography)
      : null;

  const geoidParam: string | null =
    Array.isArray(geoid) || geoid === undefined ? null : geoid;

  return { view: viewParam, geography: geographyParam, geoid: geoidParam };
};
