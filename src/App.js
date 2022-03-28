import React, { useState, createContext, useEffect } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import './App.css';
import { boardDefault } from './words';
import * as KoreanNounList from 'pd-korean-noun-list-for-wordles';

export const AppContext = createContext();

const Hangul = require('hangul-js');

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });

  const splittedCorrectWord = 'ㅈㅓㅇㄷㅏㅂ';
  const correctWord = '정답';
  const [wordSet, setWordSet] = useState(new Set(KoreanNounList.ALL_NOUNS));

  useEffect(() => {
    console.log(wordSet);
  }, []);

  const onEnter = () => {
    if (currAttempt.letterPos !== 6) return;

    let currWord = [];
    for (let i = 0; i < 6; i++) {
      currWord.push(board[currAttempt.attempt][i]);
    }

    currWord = Hangul.assemble(currWord);

    if (!wordSet.has(currWord)) {
      alert('단어목록에 없습니다');
      return;
    }
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });

    if (currWord === correctWord) {
      alert('이겼다!');
    }
  };

  const onDelete = () => {
    const copiedBoard = [...board];
    if (currAttempt.letterPos === 0) {
      return;
    }
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
      <button
        onClick={() => {
          const array = ['a', 'b', 'c', 'c', 'd'];
          const newSet = new Set([...array]);
          console.log(newSet); // 'a
        }}
      >
        버튼
      </button>
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
            wordSet,
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
