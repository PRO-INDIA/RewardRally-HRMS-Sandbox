import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersonalInfo from './PersonalInfo';

describe('<PersonalInfo />', () => {
  test('it should mount', () => {
    render(<PersonalInfo />);
    
    const personalInfo = screen.getByTestId('PersonalInfo');

    expect(personalInfo).toBeInTheDocument();
  });
});