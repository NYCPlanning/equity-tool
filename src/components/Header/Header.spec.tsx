import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
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

const mockHeaderProps = {
  combobox: {} as UseComboboxReturn,
  addressSearchQuery: null,
  addressSearchResults: { items: [] } as unknown as ListCollection,
  addressSearchError: null,
  isLoading: false,
};

describe("Header", () => {
  it("has the correct site header text", () => {
    render(<Header {...mockHeaderProps} />);
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Equitable Development Data Explorer"
    );
  });

  it("sets aria-current for the selected page", () => {
    render(<Header {...mockHeaderProps} />);
    expect(screen.getByText("About").getAttribute("aria-current")).toEqual(
      "page"
    );
  });
});
