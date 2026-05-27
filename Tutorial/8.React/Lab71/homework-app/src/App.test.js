import { render, screen } from '@testing-library/react';
import App from './App';

test('renders student list management heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Student List Management/i);
  expect(headingElement).toBeInTheDocument();
});
