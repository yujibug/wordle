import React, { useState, createContext } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import './App.css';
import { boardDefault } from './words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });

  const onEnter = () => {
    if (currAttempt.letterPos !== 6) return;
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
  };

  const onDelete = () => {
    const copiedBoard = [...board];
    copiedBoard[currAttempt.attempt][currAttempt.letterPos - 1] = '';
    setBoard(copiedBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 5) return;
    const copiedBoard = [...board];
    copiedBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(copiedBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  return (
    <div className='App'>
      <div className='main-container'>
        <nav>
          <h1>ㅇㅜㅓㄷㅡㄹ</h1>
        </nav>
        <AppContext.Provider
          value={{
            board,
            setBoard,
            currAttempt,
            setCurrAttempt,
            onEnter,
            onDelete,
            onSelectLetter,
          }}
        >
          <Board></Board>
          <Keyboard></Keyboard>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
