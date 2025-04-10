export const isWinOS = () => {
  if (navigator.userAgent) {
    return navigator.userAgent.toLowerCase().includes("windows");
  }
};
