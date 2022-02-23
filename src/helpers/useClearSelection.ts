import { useRouter } from "next/router";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

export function useClearSelection() {
  const router = useRouter();
  const { view, geography } = useMapSubrouteInfo();

  return () => {
    router.push(`/map/${view}/${geography}/`);
  };
}
