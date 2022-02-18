export const categories = ["demo", "econ", "hsaq", "hopd", "qlao"] as const;

export type Category = typeof categories[number];
