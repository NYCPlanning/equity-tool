import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

import { Header } from "./Header";
import { useAddressSearchContext } from "@contexts/AddressSearchContext";

import type {
  ListCollection,
  UseComboboxReturn,
} from "@nycplanning/streetscape";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
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

const mockedUseRouter = useRouter as jest.Mock;

const mockedUseAddressSearchContext =
  useAddressSearchContext as jest.MockedFunction<
    typeof useAddressSearchContext
  >;

describe("Header", () => {
  beforeEach(() => {
    mockedUseRouter.mockReturnValue({
      pathname: "/about",
      asPath: "/about",
      query: {},
    });

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

  it("shows address search on map pages", () => {
    mockedUseRouter.mockReturnValue({
      pathname: "/map/[view]/[geography]",
      asPath: "/map/data/district",
      query: {
        view: "data",
        geography: "district",
      },
    });

    render(<Header />);

    expect(screen.getByTestId("address-search")).toBeInTheDocument();
  });

  it.each([
    "/about",
    "/methods",
    "/contact",
    "/data/[geography]/[geoid]/[category]/[subgroup]",
  ])("hides address search on non-map page %s", (pathname) => {
    mockedUseRouter.mockReturnValue({
      pathname,
      asPath: pathname,
      query: {},
    });

    render(<Header />);

    expect(screen.queryByTestId("address-search")).not.toBeInTheDocument();
  });
});
