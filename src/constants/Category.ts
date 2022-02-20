export const categories = {
  DEMO: "demo",
  ECON: "econ",
  HSAQ: "hsaq",
  HOPD: "hopd",
  QLAO: "qlao",
} as const;

export type Category = typeof categories[keyof typeof categories];
