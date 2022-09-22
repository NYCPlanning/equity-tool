import { useRouter } from "next/router";

export const useGeoid = (): string | null => {
  const router = useRouter();

  const { geoid } = router.query;

  if (typeof geoid === "string" && geoid.length > 0) {
    return geoid;
  }
  return null;
};
