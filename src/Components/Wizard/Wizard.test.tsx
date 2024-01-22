import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Wizard from './Wizard';

describe('<Wizard />', () => {
  test('it should mount', () => {
    render(<Wizard />);
    
    const wizard = screen.getByTestId('Wizard');

    expect(wizard).toBeInTheDocument();
  });
});