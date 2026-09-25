import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { createListCollection, useCombobox } from "@nycplanning/streetscape";
import type {
  ComboboxInputValueChangeDetails,
  ComboboxSelectionDetails,
  ListCollection,
  UseComboboxReturn,
} from "@nycplanning/streetscape";
import { findAddresses } from "@services/geosearch/findAddresses";
import type { AddressFeature } from "@services/geosearch/types";

const MIN_SEARCH_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 300;

export type AddressSearchItem = {
  label: string;
  value: string;
  coordinates: [number, number];
};

export type SelectedAddress = {
  id: string;
  label: string;
  coordinates: [number, number];
};

export const useAddressSearch = () => {
  const [addressSearchQuery, setAddressSearchQuery] = useState<string | null>(
    null
  );

  const [addressFeatures, setAddressFeatures] = useState<AddressFeature[]>([]);
  const [addressSearchError, setAddressSearchError] = useState<Error | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const [selectedAddress, setSelectedAddress] =
    useState<SelectedAddress | null>(null);

  useEffect(() => {
    if (
      addressSearchQuery === null ||
      addressSearchQuery.trim().length < MIN_SEARCH_LENGTH ||
      addressSearchQuery === selectedAddress?.label
    ) {
      setAddressFeatures((prev) => (prev.length === 0 ? prev : []));
      setAddressSearchError((prev) => (prev === null ? prev : null));
      setIsLoading((prev) => (prev ? false : prev));
      return;
    }

    const abortController = new AbortController();

    const timeout = window.setTimeout(async () => {
      setIsLoading(true);
      setAddressSearchError(null);

      try {
        const response = await findAddresses(
          addressSearchQuery,
          abortController.signal
        );

        setAddressFeatures(response.features);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        setAddressFeatures([]);

        setAddressSearchError(
          error instanceof Error
            ? error
            : new Error("Unable to search addresses")
        );
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeout);
      abortController.abort();
    };
  }, [addressSearchQuery, selectedAddress]);

  const items = useMemo<AddressSearchItem[]>(
    () =>
      addressFeatures.map((feature) => ({
        label: feature.properties.label,
        value: feature.properties.id,
        coordinates: feature.geometry.coordinates,
      })),
    [addressFeatures]
  );

  const collection = useMemo(
    () =>
      createListCollection({
        items,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
      }),
    [items]
  );

  const clearAddressSearch = () => {
    setAddressSearchQuery(null);
    setAddressFeatures([]);
    setAddressSearchError(null);
    setSelectedAddress(null);
  };

  const handleInputChange = (details: ComboboxInputValueChangeDetails) => {
    if (details.reason === "input-change") {
      setSelectedAddress(null);
      setAddressSearchQuery(details.inputValue);

      return;
    }

    if (details.reason === "clear-trigger") {
      clearAddressSearch();
    }
  };

  const handleSelection = (details: ComboboxSelectionDetails) => {
    const selection = items.find((item) => item.value === details.itemValue);

    if (selection === undefined) {
      return;
    }

    setAddressSearchQuery(selection.label);

    setSelectedAddress({
      id: selection.value,
      label: selection.label,
      coordinates: selection.coordinates,
    });
  };

  const combobox = useCombobox<UseComboboxReturn>({
    collection: collection as ListCollection,
    onInputValueChange: handleInputChange,
    onSelect: handleSelection,
    inputBehavior: "autohighlight",
    inputValue: addressSearchQuery !== null ? addressSearchQuery : undefined,
  });

  return {
    combobox,
    addressSearchQuery,
    addressSearchResults: collection,
    addressSearchError,
    isLoading,
    selectedAddress,
    clearAddressSearch,
  };
};
