import React, { useEffect, useCallback, useContext } from 'react';
import { AppContext } from './App';
import Key from './Key';

function Keyboard() {
  const {
    onEnter,
    onDelete,
    onSelectLetter,
    disabledLetters,
    rightLetters,
    closeLetters,
  } = useContext(AppContext);
  const keys1 = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ'];
  const keys2 = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
  const keys3 = ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];

  const keysEng1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i'];
  const keysEng2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const keysEng3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  const handleKeyboard = useCallback((event) => {
    if (event.key === 'Enter') {
      onEnter();
    } else if (event.key === 'Backspace') {
      onDelete();
    } else {
      for (let i = 0; i < 8; i++) {
        if (event.key.toLowerCase() === keysEng1[i]) {
          onSelectLetter(keys1[i]);
        }
      }
      for (let i = 0; i < 9; i++) {
        if (event.key.toLowerCase() === keysEng2[i]) {
          onSelectLetter(keys2[i]);
        }
      }
      for (let i = 0; i < 7; i++) {
        if (event.key.toLowerCase() === keysEng3[i]) {
          onSelectLetter(keys3[i]);
        }
      }
    }
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    return () => {
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className='keyboard' onKeyDown={handleKeyboard}>
      <div className='line1'>
        {keys1.map((key, index) => {
          return (
            <Key
              keyVal={key}
              key={index}
              disabled={disabledLetters.includes(key)}
              right={rightLetters.includes(key)}
              close={closeLetters.includes(key)}
            ></Key>
          );
        })}
      </div>
      <div className='line2'>
        {keys2.map((key, index) => {
          return (
            <Key
              keyVal={key}
              key={index}
              disabled={disabledLetters.includes(key)}
              right={rightLetters.includes(key)}
              close={closeLetters.includes(key)}
            ></Key>
          );
        })}
      </div>
      <div className='line3'>
        <Key keyVal='입력' isBig={true}></Key>
        {keys3.map((key, index) => {
          return (
            <Key
              keyVal={key}
              key={index}
              disabled={disabledLetters.includes(key)}
              right={rightLetters.includes(key)}
              close={closeLetters.includes(key)}
            ></Key>
          );
        })}
        <Key keyVal='삭제' isBig={true}></Key>
      </div>
    </div>
  );
}

export default Keyboard;
