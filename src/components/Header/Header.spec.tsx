import { render, screen } from "@testing-library/react";

import { Header } from "./Header";
import { useAddressSearchContext } from "@contexts/AddressSearchContext";

import type {
  ListCollection,
  UseComboboxReturn,
} from "@nycplanning/streetscape";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({ pathname: "/about" })),
}));

jest.mock("@react-hook/window-size", () => ({
  __esModule: true,
  useWindowWidth: jest.fn(() => 960),
}));

jest.mock("@components/Header/AddressSearch", () => ({
  __esModule: true,
  AddressSearch: () => <div data-testid="address-search" />,
}));

jest.mock("@contexts/AddressSearchContext");

const mockedUseAddressSearchContext =
  useAddressSearchContext as jest.MockedFunction<
    typeof useAddressSearchContext
  >;

describe("Header", () => {
  beforeEach(() => {
    mockedUseAddressSearchContext.mockReturnValue({
      combobox: {} as UseComboboxReturn,
      addressSearchQuery: null,
      addressSearchResults: { items: [] } as unknown as ListCollection,
      addressSearchError: null,
      isLoading: false,
      selectedAddress: null,
      clearAddressSearch: jest.fn(),
    });
  });

  it("has the correct site header text", () => {
    render(<Header />);

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Equitable Development Data Explorer"
    );
  });

  it("sets aria-current for the selected page", () => {
    render(<Header />);

    expect(screen.getByText("About").getAttribute("aria-current")).toEqual(
      "page"
    );
  });
});
