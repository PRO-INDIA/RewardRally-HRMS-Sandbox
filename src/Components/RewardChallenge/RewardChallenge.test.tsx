import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RewardChallenge from './RewardChallenge';

describe('<RewardChallenge />', () => {
  test('it should mount', () => {
    render(<RewardChallenge />);

    const rewardChallenge = screen.getByTestId('RewardChallenge');

    expect(rewardChallenge).toBeInTheDocument();
  });
});