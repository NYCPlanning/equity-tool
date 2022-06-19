import { Category } from "@constants/Category";
import { Geography } from "@constants/geography";
import { Subgroup } from "@constants/Subgroup";
import { NYC } from "@constants/geoid";
import { parseDataExplorerSelection } from "./parseDataExplorerSelection";

describe("parseDataExplorerSelection", () => {
  it("returns default values when query properties are undefined", () => {
    const result = parseDataExplorerSelection({});
    expect(result.geography).toEqual(Geography.CITYWIDE);
    expect(result.geoid).toEqual(NYC);
    expect(result.category).toEqual(Category.DEMO);
    expect(result.subgroup).toEqual(Subgroup.TOT);
  });

  it("returns default values when query properties are arrays", () => {
    const result = parseDataExplorerSelection({
      geography: [Geography.BOROUGH],
      geoid: ["BK0101"],
      category: [Category.ECON],
      subgroup: [Subgroup.HSP],
    });
    expect(result.geography).toEqual(Geography.CITYWIDE);
    expect(result.geoid).toEqual(NYC);
    expect(result.category).toEqual(Category.DEMO);
    expect(result.subgroup).toEqual(Subgroup.TOT);
  });

  it("returns default values when query properties are arbitrary strings", () => {
    const result = parseDataExplorerSelection({
      geography: "foo",
      geoid: "bar",
      category: "biz",
      subgroup: "baz",
    });
    expect(result.geography).toEqual(Geography.CITYWIDE);
    expect(result.category).toEqual(Category.DEMO);
    expect(result.subgroup).toEqual(Subgroup.TOT);
  });

  it("returns correct values when given valid query object", () => {
    const result = parseDataExplorerSelection({
      geography: Geography.DISTRICT,
      geoid: "BK0101",
      category: Category.ECON,
      subgroup: Subgroup.ANH,
    });
    expect(result.geography).toEqual(Geography.DISTRICT);
    expect(result.geoid).toEqual("BK0101");
    expect(result.category).toEqual(Category.ECON);
    expect(result.subgroup).toEqual(Subgroup.ANH);
  });
});
