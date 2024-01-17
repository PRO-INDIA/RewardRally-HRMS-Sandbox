import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TimeSheet from './TimeSheet';

describe('<TimeSheet />', () => {
  test('it should mount', () => {
    render(<TimeSheet />);
    
    const timeSheet = screen.getByTestId('TimeSheet');

    expect(timeSheet).toBeInTheDocument();
  });
});