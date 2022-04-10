import React, { useContext } from 'react';
import { AppContext } from './App';

function GameOver() {
  const { gameOver, setGameOver, correctWord, currAttempt } =
    useContext(AppContext);

  return (
    <div className='gameover-modal'>
      <div className='gameover-modal-body'>
        <h1>{gameOver.guessedWord ? '잘했어요!' : '아쉬워요'}</h1>
        <h1>정답 : '{correctWord}'</h1>
        <div className='btn-wrapper'>
          <button className='btn'>새 게임 시작</button>
        </div>
        <div className='btn-wrapper'>
          <button className='btn'>결과 복사</button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
