import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { GridLayout } from '../GridLayout';

test('renders add button', () => {
  render(<BrowserRouter><GridLayout /></BrowserRouter>);
  const addButton = screen.getByTestId('add-item');
  expect(addButton).toBeInTheDocument();
});

test('renders error if error prop is passed', () => {
  render(<BrowserRouter><GridLayout error={new Error()} /></BrowserRouter>);
  const errorComp = screen.getByText(/Failed to load/);
  expect(errorComp).toBeInTheDocument();
});

test('renders loader if loading prop is passed', () => {
  render(<BrowserRouter><GridLayout loading /></BrowserRouter>);
  const loader = screen.getByTestId('loader');
  expect(loader).toBeInTheDocument();
});

test('renders items', () => {
  render(
   <BrowserRouter>
      <GridLayout items={[
        { id: 1, name: 'item 1', to: 'planets/1' },
        { id: 2, name: 'item 2', to: 'planets/2' }
      ]} />
    </BrowserRouter>
  );
  const item = screen.getByTestId('1');
  expect(item).toBeInTheDocument();
});

test('renders items as links', () => {
  render(
   <BrowserRouter>
      <GridLayout basePath="planets" items={[
        { id: 1, name: 'item 1' },
        { id: 2, name: 'item 2' }
      ]} />
    </BrowserRouter>
  );
  const item = screen.getByTestId('1');
  expect(item.href).toContain('planets/1');
});
