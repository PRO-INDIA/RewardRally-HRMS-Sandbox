import React from 'react';
import { render, screen } from '@testing-library/react';
import QuizAdmin from './QuizAdmin';

test('renders QuizAdmin', () => {
  render(<QuizAdmin />);
  const linkElement = screen.getByText(/Quiz Challenge Admin Panel/i);
  expect(linkElement).toBeInTheDocument();
});
