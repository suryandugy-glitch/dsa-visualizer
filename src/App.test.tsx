import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with title', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { level: 1 });
  expect(headingElement).toHaveTextContent(/🎯 DSA Visualizer/i);
});