import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FullPageLeaderboard from './FullPageLeaderboard';

describe('<FullPageLeaderboard />', () => {
  test('it should mount', () => {
    render(<FullPageLeaderboard />);

    const fullPageLeaderboard = screen.getByTestId('FullPageLeaderboard');

    expect(fullPageLeaderboard).toBeInTheDocument();
  });
});