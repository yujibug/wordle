import React, { useContext } from 'react';
import { AppContext } from './App';

function Letter({ letterPos, attemptVal }) {
  const { board, splittedCorrectWord, currAttempt } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct = splittedCorrectWord[letterPos] === letter;
  const almost =
    !correct && letter !== '' && splittedCorrectWord.includes(letter);

  const letterState =
    attemptVal < currAttempt.attempt &&
    (correct ? 'correct' : almost ? 'almost' : 'error');

  return (
    <div className='letter' id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
