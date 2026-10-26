import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { TimeLocationToggle } from "./TimeLocationToggle";

jest.mock("@components/ToggleButtonGroup", () => ({
  ToggleButtonGroup: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("TimeLocationToggle", () => {
  it("renders both toggle options", () => {
    render(<TimeLocationToggle selectedView="time" onViewChange={jest.fn()} />);

    expect(
      screen.getByRole("button", { name: "Over Time" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Location" })
    ).toBeInTheDocument();
  });

  it("sets Over Time as active when the selected view is time", () => {
    render(<TimeLocationToggle selectedView="time" onViewChange={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Over Time" })).toHaveAttribute(
      "data-active"
    );

    expect(
      screen.getByRole("button", { name: "Location" })
    ).not.toHaveAttribute("data-active");
  });

  it("sets Location as active when the selected view is location", () => {
    render(
      <TimeLocationToggle selectedView="location" onViewChange={jest.fn()} />
    );

    expect(screen.getByRole("button", { name: "Location" })).toHaveAttribute(
      "data-active"
    );

    expect(
      screen.getByRole("button", { name: "Over Time" })
    ).not.toHaveAttribute("data-active");
  });

  it("changes to the location view when Location is clicked", () => {
    const onViewChange = jest.fn();

    render(
      <TimeLocationToggle selectedView="time" onViewChange={onViewChange} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Location" }));

    expect(onViewChange).toHaveBeenCalledTimes(1);
    expect(onViewChange).toHaveBeenCalledWith("location");
  });

  it("changes to the time view when Over Time is clicked", () => {
    const onViewChange = jest.fn();

    render(
      <TimeLocationToggle selectedView="location" onViewChange={onViewChange} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Over Time" }));

    expect(onViewChange).toHaveBeenCalledTimes(1);
    expect(onViewChange).toHaveBeenCalledWith("time");
  });
});
