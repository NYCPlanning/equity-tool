import { unmountComponentAtNode } from "react-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { GeographySelect } from "../../../src/components/Map/DataTool/GeographySelect";
import { act } from "react-dom/test-utils";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("GeographySelect has at least three options", () => {
  act(() => {
    const {} = render( // eslint-disable-line
      <GeographySelect />,
      container
    );
  });

  expect(screen.queryAllByRole("button")).toHaveLength(3);
});

it("GeographySelect correctly indicates active Community District geography", () => {
  act(() => {
    const {} = render( // eslint-disable-line
      <GeographySelect geography="district" />,
      container
    );
  });

  expect(screen.getByText("Community District*")).toHaveAttribute(
    "data-active"
  );
  expect(screen.getByText("Borough")).not.toHaveAttribute("data-active");
  expect(screen.getByText("Citywide")).not.toHaveAttribute("data-active");
});

it("GeographySelect correctly indicates active Borough geography", () => {
  act(() => {
    const {} = render( // eslint-disable-line
      <GeographySelect geography="borough" />,
      container
    );
  });

  expect(screen.getByText("Community District*")).not.toHaveAttribute(
    "data-active"
  );
  expect(screen.getByText("Borough")).toHaveAttribute("data-active");
  expect(screen.getByText("Citywide")).not.toHaveAttribute("data-active");
});

it("GeographySelect correctly indicates active Citywide geography", () => {
  act(() => {
    const {} = render( // eslint-disable-line
      <GeographySelect geography="citywide" />,
      container
    );
  });

  expect(screen.getByText("Community District*")).not.toHaveAttribute(
    "data-active"
  );
  expect(screen.getByText("Borough")).not.toHaveAttribute("data-active");
  expect(screen.getByText("Citywide")).toHaveAttribute("data-active");
});
