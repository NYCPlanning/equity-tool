import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExplorerSideNav } from "./ExplorerSideNav";
import { Category } from "@constants/Category";
import { Geography } from "@constants/geography";
import { Subgroup } from "@constants/Subgroup";
import { NYC } from "@constants/geoid";
import { useGeography } from "@hooks/useGeography";
import { useSubgroup } from "@hooks/useSubgroup";
import { useCategory } from "@hooks/useCategory";
import { useGeoid } from "@hooks/useGeoid";
import { getBoroughName } from "@helpers/getBoroughName";

jest.mock("@hooks/useGeography");
const mockedUseGeography = useGeography as jest.MockedFunction<
  typeof useGeography
>;

jest.mock("@hooks/useSubgroup");
const mockedUseSubgroup = useSubgroup as jest.MockedFunction<
  typeof useSubgroup
>;

jest.mock("@hooks/useCategory");
const mockedUseCategory = useCategory as jest.MockedFunction<
  typeof useCategory
>;

jest.mock("@helpers/getBoroughName");
const mockedGetBoroughName = getBoroughName as jest.MockedFunction<
  typeof getBoroughName
>;

jest.mock("@hooks/useGeoid");
const mockedUseGeoid = useGeoid as jest.MockedFunction<typeof useGeoid>;

describe("ExplorerSideNav", () => {
  describe("display selected geography information", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should display the correct information for citywide", () => {
      mockedUseGeography.mockReturnValueOnce(Geography.CITYWIDE);
      mockedUseSubgroup.mockReturnValueOnce(Subgroup.TOT);
      mockedUseCategory.mockReturnValueOnce(Category.DEMO);
      render(<ExplorerSideNav geoid={NYC} />);
      const textNodes = screen.getAllByText("Citywide");
      expect(textNodes).toHaveLength(2);
      expect(textNodes[0]).not.toBeVisible();
    });

    it("should display the correct information for borough", () => {
      mockedUseGeography.mockReturnValueOnce(Geography.BOROUGH);
      mockedUseSubgroup.mockReturnValueOnce(Subgroup.TOT);
      mockedUseCategory.mockReturnValueOnce(Category.DEMO);
      mockedUseGeoid.mockReturnValueOnce("3");
      mockedGetBoroughName.mockReturnValue("Brooklyn");
      render(<ExplorerSideNav geoid={"3"} />);
      const textNodes = screen.getAllByText("Brooklyn");
      expect(mockedGetBoroughName).toBeCalledWith("3");
      expect(textNodes).toHaveLength(2);
      expect(textNodes[0]).not.toBeVisible();
    });

    it("should display the correct information for pumas", () => {
      mockedUseGeography.mockReturnValueOnce(Geography.DISTRICT);
      mockedUseSubgroup.mockReturnValueOnce(Subgroup.TOT);
      mockedUseCategory.mockReturnValueOnce(Category.DEMO);
      render(<ExplorerSideNav geoid={"4006"} />);
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
      mockedUseGeography.mockReturnValueOnce(Geography.BOROUGH);
      mockedUseSubgroup.mockReturnValueOnce(Subgroup.TOT);
      mockedUseCategory.mockReturnValueOnce(Category.DEMO);
      mockedGetBoroughName.mockReturnValue("Brooklyn");
      const user = userEvent.setup();
      render(<ExplorerSideNav geoid={"3"} />);
      const labels = screen.getAllByText("Brooklyn");
      expect(labels[0]).not.toBeVisible();
      await user.click(screen.getByLabelText("Show Categories"));
      expect(labels[0]).toBeVisible();
    });
  });
});
