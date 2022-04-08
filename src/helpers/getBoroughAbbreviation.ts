import { hasOwnProperty } from "@helpers/hasOwnProperty";

export const getBoroughAbbreviation = (id: string) => {
  const boroughs = {
    "1": "MN",
    "2": "BX",
    "3": "BK",
    "4": "QN",
    "5": "SI",
  };

  return hasOwnProperty(boroughs, id) ? boroughs[id] : "";
};
