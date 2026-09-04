export type AddressFeature = {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    id: string;
    name: string;
    borough: string;
    label: string;
  };
};

export type AddressResult = {
  features: AddressFeature[];
};
