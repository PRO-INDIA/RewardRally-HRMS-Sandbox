import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';

import Header from './header';
import React from 'react';

describe('<Header />', () => {
  test('it should mount', () => {
    render(<Header />);
    
    const header = screen.getByTestId('Header');

    expect(header).toBeInTheDocument();
  });
});