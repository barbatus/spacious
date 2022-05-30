import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { useAddPlanet } from '../graphql/hooks';

import { CreatePlanet } from '../CreatePlanet';

jest.mock('../graphql/hooks');

const addPlanet = jest.fn();

beforeEach(() => {
  useAddPlanet.mockReturnValue({
    addPlanet,
  });
});

test('shows create planet form in modal', () => {
  render((
    <BrowserRouter>
      <CreatePlanet />
    </BrowserRouter>
  ));
  const modal = screen.getByRole('modal');
  expect(modal).toBeInTheDocument();
});

test('renders validation error if name field is not set', async () => {
  render((
    <BrowserRouter>
      <CreatePlanet />
    </BrowserRouter>
  ));

  await act(() => {
    fireEvent.click(screen.getByRole('submit'));
  });

  expect(screen.getByText(/Name is required/)).toBeInTheDocument();
  expect(addPlanet).not.toHaveBeenCalled();
});

test('sumbit form when all fields are set', async () => {
  render((
    <BrowserRouter>
      <CreatePlanet />
    </BrowserRouter>
  ));

  const planetData = {
    name: 'Planet name',
    code: 'HH-LLL-45',
    pictureUrl: 'https://example.com/planet.jpg',
    description: 'This is a planet description',
  };

  await act(() => {
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: planetData.name },
    });
    fireEvent.change(screen.getByLabelText(/code/i), {
      target: { value: planetData.code },
    });
    fireEvent.change(screen.getByLabelText(/pictureUrl/i), {
      target: { value: planetData.pictureUrl },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: planetData.description },
    });
    fireEvent.click(screen.getByRole('submit'));
  });

  expect(addPlanet).toHaveBeenCalledWith(planetData);
});
