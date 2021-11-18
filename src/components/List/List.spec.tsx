import { render, screen } from "@testing-library/react";
import { List } from "./List";

describe("List", () => {
  const items = ["one", "two", "three"];

  it("renders all of its items", () => {
    render(<List items={items} />);
    expect(screen.getAllByTestId("list-item").length).toEqual(3);
  });
});
