import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Leave from './Leave';

describe('<Leave />', () => {
  test('it should mount', () => {
    render(<Leave />);
    
    const leave = screen.getByTestId('Leave');

    expect(leave).toBeInTheDocument();
  });
});