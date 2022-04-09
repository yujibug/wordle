import React, { useState, createContext, useEffect } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import './App.css';
import { boardDefault, wordSet, todaysWord } from './words';
import GameOver from './GameOver';

export const AppContext = createContext();

const Hangul = require('hangul-js');

function App() {
  const [board, setBoard] = useState({
    board: boardDefault,
    isEnterKey: false,
  });
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });

  const [wordDictionary, setWordDictionary] = useState(wordSet);
  const [correctWord, setCorrectWord] = useState(todaysWord);
  const [notWord, setNotWord] = useState(false);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [rightLetters, setRightLetters] = useState([]);
  const [closeLetters, setCloseLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const [alertControl, setAlertControl] = useState(false);
  const [fadeOutAnimation, setFadeOutAnimation] = useState('');
  const [fadeInAnimation, setFadeInAnimation] = useState('');

  useEffect(() => {
    let currAttempt = JSON.parse(localStorage.getItem('currAttempt'));
    let guesses = JSON.parse(localStorage.getItem('guesses'));
    let solution = localStorage.getItem('solution');
    if (currAttempt !== null) {
      setCurrAttempt(currAttempt);
    }
    if (guesses !== null) {
      setBoard({
        board: guesses,
        isEnterKey: false,
      });
    }
    if (solution !== null) {
      setCorrectWord(solution);
    }
  }, []);

  useEffect(() => {
    setFadeInAnimation('fade-in-animation');
    let fadeOutAnimation = setTimeout(() => {
      setFadeOutAnimation('fade-out-animation');
    }, 2000);
    let timerAlert = setTimeout(() => {
      setAlertControl(false);
    }, 3000);
    return () => {
      clearTimeout(timerAlert);
      clearTimeout(fadeInAnimation);
      clearTimeout(fadeOutAnimation);
      setFadeInAnimation('');
      setFadeOutAnimation('');
    };
  }, [alertControl]);

  const assembleletter = (currWord) => {
    for (let i = 0; i < currWord.length; i++) {
      if (currWord[i] === 'ㄱ' && currWord[i + 1] === 'ㄱ') {
        currWord.splice(i, 2, 'ㄲ');
      }
      if (currWord[i] === 'ㄷ' && currWord[i + 1] === 'ㄷ') {
        currWord.splice(i, 2, 'ㄸ');
      }
      if (currWord[i] === 'ㅂ' && currWord[i + 1] === 'ㅂ') {
        currWord.splice(i, 2, 'ㅃ');
      }
      if (currWord[i] === 'ㅅ' && currWord[i + 1] === 'ㅅ') {
        currWord.splice(i, 2, 'ㅆ');
      }
      if (currWord[i] === 'ㅈ' && currWord[i + 1] === 'ㅈ') {
        currWord.splice(i, 2, 'ㅉ');
      }
      if (currWord[i] === 'ㅏ' && currWord[i + 1] === 'ㅣ') {
        currWord.splice(i, 2, 'ㅐ');
      }
      if (currWord[i] === 'ㅓ' && currWord[i + 1] === 'ㅣ') {
        currWord.splice(i, 2, 'ㅔ');
      }
      if (currWord[i] === 'ㅕ' && currWord[i + 1] === 'ㅣ') {
        currWord.splice(i, 2, 'ㅖ');
      }
    }
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 6) return;

    let currWord = [...board.board[currAttempt.attempt]];
    assembleletter(currWord);
    let assembledCurrWord = Hangul.assemble(currWord);

    if (!wordDictionary.has(assembledCurrWord)) {
      setAlertControl(true);
      return;
    }
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    localStorage.setItem(
      'currAttempt',
      JSON.stringify({
        attempt: currAttempt.attempt + 1,
        letterPos: 0,
      })
    );
    localStorage.setItem('guesses', JSON.stringify(board.board));
    localStorage.setItem('solution', correctWord);

    if (JSON.stringify(currWord) === JSON.stringify(correctWord)) {
      setGameOver({ gameOver: true, guessedWord: true });
      localStorage.setItem('guesses', JSON.stringify(boardDefault));
      localStorage.setItem(
        'currAttempt',
        JSON.stringify({ attempt: 0, letterPos: 0 })
      );
      localStorage.removeItem('solution');
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      localStorage.setItem('guesses', JSON.stringify(boardDefault));
      localStorage.setItem(
        'currAttempt',
        JSON.stringify({ attempt: 0, letterPos: 0 })
      );
      localStorage.removeItem('solution');
    }
  };

  const onDelete = () => {
    const copiedBoard = [...board.board];
    if (currAttempt.letterPos === 0) {
      return;
    }
    setNotWord(false);
    copiedBoard[currAttempt.attempt][currAttempt.letterPos - 1] = '';
    setBoard({ board: copiedBoard, isEnterKey: false });
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 5) return;
    const copiedBoard = [...board.board];
    copiedBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard({ board: copiedBoard, isEnterKey: true });
    if (currAttempt.letterPos === 5) {
      let currWord = [...board.board[currAttempt.attempt]];
      assembleletter(currWord);
      let assembledCurrWord = Hangul.assemble(currWord);

      if (!wordDictionary.has(assembledCurrWord)) {
        setNotWord(true);
      }
    }
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  return (
    <div className='App'>
      <div className='main-container'>
        {alertControl && (
          <div className='alert-wrapper'>
            <div className={`alert ${fadeInAnimation} ${fadeOutAnimation}`}>
              단어목록에 없습니다
            </div>
          </div>
        )}
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
          <Keyboard></Keyboard>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
