import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders OctoFit Tracker heading', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const elements = screen.getAllByText(/OctoFit Tracker/i);
  expect(elements.length).toBeGreaterThan(0);
});
