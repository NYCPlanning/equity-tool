import axios from "axios";

import { findAddresses } from "./findAddresses";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("findAddresses", () => {
  it("requests matching addresses from geosearch", async () => {
    const signal = new AbortController().signal;

    const responseData = {
      features: [
        {
          geometry: {
            coordinates: [-74.010542, 40.708233] as [number, number],
          },
          properties: {
            id: "4179",
            name: "120 BROADWAY",
            borough: "Manhattan",
            label: "120 BROADWAY, New York, NY, USA",
          },
        },
      ],
    };

    mockedAxios.get.mockResolvedValue({
      data: responseData,
    });

    const result = await findAddresses("120 br", signal);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://geosearch.planninglabs.nyc/v2/autocomplete",
      {
        params: {
          text: "120 br",
          size: 5,
        },
        signal,
      }
    );

    expect(result).toEqual(responseData);
  });
});
