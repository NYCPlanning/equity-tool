import { unmountComponentAtNode } from "react-dom";
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import { GeographySelect } from '../../src/components/Map/GeographySelect';
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

it('GeographySelect has at least three options', () => {
  act(() => {
    const {} = render(
      <GeographySelect />,
      container
    );
  })

  expect(screen.queryAllByRole('button')).toHaveLength(3);
});

it('GeographySelect correctly indicates active geography', () => {
  act(() => {
    const {} = render(
      <GeographySelect
        geography='census'
      />,
      container
    );
  })

  expect(screen.getByText('Census Area')).toHaveAttribute('data-active');
  expect(screen.getByText('Borough')).not.totoHaveAttribute('data-active');
  expect(screen.getByText('Citywide')).not.totoHaveAttribute('data-active');


  act(() => {
    const {} = render(
      <GeographySelect
        geography='borough'
      />,
      container
    );
  })

  expect(screen.getByText('Census Area')).not.toHaveAttribute('data-active');
  expect(screen.getByText('Borough')).totoHaveAttribute('data-active');
  expect(screen.getByText('Citywide')).not.totoHaveAttribute('data-active');

  act(() => {
    const {} = render(
      <GeographySelect
        geography='citywide'
      />,
      container
    );
  })

  expect(screen.getByText('Census Area')).not.toHaveAttribute('data-active');
  expect(screen.getByText('Borough')).not.totoHaveAttribute('data-active');
  expect(screen.getByText('Citywide')).totoHaveAttribute('data-active');
});
