import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizChallenge from './QuizChallenge';

describe('<QuizChallenge />', () => {
  test('it should mount', () => {
    render(<QuizChallenge />);

    const quizChallenge = screen.getByTestId('QuizChallenge');

    expect(quizChallenge).toBeInTheDocument();
  });
});