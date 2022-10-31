export function pause(ms = 0): any {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
