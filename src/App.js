import React, { useState, createContext, useEffect, useRef } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import './App.css';
import { boardDefault, wordSet, todaysWord } from './words';
import GameOver from './GameOver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

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

  const [errorAlertControl, setErroralertControl] = useState(false);
  const [copyAlertControl, setCopyAlertControl] = useState(false);
  const [fadeOutAnimation, setFadeOutAnimation] = useState('');
  const [fadeInAnimation, setFadeInAnimation] = useState('');
  const [closeGameOverModal, setCloseGameOverModal] = useState(false);

  useEffect(() => {
    let currAttempt = JSON.parse(localStorage.getItem('currAttempt'));
    let guesses = JSON.parse(localStorage.getItem('guesses'));
    let solution = JSON.parse(localStorage.getItem('solution'));
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
    } else {
      localStorage.setItem('solution', JSON.stringify(todaysWord));
    }
  }, []);

  useEffect(() => {
    setFadeInAnimation('fade-in-animation');
    let fadeOutAnimation = setTimeout(() => {
      setFadeOutAnimation('fade-out-animation');
    }, 2000);
    let timerAlert = setTimeout(() => {
      setErroralertControl(false);
    }, 3000);
    return () => {
      clearTimeout(timerAlert);
      clearTimeout(fadeInAnimation);
      clearTimeout(fadeOutAnimation);
      setFadeInAnimation('');
      setFadeOutAnimation('');
    };
  }, [errorAlertControl]);

  const resetLocalStorage = () => {
    localStorage.setItem(
      'guesses',
      JSON.stringify([
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
      ])
    );
    localStorage.setItem(
      'currAttempt',
      JSON.stringify({ attempt: 0, letterPos: 0 })
    );
    localStorage.setItem('solution', JSON.stringify(todaysWord));
  };

  const assembleletter = (currWord) => {
    let word1 = [...currWord];
    let word2 = [...currWord];
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] === 'ㄱ' && word1[i + 1] === 'ㄱ') {
        word1.splice(i, 2, 'ㄲ');
      }
      if (word1[i] === 'ㄷ' && word1[i + 1] === 'ㄷ') {
        word1.splice(i, 2, 'ㄸ');
      }
      if (word1[i] === 'ㅂ' && word1[i + 1] === 'ㅂ') {
        word1.splice(i, 2, 'ㅃ');
      }
      if (word1[i] === 'ㅅ' && word1[i + 1] === 'ㅅ') {
        word1.splice(i, 2, 'ㅆ');
      }
      if (word1[i] === 'ㅈ' && word1[i + 1] === 'ㅈ') {
        word1.splice(i, 2, 'ㅉ');
      }
      if (word1[i] === 'ㅏ' && word1[i + 1] === 'ㅣ') {
        word1.splice(i, 2, 'ㅐ');
      }
      if (word1[i] === 'ㅓ' && word1[i + 1] === 'ㅣ') {
        word1.splice(i, 2, 'ㅔ');
      }
      if (word1[i] === 'ㅕ' && word1[i + 1] === 'ㅣ') {
        word1.splice(i, 2, 'ㅖ');
      }
    }
    for (let i = 0; i < word2.length; i++) {
      if (word2[i] === 'ㅏ' && word2[i + 1] === 'ㅣ') {
        word2.splice(i, 2, 'ㅐ');
      }
      if (word2[i] === 'ㅓ' && word2[i + 1] === 'ㅣ') {
        word2.splice(i, 2, 'ㅔ');
      }
      if (word2[i] === 'ㅕ' && word2[i + 1] === 'ㅣ') {
        word2.splice(i, 2, 'ㅖ');
      }
    }

    return [Hangul.assemble(word1), Hangul.assemble(word2)];
  };

  const onEnter = () => {
    if (gameOver.gameOver) {
      return;
    }

    if (currAttempt.letterPos !== 6) return;

    let currWord = [...board.board[currAttempt.attempt]];
    let currWordArray = [...board.board[currAttempt.attempt]];
    let assembledCurrWord = assembleletter(currWord);

    if (
      !wordDictionary.has(assembledCurrWord[0]) &&
      !wordDictionary.has(assembledCurrWord[1])
    ) {
      setErroralertControl(true);
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

    if (JSON.stringify(currWordArray) === JSON.stringify(correctWord)) {
      setGameOver({ gameOver: true, guessedWord: true });
      resetLocalStorage();
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      resetLocalStorage();
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
    if (gameOver.gameOver) {
      return;
    }

    if (currAttempt.letterPos > 5) return;
    const copiedBoard = [...board.board];
    copiedBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard({ board: copiedBoard, isEnterKey: true });
    if (currAttempt.letterPos === 5) {
      let currWord = [...board.board[currAttempt.attempt]];
      let assembledCurrWord = assembleletter(currWord);

      if (
        !wordDictionary.has(assembledCurrWord[0]) &&
        !wordDictionary.has(assembledCurrWord[1])
      ) {
        setNotWord(true);
      }
    }
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  return (
    <div className='App'>
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
          copyAlertControl,
          setCopyAlertControl,
          fadeInAnimation,
          setFadeInAnimation,
          fadeOutAnimation,
          setFadeOutAnimation,
          closeGameOverModal,
          setCloseGameOverModal,
        }}
      >
        {gameOver.gameOver && <GameOver></GameOver>}
        <div className='main-container'>
          {errorAlertControl && (
            <div className={`alert ${fadeInAnimation} ${fadeOutAnimation}`}>
              단어목록에 없습니다
            </div>
          )}
          <nav>
            <h1>
              <span>무한</span>워들
            </h1>
            <FontAwesomeIcon
              icon={faArrowRotateRight}
              className='arrowRight'
              onClick={() => {
                window.location.reload();
              }}
            />
          </nav>
          <Board></Board>
          <Keyboard></Keyboard>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
