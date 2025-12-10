import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpinWheel from './SpinWheel';

describe('<SpinWheel />', () => {
  test('it should mount', () => {
    render(<SpinWheel />);

    const spinWheel = screen.getByTestId('SpinWheel');

    expect(spinWheel).toBeInTheDocument();
  });
});