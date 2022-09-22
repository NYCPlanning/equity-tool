import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CategoryMenuLink } from "./CategoryMenuLink";

describe("CategoryMenuLink", () => {
  it("should not show tooltips on hover by default", async () => {
    const user = userEvent.setup();
    render(
      <CategoryMenuLink icon={<span>icon</span>} href={"/foo/bar"}>
        demo conditions
      </CategoryMenuLink>
    );
    const outerButton = screen.getByText("demo conditions");
    const tooltipTrigger = within(outerButton).getByRole("button");
    await user.hover(tooltipTrigger);
    expect(screen.getAllByText("demo conditions")).toHaveLength(1);
  });

  it("should show tooltips on hover when isTooltipDisabled is false", async () => {
    const user = userEvent.setup();
    render(
      <CategoryMenuLink
        icon={<span>icon</span>}
        href={"/foo/bar"}
        isTooltipDisabled={false}
      >
        demo conditions
      </CategoryMenuLink>
    );

    const outerButton = screen.getByText("demo conditions");
    const tooltipTrigger = within(outerButton).getByRole("button");
    await user.hover(tooltipTrigger);
    expect(screen.getAllByText("demo conditions")).toHaveLength(2);
  });
});
