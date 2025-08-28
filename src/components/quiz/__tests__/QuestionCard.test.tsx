import { render, screen, fireEvent } from '@testing-library/react';
import QuestionCard from '../QuestionCard';

describe('QuestionCard', () => {
  const question = {
    text: 'Ktorá farba je nebe?',
    options: ['Modrá', 'Červená', 'Zelená', 'Žltá'],
  } as const;

  it('allows a player to select an answer', () => {
    const onAnswer = jest.fn();
    render(<QuestionCard question={question} onAnswer={onAnswer} />);
    fireEvent.click(screen.getByText('A. Modrá'));
    expect(onAnswer).toHaveBeenCalledWith('A');
  });
});
