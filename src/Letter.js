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
  const letter = board[attemptVal][letterPos];

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

  return (
    <div className='letter' id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
