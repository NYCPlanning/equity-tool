import { render, renderHook, screen } from "@testing-library/react";
import { AddressSearch } from "./AddressSearch";
import {
  createListCollection,
  StreetscapeProvider,
  useCombobox,
} from "@nycplanning/streetscape";
import type {
  ComboboxCollectionItemProps,
  ListCollection,
  UseComboboxReturn,
} from "@nycplanning/streetscape";

const items: ComboboxCollectionItemProps[] = [];

const emptyResults = createListCollection({
  items,
});

function renderAddressSearch({
  addressSearchQuery = null,
  addressSearchResults = emptyResults,
  addressSearchError = null,
  isLoading = false,
}: {
  addressSearchQuery?: string | null;
  addressSearchResults?: ListCollection;
  addressSearchError?: Error | null;
  isLoading?: boolean;
} = {}) {
  const { result } = renderHook(() =>
    useCombobox<UseComboboxReturn>({
      collection: addressSearchResults,
    })
  );

  return render(
    <StreetscapeProvider>
      <AddressSearch
        combobox={result.current}
        addressSearchQuery={addressSearchQuery}
        addressSearchResults={addressSearchResults}
        addressSearchError={addressSearchError}
        isLoading={isLoading}
      />
    </StreetscapeProvider>
  );
}

describe("AddressSearch", () => {
  it("renders the address search input", () => {
    renderAddressSearch();

    expect(
      screen.getByPlaceholderText("Search by Address...")
    ).toBeInTheDocument();
  });

  it("renders matching address results", () => {
    const results = createListCollection({
      items: [
        {
          label: "120 BROADWAY, New York, NY, USA",
          value: "4179",
          coordinates: [-74.010542, 40.708233],
        },
      ],
    });

    renderAddressSearch({
      addressSearchQuery: "120 br",
      addressSearchResults: results,
    });

    expect(
      screen.getByText("120 BROADWAY, New York, NY, USA")
    ).toBeInTheDocument();
  });

  it("renders loading state", () => {
    renderAddressSearch({
      addressSearchQuery: "120 br",
      isLoading: true,
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders no results state", () => {
    renderAddressSearch({
      addressSearchQuery: "120 xyz",
    });

    expect(screen.getByText("Sorry, no results found.")).toBeInTheDocument();

    expect(
      screen.getByText("Check your search for typos.")
    ).toBeInTheDocument();
  });

  it("renders error state", () => {
    renderAddressSearch({
      addressSearchQuery: "120 br",
      addressSearchError: new Error("Geosearch failed"),
    });

    expect(
      screen.getByText("Sorry, something went wrong.")
    ).toBeInTheDocument();

    expect(screen.getByText("E-mail us.")).toBeInTheDocument();
  });
});
