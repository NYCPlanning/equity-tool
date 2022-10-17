import { useRouter } from "next/router";
import { useView } from "@hooks/useView";
import { useGeography } from "@hooks/useGeography";

export function useClearSelection() {
  const router = useRouter();
  const view = useView();
  const geography = useGeography();

  return () => {
    router.push(`/map/${view}/${geography}/`, undefined, { shallow: true });
  };
}
