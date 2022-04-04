import React, { useContext, useState } from 'react';
import { AppContext } from './App';
import Letter from './Letter';

function Key({ keyVal, isBig, disabled, right, close }) {
  const { onEnter, onDelete, onSelectLetter } = useContext(AppContext);

  const enterKey = () => {
    if (keyVal === '입력') {
      onEnter();
      return;
    }
    if (keyVal === '삭제') {
      onDelete();
      return;
    }
    onSelectLetter(keyVal);
  };

  const keyState = disabled
    ? 'disabled'
    : right
    ? 'right'
    : close
    ? 'close'
    : '';

  return (
    <div className='key' id={isBig ? 'bigKey' : keyState} onClick={enterKey}>
      <p>{keyVal}</p>
    </div>
  );
}

export default Key;
