import axios from "axios";
import type { AddressResult } from "./types";

export const findAddresses = async (
  text: string,
  signal?: AbortSignal
): Promise<AddressResult> => {
  const response = await axios.get<AddressResult>(
    "https://geosearch.planninglabs.nyc/v2/autocomplete",
    {
      params: {
        text,
        size: 5,
      },
      signal,
    }
  );

  return response.data;
};
