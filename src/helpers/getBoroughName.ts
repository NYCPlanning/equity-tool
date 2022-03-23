import { hasOwnProperty } from "@helpers/hasOwnProperty";

export const getBoroughName = (id: string) => {
  const boroughs = {
    "1": "Manhattan",
    "2": "Bronx",
    "3": "Brooklyn",
    "4": "Queens",
    "5": "Staten Island",
  };

  return hasOwnProperty(boroughs, id) ? boroughs[id] : "";
};
