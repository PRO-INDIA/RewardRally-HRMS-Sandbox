import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Compentency from './Compentency';

describe('<Compentency />', () => {
  test('it should mount', () => {
    render(<Compentency />);
    
    const compentency = screen.getByTestId('Compentency');

    expect(compentency).toBeInTheDocument();
  });
});