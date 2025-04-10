import { useEffect, useState } from "react";

export const useIsWindows = (): boolean => {
  const [isWindows, setIsWindows] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator?.userAgent) {
      const isWin = window.navigator.userAgent
        .toLowerCase()
        .includes("windows");
      setIsWindows(isWin);
    }
  }, []);

  return isWindows;
};
