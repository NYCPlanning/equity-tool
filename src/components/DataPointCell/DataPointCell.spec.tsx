import { ReactElement } from "react";
import { render, screen, RenderOptions } from "@testing-library/react";
import { Table, Tr, Tbody } from "@chakra-ui/react";
import { DataPointCell } from "./DataPointCell";
import { DataPoint } from "@schemas/dataPoint";

interface TableWrapperProps {
  children: ReactElement;
}

const TableWrapper = ({ children }: TableWrapperProps) => (
  <Table>
    <Tbody>
      <Tr>{children}</Tr>
    </Tbody>
  </Table>
);

// Chakra Td elements must be rendered inside a Table by design. This simple wrapper around render()
// keeps our tests DRY - see https://testing-library.com/docs/react-testing-library/setup/#custom-render
// Might want to extract this to a common test utils folder so it can be used for other table components
const renderInTable = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TableWrapper, ...options });

describe("DataPointCell", () => {
  it("shows a hyphen when value is null and variance is NONE", () => {
    const dataPoint: DataPoint = {
      value: null,
      measure: "COUNT",
      variance: "NONE",
    };
    renderInTable(<DataPointCell dataPoint={dataPoint} isReliable={true} />);
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("does not show hyphen when value is null and variance is not NONE", () => {
    const dataPoint: DataPoint = {
      value: null,
      measure: "COUNT",
      variance: "MOE",
    };
    renderInTable(<DataPointCell dataPoint={dataPoint} isReliable={true} />);
    expect(screen.queryByText("-")).toBeNull();
  });

  it("renders the value with no decimal point if variance is not CV", () => {
    const dataPoint: DataPoint = {
      value: 1005.2,
      measure: "COUNT",
      variance: "MOE",
    };
    renderInTable(<DataPointCell dataPoint={dataPoint} isReliable={true} />);
    expect(screen.getByText("1,005")).toBeInTheDocument();
  });

  it("renders the value with one digit after the decimal point if variance is CV", () => {
    const dataPoint: DataPoint = {
      value: 102.9,
      measure: "COUNT",
      variance: "CV",
    };
    renderInTable(<DataPointCell dataPoint={dataPoint} isReliable={true} />);
    expect(screen.queryByText("102.9")).toBeInTheDocument();
  });

  it("renders the value as gray if isReliable is false", () => {
    const dataPoint: DataPoint = {
      value: 105,
      measure: "COUNT",
      variance: "NONE",
    };
    renderInTable(<DataPointCell dataPoint={dataPoint} isReliable={false} />);
    expect(screen.getByText("105")).toHaveStyle(
      "color: var(--chakra-colors-gray-400)"
    );
  });
});
