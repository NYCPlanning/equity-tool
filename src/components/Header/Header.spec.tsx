import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    pathname: "/about",
  })),
}));

describe("Header", () => {
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
