import React, { useContext, useEffect } from 'react';
import { AppContext } from './App';

function Letter({ letterPos, attemptVal }) {
  const {
    board,
    correctWord,
    currAttempt,
    setDisabledLetters,
    setRightLetters,
    setCloseLetters,
  } = useContext(AppContext);
  const letter = board.board[attemptVal][letterPos];

  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== '' && correctWord.includes(letter);

  const letterState =
    attemptVal < currAttempt.attempt &&
    (correct ? 'correct' : almost ? 'almost' : 'error');

  useEffect(() => {
    if (letterState === 'error') {
      setDisabledLetters((prev) => [...prev, letter]);
    }
    if (letterState === 'correct') {
      setRightLetters((prev) => [...prev, letter]);
    }
    if (letterState === 'almost') {
      setCloseLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  const isTypingEffectOn = () => {
    if (
      board.isEnterKey &&
      attemptVal === currAttempt.attempt &&
      letterPos === currAttempt.letterPos - 1
    ) {
      return 'typing-animation border-black';
    }
    return '';
  };

  return (
    <div className={`letter ${isTypingEffectOn()}`} id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
