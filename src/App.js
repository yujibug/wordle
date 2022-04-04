import React, { useState, createContext, useEffect } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import './App.css';
import { boardDefault, wordSet } from './words';
import GameOver from './GameOver';

export const AppContext = createContext();

const Hangul = require('hangul-js');

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });

  const splittedCorrectWord = 'ㅈㅓㅇㄷㅏㅂ';
  const correctWord = '정답';
  const [wordDictionary, setWordDictionary] = useState(wordSet);
  const [notWord, setNotWord] = useState(false);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [rightLetters, setRightLetters] = useState([]);
  const [closeLetters, setCloseLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const onEnter = () => {
    if (currAttempt.letterPos !== 6) return;

    let currWord = [];
    for (let i = 0; i < 6; i++) {
      currWord.push(board[currAttempt.attempt][i]);
    }

    currWord = Hangul.assemble(currWord);

    if (!wordDictionary.has(currWord)) {
      alert('단어목록에 없습니다');
      return;
    }
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  const onDelete = () => {
    const copiedBoard = [...board];
    if (currAttempt.letterPos === 0) {
      return;
    }
    setNotWord(false);
    copiedBoard[currAttempt.attempt][currAttempt.letterPos - 1] = '';
    setBoard(copiedBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 5) return;
    const copiedBoard = [...board];
    copiedBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(copiedBoard);
    if (currAttempt.letterPos === 5) {
      let currWord = Hangul.assemble(board[currAttempt.attempt]);
      if (!wordDictionary.has(currWord)) {
        setNotWord(true);
      }
    }
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
            splittedCorrectWord,
            notWord,
            disabledLetters,
            setDisabledLetters,
            rightLetters,
            setRightLetters,
            closeLetters,
            setCloseLetters,
            setGameOver,
            gameOver,
            correctWord,
          }}
        >
          <Board></Board>
          {gameOver.gameOver ? <GameOver></GameOver> : <Keyboard></Keyboard>}
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
