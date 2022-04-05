import React, { useContext } from 'react';
import { AppContext } from './App';

function GameOver() {
  const { gameOver, setGameOver, correctWord, currAttempt } =
    useContext(AppContext);

  return (
    <div className='gameOver'>
      <h3>{gameOver.guessedWord ? '이겼다!' : '졌다..'}</h3>
      <h1>정답: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>당신은 {currAttempt.attempt}번의 시도만에 정답을 맞췄습니다</h3>
      )}
    </div>
  );
}

export default GameOver;
