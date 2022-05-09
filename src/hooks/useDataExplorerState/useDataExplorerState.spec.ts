import { useRouter } from "next/router";
import { useDataExplorerState } from "./useDataExplorerState";
import { parseDataExplorerSelection } from "@helpers/parseDataExplorerSelection";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    query: {
      geography: "foo",
      geoid: "bar",
      category: "biz",
      subgroup: "baz",
    },
  })),
}));

jest.mock("@helpers/parseDataExplorerSelection", () => ({
  __esModule: true,
  parseDataExplorerSelection: jest.fn(() => {
    return;
  }),
}));

describe("useDataExplorerState", () => {
  it("calls useRouter", () => {
    useDataExplorerState();
    expect(useRouter).toHaveBeenCalled();
  });

  it("calls parseDataExplorerSelection with the values in the router query object", () => {
    useDataExplorerState();
    expect(parseDataExplorerSelection).toHaveBeenCalledWith({
      geography: "foo",
      geoid: "bar",
      category: "biz",
      subgroup: "baz",
    });
  });
});
