import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WorkHistroy from './WorkHistroy';

describe('<WorkHistroy />', () => {
  test('it should mount', () => {
    render(<WorkHistroy />);
    
    const workHistroy = screen.getByTestId('WorkHistroy');

    expect(workHistroy).toBeInTheDocument();
  });
});