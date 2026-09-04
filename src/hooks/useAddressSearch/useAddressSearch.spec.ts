import { act } from "react";
import { renderHook } from "@testing-library/react";
import { useCombobox } from "@nycplanning/streetscape";
import type {
  ComboboxInputValueChangeDetails,
  ComboboxSelectionDetails,
} from "@nycplanning/streetscape";
import { useAddressSearch } from "./useAddressSearch";
import { findAddresses } from "@services/geosearch/findAddresses";
import type { AddressFeature } from "@services/geosearch/types";

jest.mock("@services/geosearch/findAddresses");

jest.mock("@nycplanning/streetscape", () => ({
  createListCollection: jest.fn((options: { items: unknown[] }) => ({
    items: options.items,
  })),
  useCombobox: jest.fn(),
}));

type MockComboboxConfig = {
  onInputValueChange: (details: ComboboxInputValueChangeDetails) => void;
  onSelect: (details: ComboboxSelectionDetails) => void;
};

const mockedFindAddresses = findAddresses as jest.MockedFunction<
  typeof findAddresses
>;

const mockedUseCombobox = useCombobox as unknown as jest.Mock;

let mockComboboxConfig: MockComboboxConfig;

const addressFeature: AddressFeature = {
  geometry: {
    coordinates: [-74.010542, 40.708233],
  },
  properties: {
    id: "4179",
    name: "120 BROADWAY",
    borough: "Manhattan",
    label: "120 BROADWAY, New York, NY, USA",
  },
};

describe("useAddressSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();

    mockedUseCombobox.mockImplementation((config: MockComboboxConfig) => {
      mockComboboxConfig = config;

      return {};
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("does not search when the query is shorter than 3 characters", () => {
    const { result } = renderHook(() => useAddressSearch());

    act(() => {
      mockComboboxConfig.onInputValueChange({
        reason: "input-change",
        inputValue: "12",
      } as ComboboxInputValueChangeDetails);
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockedFindAddresses).not.toHaveBeenCalled();
    expect(result.current.addressSearchResults.items).toEqual([]);
  });

  it("debounces the search and returns mapped address results", async () => {
    mockedFindAddresses.mockResolvedValue({
      features: [addressFeature],
    });

    const { result } = renderHook(() => useAddressSearch());

    act(() => {
      mockComboboxConfig.onInputValueChange({
        reason: "input-change",
        inputValue: "120",
      } as ComboboxInputValueChangeDetails);
    });

    act(() => {
      jest.advanceTimersByTime(150);
    });

    act(() => {
      mockComboboxConfig.onInputValueChange({
        reason: "input-change",
        inputValue: "120 br",
      } as ComboboxInputValueChangeDetails);
    });

    await act(async () => {
      jest.advanceTimersByTime(300);
      await Promise.resolve();
    });

    expect(mockedFindAddresses).toHaveBeenCalledTimes(1);
    expect(mockedFindAddresses).toHaveBeenCalledWith(
      "120 br",
      expect.any(AbortSignal)
    );

    expect(result.current.addressSearchResults.items).toEqual([
      {
        label: "120 BROADWAY, New York, NY, USA",
        value: "4179",
        coordinates: [-74.010542, 40.708233],
      },
    ]);
  });

  it("sets the selected address when a result is selected", async () => {
    mockedFindAddresses.mockResolvedValue({
      features: [addressFeature],
    });

    const { result } = renderHook(() => useAddressSearch());

    act(() => {
      mockComboboxConfig.onInputValueChange({
        reason: "input-change",
        inputValue: "120 br",
      } as ComboboxInputValueChangeDetails);
    });

    await act(async () => {
      jest.advanceTimersByTime(300);
      await Promise.resolve();
    });

    act(() => {
      mockComboboxConfig.onSelect({
        itemValue: "4179",
      } as ComboboxSelectionDetails);
    });

    expect(result.current.selectedAddress).toEqual({
      id: "4179",
      label: "120 BROADWAY, New York, NY, USA",
      coordinates: [-74.010542, 40.708233],
    });

    expect(result.current.addressSearchQuery).toBe(
      "120 BROADWAY, New York, NY, USA"
    );

    await act(async () => {
      jest.advanceTimersByTime(300);
      await Promise.resolve();
    });

    // Selecting the result should not search the full address again.
    expect(mockedFindAddresses).toHaveBeenCalledTimes(1);
  });

  it("clears the search and selected address", async () => {
    mockedFindAddresses.mockResolvedValue({
      features: [addressFeature],
    });

    const { result } = renderHook(() => useAddressSearch());

    act(() => {
      mockComboboxConfig.onInputValueChange({
        reason: "input-change",
        inputValue: "120 br",
      } as ComboboxInputValueChangeDetails);
    });

    await act(async () => {
      jest.advanceTimersByTime(300);
      await Promise.resolve();
    });

    act(() => {
      mockComboboxConfig.onSelect({
        itemValue: "4179",
      } as ComboboxSelectionDetails);
    });

    act(() => {
      mockComboboxConfig.onInputValueChange({
        reason: "clear-trigger",
        inputValue: "",
      } as ComboboxInputValueChangeDetails);
    });

    expect(result.current.addressSearchQuery).toBeNull();
    expect(result.current.selectedAddress).toBeNull();
    expect(result.current.addressSearchResults.items).toEqual([]);
    expect(result.current.addressSearchError).toBeNull();
  });

  it("sets an error when the address search fails", async () => {
    mockedFindAddresses.mockRejectedValue(new Error("Geosearch failed"));

    const { result } = renderHook(() => useAddressSearch());

    act(() => {
      mockComboboxConfig.onInputValueChange({
        reason: "input-change",
        inputValue: "120 br",
      } as ComboboxInputValueChangeDetails);
    });

    await act(async () => {
      jest.advanceTimersByTime(300);
      await Promise.resolve();
    });

    expect(result.current.addressSearchError).toEqual(
      new Error("Geosearch failed")
    );
    expect(result.current.addressSearchResults.items).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});
