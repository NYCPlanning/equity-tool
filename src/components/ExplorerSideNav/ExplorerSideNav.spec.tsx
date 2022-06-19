import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExplorerSideNav } from "./ExplorerSideNav";
import { Category } from "@constants/Category";
import { Geography } from "@constants/geography";
import { Subgroup } from "@constants/Subgroup";
import { NYC } from "@constants/geoid";
import { useDataExplorerState } from "@hooks/useDataExplorerState";
import { getBoroughName } from "@helpers/getBoroughName";

jest.mock("@hooks/useDataExplorerState");
const mockedUseDataExplorerState = useDataExplorerState as jest.MockedFunction<
  typeof useDataExplorerState
>;

jest.mock("@helpers/getBoroughName");
const mockedGetBoroughName = getBoroughName as jest.MockedFunction<
  typeof getBoroughName
>;

describe("ExplorerSideNav", () => {
  describe("display selected geography information", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should display the correct information for citywide", () => {
      mockedUseDataExplorerState.mockReturnValueOnce({
        geography: Geography.CITYWIDE,
        geoid: NYC,
        category: Category.DEMO,
        subgroup: Subgroup.TOT,
      });
      render(<ExplorerSideNav />);
      const textNodes = screen.getAllByText("Citywide");
      expect(textNodes).toHaveLength(2);
      expect(textNodes[0]).not.toBeVisible();
    });

    it("should display the correct information for borough", () => {
      mockedUseDataExplorerState.mockReturnValueOnce({
        geography: Geography.BOROUGH,
        geoid: "3",
        category: Category.DEMO,
        subgroup: Subgroup.TOT,
      });
      mockedGetBoroughName.mockReturnValue("Brooklyn");
      render(<ExplorerSideNav />);
      const textNodes = screen.getAllByText("Brooklyn");
      expect(mockedGetBoroughName).toBeCalledWith("3");
      expect(textNodes).toHaveLength(2);
      expect(textNodes[0]).not.toBeVisible();
    });

    it("should display the correct information for pumas", () => {
      mockedUseDataExplorerState.mockReturnValueOnce({
        geography: Geography.DISTRICT,
        geoid: "4006",
        category: Category.DEMO,
        subgroup: Subgroup.TOT,
      });
      render(<ExplorerSideNav />);
      const textNodes = screen.getAllByText("PUMA 4006");
      expect(textNodes).toHaveLength(2);
      expect(textNodes[0]).not.toBeVisible();
    });
  });

  describe("toggle sidebar expanded state", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("shows the geography label under pin icon only after being collapsed", async () => {
      mockedUseDataExplorerState.mockReturnValue({
        geography: Geography.DISTRICT,
        geoid: "4006",
        category: Category.DEMO,
        subgroup: Subgroup.TOT,
      });
      const user = userEvent.setup();
      render(<ExplorerSideNav />);
      expect(screen.getAllByText("PUMA 4006")[0]).not.toBeVisible();
      await user.click(screen.getByLabelText("Show Categories"));
      expect(screen.getAllByText("PUMA 4006")[0]).toBeVisible();
    });
  });
});
