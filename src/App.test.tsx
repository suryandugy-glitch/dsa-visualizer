// @vitest-environment jsdom
import { expect, test, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import App from './App';

vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);

test('renders header with title', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { level: 1 });
  expect(headingElement.textContent).toMatch(/🎯 DSA Visualizer/i);
});